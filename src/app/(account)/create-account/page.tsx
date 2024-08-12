'use client'

import Image from "next/image";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { AiFillApple, AiOutlineGoogle } from 'react-icons/ai'
import { FormCreteAccount } from "@/components/form/FormCreateAccount";

export default function createAccount(){

    return(
        <main>
            <div className="w-full max-w-[416px] min-h-screen mx-auto py-8 flex flex-col items-center justify-center gap-6">
                <Image src={'/LogoVerticalFullColor.svg'} alt="Logo" width={160} height={142} />
                <h1 className={'font-display text-display'}>Criar conta</h1>
                <p className={'font-paragraph text-center text-paragraph'}>Crie uma conta para ficar atualizado sobre os eventos da região de Caldas Novas</p>
                <ButtonPrimary 
                    onClick={() => {}}
                    label="Usar Apple" 
                    large={true} 
                    full={true}  
                    Icon={() => <AiFillApple size={24}/>}
                />
                <ButtonPrimary 
                    onClick={() => {}}
                    label="Usar Gmail" 
                    large={true} 
                    full={true}  
                    Icon={() => <AiOutlineGoogle size={24}/>}
                />
                <div className="flex w-full gap-2 items-center">
                    <div className="flex-1 border-t border-gray-200"/>
                    <span className="font-paragraph1">ou</span>
                    <div className="flex-1 border-t border-gray-200"/>
                </div>
                <FormCreteAccount />
            </div>
        </main>
    )
}