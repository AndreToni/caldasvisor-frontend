'use client'

import { ButtonIcon } from "@/components/buttons/ButtonIcon";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { InputFile } from "@/components/form-components/InputFile";
import { InputText } from "@/components/form-components/InputText";
import Select from "@/components/form-components/Select";
import { Textarea } from "@/components/form-components/Textarea";
import { maskCep, maskPrice } from "@/helpers/mask";
import { useSelect } from "@/hooks/useSelect";
import { IOpeningHour } from "@/models/opening-hour.model";
import { IEvent, ITouristAttraction } from "@/models/place";
import { ITicket } from "@/models/ticket.model";
import { api } from "@/services/api";
import { days, typeTicket } from "@/utils/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { FiCheck, FiImage, FiTrash, FiX } from "react-icons/fi";
import { useTextField } from "ui-form-components";


export function UpdatePlaceContent({ place, type }: { place: IEvent | ITouristAttraction, type: number }) {
    const [files, setFiles] = useState<Array<File | string>>(place.images ?? []);
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [placeType, setPlaceType] = useState(type ?? 1);
    const name = useTextField({ required: true, initialValue: place.name });
    const description = useTextField({ required: true, initialValue: place.description });
    const start = useTextField({ required: true });
    const end = useTextField({ required: true });
    const dayWeek = useSelect(days);
    const [openingHours, setOpeningHours] = useState<Array<IOpeningHour>>(place.openingHours ?? []);
    const [tickets, setTickets] = useState<Array<ITicket>>(place.tickets ?? []);
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
        initialValue: place.zipCode.toString(),
        type: {
            regex: /^\d{5}-\d{3}$/,
            message: 'CEP inválido',
            mask: maskCep,
        }
    });
    const city = useTextField({ initialValue: place.city });
    const state = useTextField({ initialValue: place.state });
    const address = useTextField({ initialValue: place.address });

    const handleSubmit = async () => {
        try {
            const { success, result } = await api.patch(placeType == 1 ? `events/${place.id}` : `tourist-attractions/${place.id}`, {
                name: name.value,
                openingHours: openingHours,
                tickets: tickets,
                address: address.value,
                zipCode: zipcode.value,
                city: city.value,
                state: state.value,
                description: description.value,
                admissionFee: true,
            }).then(res => res.data);

            if (success && result?.id) {
                if (files.length > 0) {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i] instanceof File) {
                            await uploadFile(result.id, files[i] as File);
                        }
                    }
                }
                router.refresh();
                router.push(placeType == 1 ? '/meus-eventos' : '/meus-pontos-turisticos');
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

    const removeOpeningHours = async (index: number) => {
        const item = openingHours[index];
        if (confirm(`Deseja mesmo remover o horário?`)) {
            if (item.id) {
                await api.delete(`opening-hours/${item.id}`)
            }
            const array = [...openingHours];
            array.splice(index, 1);
            setOpeningHours(array);
        }
    }

    const addTickets = () => {
        try {
            if (ticketType.validate() && ticketValue.validate()) {
                setTickets(old => [...old, {
                    type: ticketType.value.name,
                    value: ticketValue.value,
                    link: ticketLink.value,
                }]);
            }
        } catch (error) {
            alert(error);
        }
    }

    const removeTickets = async (index: number) => {
        const item = tickets[index];
        if (confirm(`Deseja mesmo remover o ingresso?`)) {
            if (item.id) {
                await api.delete(`/tickets/${item.id}`)
            }
            const array = [...tickets];
            array.splice(index, 1);
            setTickets(array);

        }
    }

    const removeImage = async (file: File | string, index: number) => {
        if (confirm(`Deseja mesmo essa imagem?`)) {
            if (file && typeof (file) == 'string') {
                await api.post(placeType == 1 ? `events/${place.id}/remove-image` : `tourist-attractions/${place.id}/upload`, {path: file}).then(res => res.data);
            }

            const array = [...files];
            array.splice(index, 1);
            setFiles(array);

        }
    }

    return (
        <main className="relative py-8 max-lg:px-6">
            <div className="w-full max-w-[416px] min-h-screen mx-auto flex flex-col gap-6">
                <button className="lg:absolute top-8 left-8" onClick={() => router.back()}><FiX size={24} /></button>
                <div className="py-2 flex gap-2 w-full items-center">
                    <div className="flex items-center flex-1 h-2 bg-grey1 border border-grey1 rounded overflow-hidden">
                        <div className={`flex h-full flex-1 bg-secondary-pure`}></div>
                        <div className={`flex h-full flex-1 ${step > 1 && 'bg-secondary-pure'}`}></div>
                        <div className={`flex h-full flex-1 ${step > 2 && 'bg-secondary-pure'}`}></div>
                    </div>
                    <span className="font-span2 text-span">Passo {step} de 3</span>
                </div>
                <h1 className={'font-display text-display'}>Atualizar {type == 1 ? `evento` : `ponto turístico`}</h1>
                <p className={'font-paragraph2 text-paragraph'}>Para criar um evento ou ponto turístico no CaldasVisor, por favor, forneça as seguintes informações.</p>
                {step == 1 &&
                    <div className="flex flex-col gap-4">
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
                                onRemove={(f) => removeImage(f, 0)}
                            />
                            <InputFile
                                index={1}
                                file={files[1] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                                onRemove={(f) => removeImage(f, 1)}
                            />
                            <InputFile
                                index={2}
                                file={files[2] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                                onRemove={(f) => removeImage(f, 2)}
                            />
                            <InputFile
                                index={3}
                                file={files[3] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                                onRemove={(f) => removeImage(f, 3)}
                            />
                            <InputFile
                                index={4}
                                file={files[4] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                                onRemove={(f) => removeImage(f, 4)}
                            />
                            <InputFile
                                index={5}
                                file={files[5] ?? null}
                                onChange={(f) => setFiles(old => [...old, f])}
                                onRemove={(f) => removeImage(f, 5)}
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
                            <div className="p-4 border flex flex-col gap-1 relative rounded" key={index}>
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
                            placeholder="Inserir CEP"
                            {...zipcode}
                            onBlur={e => findPlaceByZipcode(e.target.value)}
                        />
                        <InputText
                            id="state"
                            label="Estado"
                            placeholder="Inserir o Estado"
                            disabled
                            {...state}
                        />
                        <InputText
                            id="city"
                            label="Cidade"
                            placeholder="Inserir a Cidade"
                            disabled
                            {...city}
                        />
                        <InputText
                            id="logradouro"
                            label="Logradouro"
                            placeholder="Inserir Logradouro"
                            {...address}
                        />
                    </div>
                }
                <div className="flex flex-col gap-4">
                    <ButtonPrimary
                        onClick={nextStep}
                        label={step < 3 ? "Continuar" : "Salvar alterações"}
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