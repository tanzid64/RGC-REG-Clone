import { FC } from 'react';
import { MaxWidthWrapper } from '../max-width-wrapper';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar: FC = () => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <MaxWidthWrapper className="">
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="RGC Logo"
            priority
            width={2160}
            height={1080}
            className="h-8 w-44"
            style={{ color: "transparent" }}
          />
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};
