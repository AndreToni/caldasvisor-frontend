'use client'

import Image from "next/image";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioCard } from "@/components/radio-card/RadioCard";

export default function typeAccount(){

    const router = useRouter()

    const [activeRadioProfile, setActiveRadioProfile] = useState(false);
    const [activeRadioBusiness, setActiveRadioBusiness] = useState(false);
    
    const routerCreate = generateRouter();
    const disabled = buttonDisabled();

    function buttonDisabled(){
        
        if (activeRadioProfile || activeRadioBusiness){
            return false
        }
        return true
    }
    
    function generateRouter(){
        let route = '';
        if(activeRadioProfile){
            route = '/create-account';
        } 
        if(activeRadioBusiness){
            route = '/create-account-customer';
        }
        return route
    }

    function tradeActiveProfile(){
        activeRadioProfile == false ? setActiveRadioProfile(true) : setActiveRadioProfile(false);
        activeRadioBusiness == true && setActiveRadioBusiness(false);  
    }

    function tradeActiveBusiness(){
        activeRadioBusiness == false ? setActiveRadioBusiness(true) : setActiveRadioBusiness(false);
        activeRadioProfile == true && setActiveRadioProfile(false);
    }

    return(
        <div className="w-full max-w-[416px] min-h-screen mx-auto py-8 flex flex-col items-center justify-center gap-6">
            <Image src={'/LogoVerticalFullColor.svg'} alt="Logo" width={160} height={142} />
            <h1 className={'font-display text-display'}>Criar conta</h1>
            <p className={'font-paragraph text-center text-paragraph'}>Crie uma conta para ficar atualizado sobre os eventos da região de Caldas Novas</p>
            <p className={'font-heading3 text-center text-title'}>Selecione o tipo de usuário que você se encaixa</p>
            <div className=" flex flex-row gap-8">
            <RadioCard
                icon = "Profile"
                active = {activeRadioProfile}
                label = "(Ver eventos)"
                title = "Turista"
                onClick = {tradeActiveProfile}
            />
            <RadioCard
                icon = "User-Business"
                active = {activeRadioBusiness}
                label = "(Adicionar eventos)"
                title = "Organizador"
                onClick = {tradeActiveBusiness}
            />
            </div>
            <ButtonPrimary
                disabled={disabled}
                onClick={() => router.push(routerCreate)}
                label="Continuar" 
                large={true} 
                full={true}  
            />
            <ButtonSecondary
                onClick={() => router.push('/login')}
                label="Cancelar" 
                large={true} 
                full={true}  
            />
        </div>
    );
}