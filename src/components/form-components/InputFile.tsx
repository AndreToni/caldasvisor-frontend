import Image from "next/image";
import { FiImage, FiTrash } from "react-icons/fi";
import { ButtonIcon } from "../buttons/ButtonIcon";

export function InputFile({ file, index, onChange, onRemove }: { file?: File | string, index: number, onChange?(file: File): void, onRemove?(file?: File | string): void }) {
    return (
        <>
            <input
                className={`hidden`}
                id={`file-${index}`}
                name={`file-${index}`}
                type="file"
                onChange={(e) => {
                    onChange(e.target.files[0]);
                }} />
            <label htmlFor={`file-${index}`} className="relative overflow-hidden cursor-pointer h-32 flex text-disabled flex-col gap-[10px] items-center justify-center bg-shapes-background-aux rounded border border-dashed">
                {file && typeof (file) != 'string' && <Image src={URL.createObjectURL(file)} alt="" fill objectFit="cover" />}
                {file && typeof (file) == 'string' && <Image src={'http://caldasvisor-backend-production.up.railway.app/' + file} alt="" fill objectFit="cover" />}
                {!file &&
                    <>
                        <FiImage />
                        <span className="font-span1">Inserir imagem</span>
                    </>
                }
                {file &&
                    <div className="absolute top-2 right-2">
                        <ButtonIcon Icon={FiTrash} onClick={() => onRemove(file)} large />
                    </div>
                }
            </label>
        </>
    )
}