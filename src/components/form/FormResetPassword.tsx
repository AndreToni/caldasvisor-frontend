'use client'

import { InputText } from "../form-components/InputText";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ModalCenter } from "@/components/modal/ModalCenter";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTextField, InputTypes } from "ui-form-components";
import { useAuth } from "@/contexts/auth";
import { api } from "@/services/api";

export function FormResetPassword() {
    const { user } = useAuth()
    const router = useRouter()

    const [showModal, setShowModal] = useState(false);

    const currentPassword = useTextField({
        required: true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres.",
        }

    })

    const password = useTextField({
        required: true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres.",
        }

    })

    const repeatPassword = useTextField({
        required: true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha não está igual a senha informada acima.",
        }
    })

    function iqualPassword() {
        return (password.value == repeatPassword.value) && currentPassword.value != '' && password.value != '';
    }

    async function handleSubmbit() {
        try {
            const { data } = await api.post('auth/reset-password', {
                userId: user.id,
                currentPassword: currentPassword.value,
                newPassword: password.value,
                repeatPassword: repeatPassword.value,
            });

            if (data.success) {
                setShowModal(true);
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <div className="flex flex-col gap-6 w-full">
            <form className="flex flex-col gap-4 w-full" onSubmit={e => e.preventDefault()}>
                <InputText

                    id="Password"
                    label="Senha atual"
                    placeholder="Inserir senha"
                    type="password"
                    {...currentPassword}
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
                    label="Repita a senha"
                    placeholder="Inserir senha"
                    type="password"
                    required={true}
                    {...repeatPassword}
                />

            </form>
            <ButtonPrimary
                disabled={!iqualPassword()}
                onClick={() => handleSubmbit()}
                label="Trocar a senha"
                large={true}
                full={true}
            />
            <ModalCenter
                close={() => setShowModal(false)}
                actionPrimaryButton={() => router.push('/login')}
                icon="/Sucess.svg"
                show={showModal}
                text={'Sua senha foi trocada, com sucesso, agora de continuidade no uso da plataforma.'}
                title={'Senha trocada com sucesso!!!'}
                labelPrimaryButton="Ir para login"
            />
        </div>
    );
}