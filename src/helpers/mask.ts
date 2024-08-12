import VMasker from "vanilla-masker";

export const maskPrice = (value: string) => VMasker.toMoney(value);
export const maskCep = (value: string) => VMasker.toPattern(value, '99999-999');