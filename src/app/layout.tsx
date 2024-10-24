import React from 'react';
import { Providers } from '@/store/providers';
import MyApp from './app';

export const metadata = {
  title: 'Cyberprism Demo',
  description: 'Cyberprism web application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
