export function Tag({text, color}: {text: string, color?: string}) {
    return (
        <span className={`h-[26px] ${color ? color : 'bg-primary-pure'} font-span2 flex items-center justify-center w-fit px-1 py-1 text-white rounded`}>{text}</span>
    )
}