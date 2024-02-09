import { TopMenu } from '@/components';

export const metadata = {
 title: 'Teslo | Shop',
 description: 'Tu tienda virtual de confianza',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen'>
      <TopMenu />
      {children}
    </main>
  )
}
