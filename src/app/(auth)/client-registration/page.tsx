import { MaxWidthWrapper } from "@/components/globar/max-width-wrapper";
import { FC } from "react";

const ClientRegistrationPage: FC = () => {
  return (
    <MaxWidthWrapper className="">
      <h2 className="text-base font-semibold text-gray-700 md:text-lg">
        Welcome Aboard! Let's get you started with 4 steps
      </h2>
      <p className="text-sm font-medium text-gray-600 sm:text-base">
        The client onboarding process consists of four simple steps. Each step
        is designed to guide you seamlessly through the process of setting up
        your client account and accessing your personalized portal.
      </p>
    </MaxWidthWrapper>
  );
};

export default ClientRegistrationPage;