import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import Image from "next/image";

interface Props{
    show: boolean;
    close: () => void;
    icon: string;
    title: string;
    text?: string;
    labelPrimaryButton: string;
    labelSecondaryButton?: string;
    actionPrimaryButton: () => void;
    actionSecondaryButton?: () => void;
}


export function ModalCenter({show, title, text, labelPrimaryButton, labelSecondaryButton, icon, actionPrimaryButton, actionSecondaryButton, close}:Props) {

    if(!show){
        return null;
    }

    return(
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-Grey3/40 flex items-center justify-center z-10">
            <div className="absolute top-0 bottom-0 right-0 left-0 z-10" onClick={close}/>
            <div className=" w-[416px] h-auto rounded bg-shapes-background-aux p-4 flex flex-col items-center gap-4 z-20">
                <Image src={icon} alt="Modal Icon" width={180} height={180}/>
                <h2 className="font-heading2 text-title text-center">{title}</h2>
                {text && <p className="font-paragraph2 text-paragraph text-center">{text}</p>}
                <ButtonPrimary 
                    onClick={actionPrimaryButton}
                    label={labelPrimaryButton}
                    full={true}
                    large={true}
                />
                {
                    actionSecondaryButton && labelSecondaryButton &&
                    <ButtonSecondary
                        onClick={actionSecondaryButton}
                        label={labelSecondaryButton}
                        full={true}
                        large={true}
                    />
                }
                
            </div>
        </div>

    )

}