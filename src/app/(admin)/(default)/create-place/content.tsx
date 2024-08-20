'use client'

import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { InputText } from "@/components/form-components/InputText";
import Select from "@/components/form-components/Select";
import { Textarea } from "@/components/form-components/Textarea";
import { ModalCenter } from "@/components/modal/ModalCenter";
import { maskCep, maskPrice } from "@/helpers/mask";
import { useSelect } from "@/hooks/useSelect";
import { IOpeningHour } from "@/models/opening-hour.model";
import { ITicket } from "@/models/ticket.model";
import { api } from "@/services/api";
import { days, typeTicket } from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { FiCheck, FiImage, FiTrash, FiX } from "react-icons/fi";
import { useTextField } from "ui-form-components";

export function CreatePlaceContent() {
    const [files, setFiles] = useState<Array<File>>([]);
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [placeType, setPlaceType] = useState(1);
    const name = useTextField({ required: true });
    const description = useTextField({ required: true });
    const start = useTextField({ required: true });
    const end = useTextField({ required: true });
    const dayWeek = useSelect(days);
    const [openingHours, setOpeningHours] = useState<Array<IOpeningHour>>([]);
    const [tickets, setTickets] = useState<Array<ITicket>>([]);
    const ticketType = useSelect(typeTicket);
    const ticketValue = useTextField({
        type: {
            regex: /$/,
            message: 'Valor do ingresso inválido',
            mask: maskPrice
        }
    });
    const ticketLink = useTextField({
        type: {
            regex: /$/,
            message: 'Link do ingresso inválido',
        }
    });
    const zipcode = useTextField({
        type: {
            regex: /^\d{5}-\d{3}$/,
            message: 'CEP inválido',
            mask: maskCep,
        }
    });
    const city = useTextField({});
    const state = useTextField({});
    const address = useTextField({});
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            const { success, result } = await api.post(placeType == 1 ? 'events' : 'tourist-attractions', {
                name: name.value,
                openingHours: openingHours,
                tickets: tickets,
                address: address.value,
                zipCode: zipcode.value,
                city: city.value,
                state: state.value,
                description: description.value,
                admissionFee: true,
                images: [],
                sponsors: "Exemplo dos patrocinadores"
            }).then(res => {
                return res.data;
            });
            if (success && result?.id) {
                if (files && files.length > 0) {
                    for (let i = 0; i < files.length; i++) {
                        await uploadFile(result.id, files[i]);
                    }
                }
                setSuccess(true);
            } else {
                console.log('Falha ao criar evento. Sucesso:', success); // Adicione esta linha
            }
        } catch (error) {

        } finally {

        }
    }

    const uploadFile = async (id: number, file: File) => {
        const form = new FormData();
        form.append('file', file);

        await api.post(placeType == 1 ? `events/${id}/upload` : `tourist-attractions/${id}/upload`, form).then(res => res.data);
        
    }

    const findPlaceByZipcode = async (str: string) => {
        const { results } = await api.post('places/geocode', {
            input: str
        }).then(res => res.data);

        if (results[0]) {
            const { route, number, district, city: cityResult, state: stateResult } = results[0];
            console.log(results[0]);
            
            city.setValue(cityResult);
            state.setValue(stateResult);
            
            const formattedAddress = [
                route,
                number && `, ${number}`,
                district && ` - ${district}`
            ].filter(Boolean).join('');
        
            address.setValue(formattedAddress);
        }
    }

    const nextStep = () => {
        switch (step) {
            case 1:
                name.validate() && description.validate() && setStep(step + 1)
                break;
            case 2:
                setStep(step + 1)
                break;
            case 3:
                handleSubmit();
                break;
        }
    }

    const addOpeningHours = () => {
        try {
            if (start.isValid() && end.isValid() && dayWeek.validate()) {
                setOpeningHours(old => [...old, {
                    dayOfWeek: dayWeek.value.enum,
                    endTime: end.value,
                    startTime: start.value
                }]);
            }
        } catch (error) {
            alert(error);
        }
    }

    const removeOpeningHours = (index: number) => {
        const array = [...openingHours];
        array.splice(index, 1);
        console.log(index);
        setOpeningHours(array);
    }

    const addTickets = () => {
        try {
            if (ticketType.validate() && ticketValue.validate()) {
                setTickets(old => [...old, {
                    type: ticketType.value.name,
                    value: ticketValue.value,
                    link: ticketLink.value
                }]);
            }
        } catch (error) {
            alert(error);
        }
    }

    const removeTickets = (index: number) => {
        const array = [...tickets];
        array.splice(index, 1);
        console.log(index);
        setTickets(array);
    }

    return (
        <main className="relative py-8 max-lg:px-6">
            <ModalCenter
                show={success}
                actionPrimaryButton={() => router.push(placeType == 1 ? '/meus-eventos' : '/meus-pontos-turisticos')}
                close={() => router.push(placeType == 1 ? '/meus-eventos' : '/meus-pontos-turisticos')}
                icon="/Sucess.svg"
                labelPrimaryButton="Continuar"
                text={placeType == 1 ? 'Seu evento foi criado com sucesso.' : 'Seu ponto turístico foi criado com sucesso.'}
                title="Sucesso"
            />
            <div className="w-full max-w-[416px] min-h-screen mx-auto flex flex-col gap-6">
                <button className="lg:absolute top-8 left-8" onClick={() => router.push('/')}><FiX size={24} /></button>
                <div className="py-2 flex gap-2 w-full items-center">
                    <div className="flex items-center flex-1 h-2 bg-grey1 border border-grey1 rounded overflow-hidden">
                        <div className={`flex h-full flex-1 bg-secondary-pure`}></div>
                        <div className={`flex h-full flex-1 ${step > 1 && 'bg-secondary-pure'}`}></div>
                        <div className={`flex h-full flex-1 ${step > 2 && 'bg-secondary-pure'}`}></div>
                    </div>
                    <span className="font-span2 text-span">Passo {step} de 3</span>
                </div>
                <h1 className={'font-display text-display'}>Criar evento ou ponto turístico</h1>
                <p className={'font-paragraph2 text-paragraph'}>Para criar um evento ou ponto turístico no CaldasVisor, por favor, forneça as seguintes informações.</p>
                {step == 1 &&
                    <div className="flex flex-col gap-4">
                        <SelectTypePlace type={placeType} setType={(t) => setPlaceType(t)} />
                        <div className="border-t border-grey1"></div>
                        <InputText
                            id="name"
                            label="Nome"
                            placeholder="Insira o nome"
                            {...name}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <InputFile
                                index={0}
                                file={files[0] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                            />
                            <InputFile
                                index={1}
                                file={files[1] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                            />
                            <InputFile
                                index={2}
                                file={files[2] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                            />
                            <InputFile
                                index={3}
                                file={files[3] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                            />
                            <InputFile
                                index={4}
                                file={files[4] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                            />
                            <InputFile
                                index={5}
                                file={files[5] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                            />
                        </div>
                        <div className="border-t border-grey1"></div>
                        <h3 className="font-heading3">Horário de funcionamento: </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <InputText
                                id="openingHours"
                                label="Início"
                                placeholder="Insira o horário de funcionamento"
                                type="time"
                                {...start}
                            />
                            <InputText
                                id="openingHours"
                                label="Final"
                                placeholder="Insira o horário de funcionamento"
                                type="time"
                                {...end}
                            />
                        </div>
                        <Select
                            title="Dia da semana"
                            placeholder={'Selecione o dia da semana'}
                            {...dayWeek}
                        />
                        <ButtonSecondary
                            onClick={addOpeningHours}
                            label="Adicionar horários de funcionamento"
                            full
                        />
                        {openingHours.map((item, index) => (
                            <div className="p-4 border flex flex-col gap-1 relative rounded">
                                <span className="font-span2 text-span">Dia da semana: {days.find(day => day.enum == item.dayOfWeek).name}</span>
                                <span className="font-span2 text-span">Início: {item.startTime}</span>
                                <span className="font-span2 text-span">Final: {item.endTime}</span>
                                <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center" onClick={() => removeOpeningHours(index)}><FiTrash /></button>
                            </div>
                        ))}
                        <div className="border-t border-grey1"></div>
                        <Textarea
                            id="description"
                            label="Descrição do evento "
                            placeholder="Insira a descrição do evento"
                            {...description}
                        />
                    </div>
                }
                {step == 2 &&
                    <div className="flex flex-col gap-4">
                        <Select title="Tipo de ingresso" placeholder={'Selecione o tipo de ingresso'} {...ticketType} />
                        <InputText label="Valor do ingresso " placeholder={'Insira o valor do ingresso'} id="price" {...ticketValue} />
                        <InputText label="Link de compra " placeholder={'Insira o link de compra'} id="price" {...ticketLink} />
                        {step > 1 &&
                            <ButtonSecondary
                                label="Adicionar tipo de ingressos"
                                onClick={addTickets}
                                full
                                large
                            />
                        }
                        {tickets.map((item, index) => (
                            <div className="p-4 border rounded flex flex-col gap-1 relative">
                                <span className="font-span2 text-span">Tipo: {item.type}</span>
                                <span className="font-span2 text-span">Preço: R$ {maskPrice(item.value)}</span>
                                <span className="font-span2 text-span">Link: {item.link}</span>
                                <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center" onClick={() => removeTickets(index)}><FiTrash /></button>
                            </div>
                        ))}
                    </div>
                }
                {step == 3 &&
                    <div className="flex flex-col gap-4">
                        <InputText
                            id="cep"
                            label="CEP"
                            required= "true"
                            placeholder="Inserir CEP"
                            {...zipcode}
                            onBlur={e => findPlaceByZipcode(e.target.value)}
                        />
                        <InputText
                            id="state"
                            label="Estado"
                            required= "true"
                            placeholder="Inserir o Estado"
                            disabled
                            {...state}
                        />
                        <InputText
                            id="city"
                            label="Cidade"
                            required= "true"
                            placeholder="Inserir a Cidade"
                            disabled
                            {...city}
                        />
                        <InputText
                            id="logradouro"
                            label="Logradouro"
                            required= "true"
                            placeholder="Inserir Logradouro"
                            {...address}
                        />
                    </div>
                }
                <div className="flex flex-col gap-4">
                    <ButtonPrimary
                        onClick={nextStep}
                        label={step < 3 ? "Continuar" : "Criar evento"}
                        large={true}
                        full={true}
                    />
                    {step > 1 &&
                        <ButtonSecondary
                            label="Voltar"
                            onClick={() => setStep(step - 1)}
                            full
                            large
                        />
                    }
                </div>
            </div>
        </main>
    )
}

export function SelectTypePlace({ type, setType }: { type: number, setType: (t: number) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-heading3">Selecione o que deseja criar: </h3>
            <div className="flex gap-2 cursor-pointer w-fit" onClick={() => setType(1)}>
                <div className={`w-6 h-6 rounded-md border-2 border-Grey3 ${type == 1 ? 'bg-primary-pure border-primary-pure text-white' : ''} flex items-center justify-center`}>
                    {type == 1 && <FiCheck />}
                </div>
                <span className="font-paragraph2 text-paragraph">Evento</span>
            </div>
            <div className="flex gap-2 cursor-pointer w-fit" onClick={() => setType(2)}>
                <div className={`w-6 h-6 rounded-md border-2 border-Grey3 ${type == 2 ? 'bg-primary-pure border-primary-pure text-white' : ''} flex items-center justify-center`}>
                    {type == 2 && <FiCheck />}
                </div>
                <span className="font-paragraph2 text-paragraph">Ponto turístico</span>
            </div>

        </div>
    )
}

export function InputFile({ file, index, onChange }: { file?: File | string, index: number, onChange?: (file: File) => void }) {
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
                {file && file instanceof File && <Image src={URL.createObjectURL(file)} alt="" fill objectFit="cover" />}
                {!file &&
                    <>
                        <FiImage />
                        <span className="font-span1">Inserir imagem</span>
                    </>
                }
            </label>
        </>
    )
}