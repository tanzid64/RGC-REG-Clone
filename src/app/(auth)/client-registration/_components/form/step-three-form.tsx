'use client';
import { FC } from 'react';
import { GoBack } from '../go-back-button';
import { ImageInput } from '@/components/global/image-input';
import { ErrorMessage } from '../error-message';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/global/input';
import { ClientRegButton } from '../client-reg-button';
import { Select } from '@/components/global/select';
import { Label } from '@/components/global/label';
import { useQuery } from '@tanstack/react-query';
import { getAllJobPosition } from '@/actions/client-reg';

export const StepThreeForm: FC = () => {
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
  } = useFormContext();

  // get all job positions
  const { data: positions, isLoading: positionsLoading } = useQuery({
    queryKey: ["all-industries"],
    queryFn: () => getAllJobPosition(),
  });
  // position options
  const positionsOptions = positions?.positions?.map((p) => ({
    value: p.id,
    label: p.title,
  }));
  return (
    <>
      <GoBack />
      <div className="space-y-4">
        {/* Your Picture */}
        <div className="flex w-full flex-col gap-1">
          <ImageInput
            name="avatar"
            register={register}
            control={control}
            labelText="Your Picture"
            setValue={setValue}
          />
          <ErrorMessage errors={errors} name="avatar" />
        </div>
        {/* Your Name */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="fullName" text="Your name" required />
          <Input
            register={register}
            name="fullName"
            placeholder="Enter your name"
          />
          <ErrorMessage errors={errors} name="fullName" />
        </div>
        {/* Position */}
        <div className="flex w-full flex-col gap-1">
          <Label
            htmlFor="position"
            text="What is your job position?"
            required
          />

          <Select
            control={control}
            options={positionsOptions}
            placeholder="Select an industry..."
            name="industry"
            isLoading={positionsLoading}
          />

          <ErrorMessage errors={errors} name="industry" />
        </div>
        {/* Button */}
        <ClientRegButton disabled={!watch("fullName") || !watch("position")} />
      </div>
    </>
  );
};
