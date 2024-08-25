import Image from "next/image";
import { FormCreateAccountCustumerOne } from "@/components/form/FormCreateAccountCustumerOne";
import VLibras from 'vlibras-nextjs';


export default function createAccountCustomerOne(){
    return(
        <main>
            <div className="w-full max-w-[416px] min-h-screen mx-auto py-8 flex flex-col items-center justify-center gap-6">
                <Image src={'/LogoVerticalFullColor.svg'} alt="Logo" width={160} height={142} />
                <h1 className={'font-display text-display'}>Criar conta</h1>
                <p className={'font-paragraph text-center text-paragraph'}>Crie uma conta de organizador agora mesmo e tenha a oportunidade de criar seus próprios eventos na plataforma, além de receber atualizações sobre os eventos da região de Caldas Novas</p>
                <FormCreateAccountCustumerOne />
            </div>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </main>
    )
}