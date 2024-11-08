import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";
import { FC } from "react";
import { ClientRegStep } from "./_components/form/client-reg-form-step";
import ClientRegFormProvider from "./_components/form/form-provider";

const ClientRegistrationPage: FC = () => {
  return (
    <MaxWidthWrapper className="space-y-14 pt-10">
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-700 md:text-lg">
          Welcome Aboard! Let's get you started with 4 steps
        </h2>
        <p className="text-sm font-medium text-gray-600 sm:text-base">
          The client onboarding process consists of four simple steps. Each step
          is designed to guide you seamlessly through the process of setting up
          your client account and accessing your personalized portal.
        </p>
      </div>
      <div className="min-h-screen">
        <ClientRegFormProvider>
          <ClientRegStep />
        </ClientRegFormProvider>
      </div>
    </MaxWidthWrapper>
  );
};

export default ClientRegistrationPage;
