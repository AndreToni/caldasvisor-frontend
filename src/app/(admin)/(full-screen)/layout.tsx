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

    if (!user ) {
        redirect('/login');
    }

    if(user.type == 'customer') return <div className="h-screen flex items-center justify-center"><p>Você não tem autorização para acessar essa página.</p></div>

    return (
        <main className="min-h-screen">
            <HeaderDefault />
            <div className="pt-24">
                {children}
            </div>
        </main>
    )
}
