import { HeaderDefault } from "@/components/headers/HeaderDefault"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen">
            <HeaderDefault />
            <div className="pt-24">
                {children}
            </div>
        </main>
    )
}
