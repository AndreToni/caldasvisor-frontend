import { ITicket } from "@/models/ticket.model";
import Image from "next/image";
import Link from "next/link";
import { ButtonSecondary } from "./buttons/ButtonSecondary";
import { maskPrice } from "@/helpers/mask";

export function Tickets({ tickets }: { tickets: ITicket[] }) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className='font-heading3 text-title'>Valor da entrada</h3>
            <div className='flex flex-col gap-6'>
                {tickets.map(item => 
                    <div className='flex flex-wrap items-center gap-4 bg-shapes-background-aux p-4 border border-grey1 rounded'>
                        <Image src={'/ticket.svg'} alt="" width={24} height={24} />
                        <span className='font-paragraph2 text-paragraph'>{item.type == 'meia' ? `Valor da meia:` : `Valor da inteira:`}</span>
                        <span className='font-paragraph1 text-paragraph flex-1'>R$ {maskPrice(item.value)}</span>
                        <ButtonSecondary label="Acessar link de compra" onClick={() => {window.open(item.link, '_blank')}}/>
                    </div>
                )}
            </div>
        </div>
    )
}