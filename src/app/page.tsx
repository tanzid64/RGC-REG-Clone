import Link from 'next/link';
import { FC } from 'react';

const page: FC = () => {
  return(
    <div className=''>
      <Link href='/'>Home</Link>
      <Link href='/client-registration'>Client Registration</Link>
    </div>
  );
};

export default page;
