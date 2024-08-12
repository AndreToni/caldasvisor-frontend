import Image from "next/image";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io'

interface Props{
    icon: string
    title: string
    label: string
    active: boolean
    onClick: () => void
}

export function RadioCard({icon, active, title, label, onClick }:Props){
    return(
        
        <div className={`
            relative flex flex-col items-center p-4 w-[192px] bg-shapes-background-default rounded shadow-card gap-4 cursor-pointer
            ${active == true ? 'border-2 border-primary-pure shadow-none': 'border-2 border-transparent'}
        `} 
            onClick={() => onClick()}
        >
            <div className="absolute top-4 right-4">
                {
                  active ? <IoMdRadioButtonOn size={24} color="#F06111"/> : <IoMdRadioButtonOff size={24} color="#A5A2A0"/>
                }
            </div>
            {
                icon == "Profile" ? <Image src={'/Profile.svg'} alt="Icone" width={80} height={80} /> : <Image src={'/User-Business.svg'} alt="Icone" width={80} height={80} />
            }
            <div>
                <p className="font-heading4 text-title text-center">{title}</p>
                <p className="font-paragraph2 text-disabled text-center">{label}</p>
            </div>
            
        </div>
    )
}