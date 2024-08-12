import { use, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface Props{
    id: string;
    label: string;
    type?: string;
    placeholder: string;
    disabled?: boolean;
    required?: boolean;
    value: string;
    error: string;
    onBlur: (e) => void;
    onChange: (e) => void;
}

export function InputText({label, placeholder, disabled, id, type, required, error, onBlur, onChange, value}:Props) {
    const [currentType, setCurrentType] = useState(type ?? 'text');


    return(
        <div className="w-full">
            <div className="flex justify-between items-center">
                <label  className="font-span2 text-span " htmlFor={id}>{label}</label>
                {
                    !required && required !== undefined && <span className="font-span2 text-disabled">Opcional</span>
                }
            </div>
            
            <div className="relative w-full mt-2 flex items-center">
                <input 
                    className={`
                        h-12 w-full px-3 rounded-[4px] font-paragraph2 bg-shapes-background-aux focus:outline-none focus:border-2 focus:border-secondary-pure
                        ${error && 'border-support-error border-2 focus:border-support-error'}
                    `}
                    id={id}
                    placeholder={placeholder ?? 'Inserir valor'}
                    type={currentType}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {
                    type == 'password' && <button className="absolute right-3" onClick={() => setCurrentType(currentType == 'password' ? 'text' : 'password')}> 
                    { 
                        currentType == 'password' ? <AiOutlineEyeInvisible  size={24}/> : <AiOutlineEye size={24}/>
                    }
                    </button>
                }
            </div>
            {
                error && <span className=' font-span2 text-support-error'>{error}</span>
            }
        </div>
    );
}