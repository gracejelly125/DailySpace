import { Suspense } from 'react';

import HeaderClient from '@/components/layout/HeaderClient';

const Header = () => {
  return (
    <Suspense>
      <HeaderClient />
    </Suspense>
  );
};

export default Header;
