'use client'
import { InputText } from "../form-components/InputText";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { ModalCenter } from "@/components/modal/ModalCenter";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTextField, InputTypes } from "ui-form-components";
import { api } from "@/services/api";

export function FormCreteAccount(){
    
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);

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

    const repeatPassword = useTextField({
        required:true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres",
        }
    })

    const password = useTextField({
        required:true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres.",
        }

    })

    function iqualPassword(){
        return password.value == repeatPassword.value ? true: false
    }
    
    async function handleSubmbit() {
        try {
            setLoading(true);
            const { success, result } = await api.post('users', {
                name: name.value,
                email: email.value,
                password: password.value,
                type: "customer",
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

    return(
        <div className="flex flex-col gap-6 w-full">
            <form className="flex flex-col gap-4 w-full" onSubmit={e => e.preventDefault()}>
                <InputText 
                        id="Name"
                        label="Nome"
                        placeholder="Inserir nome"
                        type="name"
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
                        label="Senha"
                        placeholder="Inserir a senha novamente"
                        type="password"
                        {...repeatPassword}

                />
            </form>
            <ButtonPrimary 
                disabled={!name.isValid() || !email.isValid() || !iqualPassword() || !password.isValid() || !repeatPassword.isValid()}
                onClick={handleSubmbit}
                label="Concluir conta" 
                large={true} 
                full={true}
            />
            <ButtonSecondary 
                onClick={()=>router.push('/login')}
                label="Cancelar" 
                large={true} 
                full={true}  
            />
            <ModalCenter 
                close={() => setShowModal(false)}
                actionPrimaryButton={()=>router.push('/login')}
                icon="/Sucess.svg"
                show={showModal}
                text={'Acesse sua conta e proveite ao máximo os benefícios da sua conta e mantenha-se informado sobre os eventos emocionantes e os principais pontos turísticos de Caldas Novas.'}
                title={'Sua conta foi criada com sucesso!!!'}
                labelPrimaryButton="Ir para login"
            />
             <ModalCenter
                close={() => setShowModalError(false)}
                actionPrimaryButton={() => router.push('/create-account')}
                icon="/Question.svg"
                show={showModalError}
                text={'Não foi possível criar sua conta no momento. Por favor, tente novamente mais tarde ou entre em contato com o suporte para assistência.'}
                title={'Erro ao criar conta'}
                labelPrimaryButton="Tentar novamente"
            />
        </div>
    );
}