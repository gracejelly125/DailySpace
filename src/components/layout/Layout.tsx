import Header from '@/components/layout/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
