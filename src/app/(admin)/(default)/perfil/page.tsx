'use client'

import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { ModalCenter } from "@/components/modal/ModalCenter";
import { useAuth } from "@/contexts/auth";
import { api } from "@/services/api";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { TextField, useTextField } from "ui-form-components";

export default function Perfil() {
    const { user, updateUser, signout} = useAuth();

    const router = useRouter();
    const name = useTextField({initialValue: user?.name});
    const email = useTextField({initialValue: user?.email});
    const [showModal, setShowModal] = useState(false);

    const handleUpdateUser = async () => {
        try {
           const {data} = await api.patch(`users/${user.id}`, {
                name: name.value,
                email: email.value,
            });

            if(data.success && data.result) {
                updateUser(data.result);
            }
        } catch (error) {
            alert(error);
        } 
    }

    const handleRemoveUser = async () => {
        try {
            const {data} = await api.delete(`users/${user.id}`);

            if(data.success) {
                await signout();
            }
        } catch(error) {
            alert(error);
        }
    }

    return (
        <main className="relative">
            <button className="absolute top-8 left-8" onClick={() => router.push('/')}><FiX size={24} /></button>
            <div className="w-full max-w-[416px] min-h-screen mx-auto py-8 flex flex-col gap-6">
                <h1 className={'font-display text-display'}>Perfil</h1>
                <p className={'font-paragraph2 text-paragraph'}>Gerencie seu perfil CaldasVisor.</p>
                <div className="flex flex-col gap-4">
                    <TextField
                        label="Nome"
                        type="text"
                        {...name}
                    />
                    <TextField
                        label="Email"
                        type="text"
                        {...email}
                    />
                    <ButtonSecondary
                        label="Atualizar meus dados"
                        onClick={handleUpdateUser}
                        full
                        large
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className={'font-paragraph2 text-paragraph'}>Você pode definir uma nova senha.</p>
                    <ButtonSecondary
                        label="Trocar minha senha"
                        onClick={() => router.push('/reset-password')}
                        full
                        large
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <p className={'font-paragraph2 text-paragraph'}>Você pode excluir sua conta.</p>
                    <ButtonSecondary
                        label="Excluir minha conta"
                        onClick={() => setShowModal(true)}
                        full
                        large
                    />
                </div>
            </div>
            <ModalCenter
                close={() => setShowModal(false)}
                actionPrimaryButton={() => setShowModal(false)}
                actionSecondaryButton={handleRemoveUser}
                icon="/Email.svg"
                show={showModal}
                title={'Deseja realmente excluir a sua conta?'}
                labelPrimaryButton="Não desejo"
                labelSecondaryButton="Sim desejo "
            />
        </main>
    )
}