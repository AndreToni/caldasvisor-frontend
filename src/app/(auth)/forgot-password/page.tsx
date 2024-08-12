import Image from "next/image";

import { FormForgotMyPassword } from "@/components/form/FormForgotMyPassword";


export default function forgotMyPassword(){

     return(
        <main>
            <div className="w-full max-w-[416px] min-h-screen mx-auto py-8 flex flex-col items-center justify-center gap-6">
                <Image src={'/LogoVerticalFullColor.svg'} alt="Logo" width={160} height={142} />
                <h1 className={'font-display text-display'}>Esqueceu a sua senha?</h1>
                <p className={'font-paragraph text-center text-paragraph'}>Caso você tenha esquecido sua senha, insira seu endereço de e-mail para que possamos enviar um e-mail com as instruções para a troca da senha.</p>
                <FormForgotMyPassword />
                
            </div>
        </main>
     );
}