import Image from "next/image";
import { FormRecoverPassword } from "@/components/form/FormRecoverPassword";

export default function recoverPassword(){

     return(
        <main>
            <div className="w-full max-w-[416px] min-h-screen mx-auto py-8 flex flex-col items-center justify-center gap-6">
                <Image src={'/LogoVerticalFullColor.svg'} alt="Logo" width={160} height={142} />
                <h1 className={'font-display text-display'}>Troque sua senha</h1>
                <p className={'font-paragraph text-center text-paragraph'}>Por favor, insira a senha desejada nos campos abaixo para definir sua nova senha.</p>
                <FormRecoverPassword />
                
            </div>
        </main>
     );
}