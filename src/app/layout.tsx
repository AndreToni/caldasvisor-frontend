import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth'
import { cookies } from 'next/headers'
import VLibras from 'vlibras-nextjs';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caldas Visor',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user_value = cookies().get('user')?.value;
  const user = user_value && JSON.parse(user_value);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider user={user}>
          {children}
        </AuthProvider>
      </body>
      {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
    </html>
  )
}
