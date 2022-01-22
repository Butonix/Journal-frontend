import * as yup from "yup";

export const LoginSchema = yup.object().shape({
    email:yup.string().email('Укажите валидный email').required('Поле обязательно'),
    password:yup.string().min(6, 'Минимум 6 символов').required('Поле обязательно')
})
