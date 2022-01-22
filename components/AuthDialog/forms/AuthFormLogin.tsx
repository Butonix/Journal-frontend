import style from "../AuthDialog.module.scss";
import {Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginSchema} from "../../../utils/schemas/loginSchema";

export const AuthFormLogin = ({setForm}) => {
    const form = useForm({
        mode:'onSubmit',
        resolver: yupResolver(LoginSchema)
    })
    const onSubmit = data => console.log(data);
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={style.registration}>
                <div className={style.registrationFields}>
                    <TextField
                        {...form.register('email')}
                        error={!!form.formState.errors.email?.message}
                        helperText={form.formState.errors.email?.message}
                        variant='outlined'
                        fullWidth
                        placeholder='email'/>
                    <TextField
                        {...form.register('password')}
                        error={!!form.formState.errors.password?.message}
                        helperText={form.formState.errors.password?.message}
                        variant='outlined'
                        fullWidth
                        placeholder='Пароль'/>
                </div>
                <div className={style.buttonWrapper}>
                    <Button variant='outlined' onClick={() => setForm('main')}>
                        Назад
                    </Button>
                    <Button type='submit' variant='contained' color='primary'>
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
        </form>
    )
}