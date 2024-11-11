"use client";
import { onOTPVerification } from "@/actions/client-reg";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../loader";

let currentOTPIndex: number = 0;
const OTPField = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);
    if (newOTP.join("").length === 6) setBtnDisabled(false);
    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const onSubmit = async () => {
    setLoading(true);
    const value: string = otp.join("");

    try {
      const response = await onOTPVerification(value);
      if (response.status === 404) {
        setLoading(false);
        toast.error(response.message);
      } else {
        setLoading(false);
        toast.success(response.message);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  };

  return (
    <>
      <div className={"space-x-[2px] md:space-x-2"}>
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={activeOTPIndex === index ? inputRef : null}
                type="number"
                className={
                  "w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-violet-400 focus:border-violet-700 focus:text-violet-700 text-gray-400 transition"
                }
                onChange={handleOnChange}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                value={otp[index]}
              />
              {index === otp.length - 1 ? null : (
                <span className={"w-2 py-0.5 bg-gray-400"} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <button
        className=" inline-flex items-center rounded-md shadow-sm text-neutral-50 px-4 py-2 text-sm font-semibold w-[200px] justify-center bg-violet-600 cursor-pointer disabled:cursor-not-allowed disabled:bg-violet-400"
        type="button"
        onClick={onSubmit}
        disabled={btnDisabled}
      >
        <Loader state={loading}>
          Submit
        </Loader>
      </button>
    </>
  );
};

export default OTPField;
