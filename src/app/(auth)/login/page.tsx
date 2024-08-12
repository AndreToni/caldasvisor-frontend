'use client'

import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { FormLogin } from "@/components/form/FormLogin";
import Image from "next/image";
import {AiFillApple, AiOutlineGoogle} from 'react-icons/ai'

export default function Login() {
    return (
        <main>
            <div className="w-full max-w-[416px] min-h-screen mx-auto px-6 py-8 flex flex-col items-center justify-center gap-6">
                <Image src={'/LogoVerticalFullColor.svg'} alt="Logo" width={160} height={142} />
                <h1 className={'font-display text-display'}>Acesse sua conta</h1>
                <p className={'font-paragraph text-center text-paragraph'}>Acesse sua conta para ficar atualizado sobre os eventos da região de Caldas Novas</p>
                <ButtonPrimary 
                    onClick={() => {}}
                    label="Logar com a Apple" 
                    large={true} 
                    full={true}  
                    Icon={() => <AiFillApple size={24}/>}
                />
                <ButtonPrimary 
                    onClick={() => {}}
                    label="Logar com a Gmail" 
                    large={true} 
                    full={true}  
                    Icon={() => <AiOutlineGoogle size={24}/>}
                />

                <div className="flex w-full gap-2 items-center">
                    <div className="flex-1 border-t border-gray-200"/>
                    <span className="font-paragraph1">ou</span>
                    <div className="flex-1 border-t border-gray-200"/>
                </div>
                <FormLogin/>
            </div>
        </main>
    );
}