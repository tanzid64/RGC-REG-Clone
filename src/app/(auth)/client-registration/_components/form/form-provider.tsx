"use client";
import { Loader } from "@/components/global/loader";
import { useClientReg } from "@/hooks/use-client-reg";
import { AuthContextProvider } from "@/providers/client-reg-context";
import dynamic from "next/dynamic";
import { FormProvider } from "react-hook-form";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false },
);

type Props = {
  children: React.ReactNode;
};

const ClientRegFormProvider: React.FC<Props> = ({ children }) => {
  const { onHandleSubmit, methods } = useClientReg();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit}>
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-4">
            <Loader state={false} color="blue">
              {children}
            </Loader>
          </div>
        </form>
        <DevT control={methods.control} />
      </FormProvider>
    </AuthContextProvider>
  );
};

export default ClientRegFormProvider;
