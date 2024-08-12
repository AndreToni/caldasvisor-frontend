import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { ButtonSecondary } from "./buttons/ButtonSecondary";
import { ButtonPrimary } from "./buttons/ButtonPrimary";
import { useAuth } from "@/contexts/auth";
import { useState } from "react";

export function ModalAside({ show, close }) {
    const { user, signout } = useAuth();
    const [showDrop, setShowDrop] = useState(false);
    let initialName = user ? user.name.split(' ').map((parte) => parte[0]).join('') : '';
    const router = useRouter();
    const path = usePathname();

    return (
        <aside className={`p-6 bg-white shadow-side-bar h-aside-mobile lg:h-aside fixed z-50 top-0 lg:top-24 left-0 w-aside-mobile lg:w-aside max-w-full flex flex-col gap-6 ${show ? 'animate-aside-show' : 'animate-aside-hidden'}`}>
            <button onClick={close}>
                <FiX size={24} />
            </button>
            {user && <div className="lg:hidden flex items-center gap-4 relative" onMouseOver={() => setShowDrop(true)} onMouseLeave={() => setShowDrop(false)}>
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-light text-white border-2 border-shapes-background-aux">
                    <span className="font-semibold">{initialName}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-span1 text-span">{user.name}</span>
                    <span className="font-span2 text-span">{user.email}</span>
                </div>
            </div>}
            <ul className="flex flex-col gap-4">
                <li>
                    <Link href={'/'} onClick={close} className={`h-10 flex justify-between flex-col ${path == '/' ? 'font-paragraph1' : 'font-paragraph2'}`}>
                        Mapa
                    </Link>
                </li>
                <li>
                    <Link href={'/eventos'} onClick={close} className={`h-10 flex justify-between flex-col ${path == '/eventos' ? 'font-paragraph1' : 'font-paragraph2'}`}>
                        Eventos
                    </Link>
                </li>
                <li>
                    <Link href={'/pontos-turisticos'} onClick={close} className={`h-10 flex justify-between flex-col ${path == '/pontos-turisticos' ? 'font-paragraph1' : 'font-paragraph2'}`}>
                        Pontos turísticos
                    </Link>
                </li>
                {user &&
                    <>
                        <div className="border-b"></div>
                        <li>
                            <Link href={'/perfil'} className={`h-10 flex justify-between flex-col ${path == '/perfil' ? 'font-paragraph1' : 'font-paragraph2'}`}>Perfil</Link>
                        </li>
                        {user.type != 'customer' &&
                            <>
                                <li>
                                    <Link href={'/meus-eventos'} className={`h-10 flex justify-between flex-col ${path == '/meus-eventos' ? 'font-paragraph1' : 'font-paragraph2'}`}>Meus eventos</Link>
                                </li>
                                <li>
                                    <Link href={'/meus-pontos-turisticos'} className={`h-10 flex justify-between flex-col ${path == '/meus-pontos-turisticos' ? 'font-paragraph1' : 'font-paragraph2'}`}>Meus pontos turísticos</Link>
                                </li>
                            </>
                        }
                        {user.type == 'admin' &&
                            <li>
                                <Link href={'/gerencia-conta'} className={`h-10 flex justify-between flex-col ${path == '/gerencia-conta' ? 'font-paragraph1' : 'font-paragraph2'}`}>Gerencia de conta</Link>
                            </li>
                        }
                    </>
                }
                <div className="border-b"></div>
            </ul>
            {!user ?
                <div className="lg:hidden flex gap-8">
                    <ButtonSecondary label="Fazer login" onClick={() => router.push('/login')} />
                    <ButtonPrimary label="Criar conta" onClick={() => router.push('/create-account')} />
                </div> :
                <div className="flex-1 flex items-end">
                    <button onClick={signout} className={`h-10 flex justify-between flex-col font-paragraph2`}>Sair</button>
                </div>
            }
        </aside>
    )
}