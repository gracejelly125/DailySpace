import HeaderClient from '@/components/layout/HeaderClient';
import { Suspense } from 'react';


const Header = () => {
  return (
    <Suspense>
      <HeaderClient />
    </Suspense>
  );
};

export default Header;
