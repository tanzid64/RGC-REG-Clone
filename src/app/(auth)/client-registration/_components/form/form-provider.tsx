"use client";
import { Loader } from "@/components/global/loader";
import { useAuthContextHook } from "@/providers/client-reg-context";
import dynamic from "next/dynamic";
import { Control, FieldValues, FormProvider } from "react-hook-form";

const DevT = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  {
    ssr: false,
  },
);

type Props = {
  children: React.ReactNode;
};

const ClientRegFormProvider: React.FC<Props> = ({ children }) => {
  const { onHandleSubmit, formMethods, loading } = useAuthContextHook();
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onHandleSubmit)}>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-4">
          <Loader state={loading} color="blue">
            {children}
          </Loader>
        </div>
      </form>
      <DevT control={formMethods.control as unknown as Control<FieldValues>} />
    </FormProvider>
  );
};

export default ClientRegFormProvider;
