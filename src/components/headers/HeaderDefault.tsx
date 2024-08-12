'use client'

import Image from "next/image";
import Link from "next/link";
import { ButtonSecondary } from "../buttons/ButtonSecondary";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ModalAside } from "../modal-aside";
import { useAuth } from "@/contexts/auth";

export function HeaderDefault() {
    const { user, signout } = useAuth();
    const router = useRouter();
    const path = usePathname();
    const [show, setShow] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
    let initialName = user ? user.name.split(' ').map((parte) => parte != 'de' && parte != 'da' && parte != 'e' ? parte[0] : '').join('') : '';

    return (
        <>
            <header className="bg-shapes-background-default fixed top-0 left-0 w-screen z-50">
                <nav className="w-full max-w-7xl h-24 mx-auto max-lg:px-[25px] flex items-center justify-between">
                    <button className="lg:hidden" onClick={() => setShow(true)}><Image src="/MenuIcon.svg" alt="Icon Menu" width={24} height={24} /></button>
                    <div className="flex gap-8">
                        <Link href={'/'} className="flex items-center justify-center"><Image src={'/LogoHorizontalFullColor.svg'} alt="CaldasVisor" width={136} height={40} /></Link>
                        <ul className="hidden lg:flex items-center gap-8">
                            <li>
                                <Link href={'/'} className={`h-[30px] flex justify-between flex-col ${path == '/' ? 'font-paragraph1' : 'font-paragraph2'}`}>
                                    Mapa
                                    {path == '/' && <span className="w-full bg-secondary-pure h-[2px] rounded-sm"></span>}
                                </Link>
                            </li>
                            <li>
                                <Link href={'/eventos'} className={`h-[30px] flex justify-between flex-col ${path == '/eventos' ? 'font-paragraph1' : 'font-paragraph2'}`}>
                                    Eventos
                                    {path.startsWith('/eventos') && <span className="w-full bg-secondary-pure h-[2px] rounded-sm"></span>}
                                </Link>
                            </li>
                            <li>
                                <Link href={'/pontos-turisticos'} className={`h-[30px] flex justify-between flex-col ${path == '/pontos-turisticos' ? 'font-paragraph1' : 'font-paragraph2'}`}>
                                    Pontos turísticos
                                    {path.startsWith('/pontos-turisticos') && <span className="w-full bg-secondary-pure h-[2px] rounded-sm"></span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {!user ?
                        <div className="hidden lg:flex gap-8">
                            <ButtonSecondary label="Fazer login" onClick={() => router.push('/login')} />
                            <ButtonPrimary label="Criar conta" onClick={() => router.push('/type-account')} />
                        </div> :
                        <div className="hidden lg:flex items-center gap-4 relative" onMouseOver={() => setShowDrop(true)} onMouseLeave={() => setShowDrop(false)}>
                            <div className="flex flex-col">
                                <span className="font-span1 text-span">{user.name}</span>
                                <span className="font-span2 text-span">{user.email}</span>
                            </div>
                            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-light text-white border-2 border-shapes-background-aux">
                                <span className="font-semibold">{initialName}</span>
                            </div>
                            {showDrop && <div className="absolute w-[300px] py-2 px-3 shadow-lg bg-white right-5 top-[100%] rounded">
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <Link href={'/perfil'} className={`w-full h-10 px-2 flex items-center rounded hover:bg-grey1 transition-colors text-paragraph font-paragraph2 ${path == '/perfil' && 'bg-grey1'}`}>Perfil</Link>
                                    </li>
                                    {user.type != 'customer' &&
                                        <>
                                            <li>
                                                <Link href={'/meus-eventos'} className={`w-full h-10 px-2 flex items-center rounded hover:bg-grey1 transition-colors text-paragraph font-paragraph2 ${path == '/meus-eventos' && 'bg-grey1'}`}>Meus eventos</Link>
                                            </li>
                                            <li>
                                                <Link href={'/meus-pontos-turisticos'} className={`w-full h-10 px-2 flex items-center rounded hover:bg-grey1 transition-colors text-paragraph font-paragraph2 ${path == '/meus-pontos-turisticos' && 'bg-grey1'}`}>Meus pontos turísticos</Link>
                                            </li>
                                        </>
                                    }
                                    {user.type == 'admin' &&
                                        <li>
                                            <Link href={'/gerencia-conta'} className={`w-full h-10 px-2 flex items-center rounded hover:bg-grey1 transition-colors text-paragraph font-paragraph2 ${path == '/gerencia-conta' && 'bg-grey1'}`}>Gerencia de conta</Link>
                                        </li>
                                    }
                                    <div className="border-t"></div>
                                    <li>
                                        <button onClick={signout} className={`w-full h-10 px-2 flex items-center rounded hover:bg-grey1 transition-colors text-paragraph font-paragraph2`}>Sair</button>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                    }
                </nav>
            </header>
            {show && <ModalAside close={() => setShow(false)} show={show} />}
        </>
    )
}