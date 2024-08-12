import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

interface Props{
    onClick: () => void,
    label?: string,
    text: boolean,
    active: boolean,
}

export function CheckBox({label, text, onClick, active}:Props){
    

    return(
        <div className="flex flex-row items-center w-auto py-2 gap-2 top-auto cursor-pointer" onClick={() => onClick()}>
            {
                active ? <MdCheckBox size={24} color='#5145DC'/> : <MdCheckBoxOutlineBlank size={24} color='#292827'/> 
            }
            {
                text &&
                <p className="font-paragraph2 text-paragraph max-w-[295px] top-auto">{label}</p>
            }

        </div>
    )
}