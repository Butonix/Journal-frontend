import style from "../AuthDialog.module.scss";
import {Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {RegistrationSchema} from "../../../utils/schemas/RegistrationSchema";
import {AuthService} from "../../../utils/api";
import {CreateUserDto} from "../../../utils/api/types";

export const AuthFormRegistration = ({setForm}) => {
    const form = useForm({
        mode:'onSubmit',
        resolver: yupResolver(RegistrationSchema)
    })

    const onSubmit = async (dto:CreateUserDto) => {
        try {
            //const data = await AuthService.registration(dto)
            console.log(dto)
        }catch (e){
            alert('sorry')
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
                {/*<TextField*/}
                {/*    {...form.register('password2')}*/}
                {/*    error={!!form.formState.errors.password2?.message}*/}
                {/*    helperText={form.formState.errors.password2?.message}*/}
                {/*    variant='outlined' fullWidth placeholder='Повторите пароль'/>*/}
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