import { IOpeningHour } from "@/models/opening-hour.model";
import { days } from "@/utils/data";

export function OpeningHours({ openingHours }: { openingHours: IOpeningHour[] }) {
    function formatTime(time: string) {
        const [h, m, s] = time.split(':');
        return `${h}:${m}`
    }

    return (
        <div className="flex flex-col gap-4">
            <h3 className='font-heading3 text-title'>Horário de funcionamento</h3>
            <div className='flex flex-wrap gap-6'>
                {openingHours.map(item => <div className='flex flex-col gap-2 flex-1'>
                    <span className='font-paragraph1 text-paragraph'>{days.find(day => day.enum == item.dayOfWeek).name}</span>
                    <div className="flex gap-1 bg-secondary-light px-4 py-2 font-paragraph1 text-white rounded w-fit">
                        <span>Das</span> <span>{formatTime(item.startTime)}</span>
                        <span>~</span> <span>{formatTime(item.endTime)}</span>
                    </div>
                </div>)}
            </div>
        </div>
    )
}