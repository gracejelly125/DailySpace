'use client';

import { AuthProvider } from '@/providers/AuthProvider';
import QueryProvider from '@/providers/QueryProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};

export default Providers;
