interface Props{
    state: number,
    amount: string
}

export function ProgressBar({state, amount}:Props){
    return(
        <div className="flex flex-row gap-2 items-center w-full h-8">
            <div className="flex flex-row bg-shapes-background-default w-full border-2 border-grey1 h-2 rounded">
                <div className={`
                    w-full h-2 
                    ${state >= 1 ? 'bg-secondary-pure ':'bg-shapes-background-aux'}
                    ${state >= 2 ? 'rounded-e-none rounded-s' : 'rounded'} 
                `}>

                </div>
                <div className={`
                    w-full h-2 
                    ${state >= 2 ? 'bg-secondary-pure rounded-s-none':'bg-shapes-background-aux'}
                    ${state == 3 ? 'rounded-e-none':'rounded-e'}
                `}>

                </div>
            {
                amount == '3' &&
                <div className={`
                    w-full h-2 rounded-e
                    ${state == 3 ? 'bg-secondary-pure':'bg-shapes-background-aux'}
                `}>
                </div>
            }
                
            </div>
            <span className="font-span2 text-span w-24">Passo {state} de {amount}</span>
        </div>
        
    )
}