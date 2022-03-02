import style from "../AuthDialog.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {RegistrationSchema} from "../../../utils/schemas/RegistrationSchema";
import {Api} from "../../../utils/api";
import {CreateUserDto} from "../../../utils/api/types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AuthFormRegistration = ({setForm}) => {
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(RegistrationSchema)
    })

    const onSubmit = async (dto: CreateUserDto) => {
        try {
            const data = await Api().auth.registration(dto)
        } catch (e) {
            console.log(e, 'error AuthFormLogin')
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={style.registration}>
            <div className={style.registrationFields}>
                <TextField
                    {...form.register('email')}
                    error={!!form.formState.errors.email?.message}
                    helperText={form.formState.errors.email?.message}
                    variant='outlined' fullWidth placeholder='email'/>
                <TextField
                    {...form.register('fullName')}
                    error={!!form.formState.errors.fullName?.message}
                    helperText={form.formState.errors.fullName?.message}
                    variant='outlined' fullWidth placeholder='Имя пользователя'/>
                <TextField
                    {...form.register('password')}
                    error={!!form.formState.errors.password?.message}
                    helperText={form.formState.errors.password?.message}
                    variant='outlined' fullWidth placeholder='Пароль'/>
            </div>
            <div className={style.buttonWrapper}>
                <Button variant='outlined' onClick={() => setForm('main')}>
                    Назад
                </Button>
                <Button disabled={form.formState.isSubmitting} type='submit' variant='contained' color='primary'>
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    )
}