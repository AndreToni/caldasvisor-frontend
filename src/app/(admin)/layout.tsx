import { HeaderDefault } from '@/components/headers/HeaderDefault';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user_value = cookies().get('user')?.value;
    const user = user_value && JSON.parse(user_value);

    if (!user) {
        redirect('/login');
    }

    return (
        <>
            {children}
        </>
    )
}
