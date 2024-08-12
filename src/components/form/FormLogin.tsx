'use client'

import Link from "next/link";
import { InputText } from "../form-components/InputText";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { useRouter } from "next/navigation";
import { useTextField, InputTypes } from "ui-form-components";
import { useAuth } from "@/contexts/auth";
import { useState } from "react";

export function FormLogin() {
    const { signin } = useAuth();
    const [error, setError] = useState(false);
    const email = useTextField({
        required: true,
        type: InputTypes.email
    });

    const password = useTextField({
        required: true,
        type: {
            regex: /^.{8,}$/,
            message: "A senha deve conter no minimo 8 caracteres",
        }

    });

    const router = useRouter();

    const handleSubmit = async () => {
        await signin(email.value, password.value);
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <form className="flex flex-col gap-4 w-full" onSubmit={e => e.preventDefault()}>
                <InputText
                    id="Email"
                    label="Email"
                    placeholder="Inserir E-mail"
                    type="email"
                    {...email}
                />

                <InputText
                    id="Password"
                    label="Password"
                    placeholder="Inserir senha"
                    type="password"
                    {...password}
                />
                <div className="flex w-full justify-end">
                    <Link href={'/forgot-password'} className="font-paragraph2 text-paragraph ">Recuperar sua senha</Link>
                </div>

            </form>
            <ButtonPrimary
                disabled={!email.isValid() || !password.isValid()}
                onClick={handleSubmit}
                label="Entrar"
                large={true}
                full={true}
            />
            <ButtonSecondary
                onClick={() => router.push('/type-account')}
                label="Criar conta"
                large={true}
                full={true}
            />
        </div>
    );
}