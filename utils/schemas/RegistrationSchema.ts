import * as yup from "yup";

export const RegistrationSchema = yup.object().shape({
    email:yup.string().email('Укажите валидный email').required('Поле обязательно'),
    fullName:yup.string().required('Поле обязательно'),
    password:yup.string().min(6, 'Минимум 6 символов').required('Поле обязательно'),
    // password2:yup.string().min(6, 'Минимум 6 символов').required('Поле обязательно')
    //     .equals([yup.ref('password'), null], 'Пароли не совпадают')
})
