'use client'
import VMasker from "vanilla-masker";
import { InputText } from "../form-components/InputText";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTextField, InputTypes } from "ui-form-components";
import { CheckBox } from "../form-components/CheckBox";
import Link from "next/link";
import { ProgressBar } from "../progress-bar/ProgressBar";
import { api } from "@/services/api";
import { ModalCenter } from "../modal/ModalCenter";
import VLibras from 'vlibras-nextjs';


export function FormCreateAccountCustumerOne() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const router = useRouter()

    const [checked, setChecked] = useState(false)

    function action() {
        checked == false ? setChecked(true) : setChecked(false)
    }

    const name = useTextField({
        required: true,
        type: {
            regex: /^[a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/,
            message: "O nome não contem ao menos uma letras (maiúsculas e minúsculas), acentuadas ou não, espaços, apóstrofos e hífens."
        }
    })

    const email = useTextField({
        required: true,
        type: InputTypes.email
    })

    const password = useTextField({
        required: true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres",
        }

    })

    const repeatPassword = useTextField({
        required: true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres",
        }
    })

    const companyName = useTextField({
        required: true,
        type: {
            regex: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/,
            message: "O nome não contem ao menos uma letras (maiúsculas e minúsculas), acentuadas ou não, espaços, apóstrofos e hífens."
        }
    })

    const cep = useTextField({
        required: true,
        type: {
            mask: (value) => VMasker.toPattern(value, "99999-999"),
            regex: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/,
            message: "O nome não pode ser nulo."
        }
    })

    const document = useTextField({
        required: true,
        type: {
            mask: (value) => value.length <= 14 ? VMasker.toPattern(value, "999.999.999-99") : VMasker.toPattern(value, "99.999.999/9999-99"),
            regex: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ '-.]+$/,
            message: "O documento não pode ser nulo."
        }
    })

    const city = useTextField({
        required: true,
        type: {
            regex: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/,
            message: "A cidade não pode ser nula."
        }
    })

    const state = useTextField({
        required: true,
        type: {
            regex: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/,
            message: "O estado não pode ser nulo."
        }
    })

    const address = useTextField({
        required: true,
        type: {
            regex: /^[0-9a-zA-ZÀ-ÖØ-öø-ÿ '-.]+$/,
            message: "O estado não pode ser nulo."
        }
    })

    function iqualPassword() {
        return password.value == repeatPassword.value ? true : false
    }

    async function handleSubmbit() {
        try {
            setLoading(true);
            const { success, result } = await api.post('users', {
                name: name.value,
                email: email.value,
                password: password.value,
                companyName: companyName.value,
                companyDocument: document.value,
                type: "organizer",
                cep: cep.value,
                state: state.value,
                city: city.value,
                address: address.value
            }).then(res => res.data);

            if (success) {
                setShowModal(true);
            } else {
                setShowModalError(true);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ProgressBar
                amount="2"
                state={step}
            />
            {step == 1 &&
                <div className="flex flex-col gap-6 w-full">
                    <form className="flex flex-col gap-4 w-full" onSubmit={e => e.preventDefault()}>
                        <InputText
                            id="Nome"
                            label="Nome"
                            placeholder="Inserir Nome"
                            type="nome"
                            {...name}
                        />
                        <InputText
                            id="Email"
                            label="Email"
                            placeholder="Inserir E-mail"
                            type="email"
                            {...email}
                        />
                        <InputText
                            id="Password"
                            label="Senha"
                            placeholder="Inserir senha"
                            type="password"
                            {...password}
                        />
                        <InputText
                            id="Password"
                            label="Repita sua senha"
                            placeholder="Inserir a senha novamente"
                            type="password"
                            required={true}
                            {...repeatPassword}
                        />
                        <div className="flex flex-row items-start w-full py-2 gap-2 top-auto">
                            <CheckBox
                                text={false}
                                onClick={action}
                                active={checked}
                            />
                            <div className=" flex flex-wrap max-w-[295px] pt-2 gap-1">
                                <p className="font-paragraph2 text-paragraph  top-auto">Li e aceito a</p>
                                <p className="underline underline-offset-2 font-paragraph2 text-support-info cursor-pointer" onClick={() => { }}>política de privacidade</p>
                                <p className="font-paragraph2 text-paragraph top-auto">e</p>
                                <p className="underline underline-offset-2 font-paragraph2 text-support-info cursor-pointer" onClick={() => { }}>termos de uso</p>
                                <p className="font-paragraph2 text-paragraph top-auto">do CaldasVisor.</p>
                            </div>
                        </div>

                    </form>
                    <ButtonPrimary
                        disabled={!name.isValid() || !email.isValid() || !iqualPassword() || !password.isValid() || !repeatPassword.isValid() || !checked}
                        onClick={() => setStep(2)}
                        label="Continuar"
                        large={true}
                        full={true}
                    />
                    <ButtonSecondary
                        onClick={() => router.push('/login')}
                        label="Cancelar"
                        large={true}
                        full={true}
                    />
                </div>
            }
            {step == 2 &&
                <div className="flex flex-col gap-6 w-full">
                    <form className="flex flex-col gap-4 w-full" onSubmit={e => e.preventDefault()}>
                        <InputText
                            id="companyName"
                            label="Nome da empresa"
                            placeholder="Inserir Nome"
                            type="text"
                            {...companyName}
                        />
                        <InputText
                            id="document"
                            label="CPF ou CNPJ"
                            placeholder="Inserir CPF ou CNPJ"
                            type="text"
                            {...document}
                        />
                        <InputText
                            id="cep"
                            label="CEP"
                            placeholder="Inserir CEP"
                            type="text"
                            {...cep}
                        />
                        <InputText
                            id="city"
                            label="Cidade"
                            placeholder="Inserir cidade"
                            type="text"
                            {...city}
                        />
                        <InputText
                            id="state"
                            label="Estado"
                            placeholder="Inserir estado"
                            type="text"
                            {...state}
                        />
                        <InputText
                            id="address"
                            label="Logradouro"
                            placeholder="Inserir logradouro"
                            type="text"
                            {...address}
                        />
                    </form>
                    <ButtonPrimary
                        disabled={!name.isValid() || !email.isValid() || !iqualPassword() || !password.isValid() || !repeatPassword.isValid() || !checked}
                        onClick={handleSubmbit}
                        label="Criar conta"
                        large={true}
                        full={true}
                    />
                    <ButtonSecondary
                        onClick={() => router.push('/login')}
                        label="Cancelar"
                        large={true}
                        full={true}
                    />
                </div>
            }
            <ModalCenter
                close={() => setShowModal(false)}
                actionPrimaryButton={() => router.push('/login')}
                icon="/Sucess.svg"
                show={showModal}
                text={'Acesse sua conta e proveite ao máximo os benefícios da sua conta e mantenha-se informado sobre os eventos emocionantes e os principais pontos turísticos de Caldas Novas.'}
                title={'Sua conta foi criada com sucesso!!!'}
                labelPrimaryButton="Ir para login"
            />
            <ModalCenter
                close={() => setShowModalError(false)}
                actionPrimaryButton={() => router.push('/create-account-customer')}
                icon="/Question.svg"
                show={showModalError}
                text={'Não foi possível criar sua conta no momento. Por favor, tente novamente mais tarde ou entre em contato com o suporte para assistência.'}
                title={'Erro ao criar conta'}
                labelPrimaryButton="Tentar novamente"
            />
        {process.env.NODE_ENV === "production" && <VLibras forceOnload />}

        </>
    )
}