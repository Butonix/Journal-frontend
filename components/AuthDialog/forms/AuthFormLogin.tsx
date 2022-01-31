import style from "../AuthDialog.module.scss";
import {setCookie} from 'nookies';
import {Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginSchema} from "../../../utils/schemas/loginSchema";
import {LoginUserDto} from "../../../utils/api/types";
import {Api, AuthService} from "../../../utils/api";
import {useAppDispatch} from "../../../redux/hooks";
import {setUserData} from "../../../redux/slices/user";

export const AuthFormLogin = ({setForm}) => {
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(LoginSchema)
    })
    const onSubmit = async (dto: LoginUserDto) => {
        try {
            const data = await Api().auth.login(dto)
            setCookie(null, 'journalToken', data.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
            dispatch(setUserData(data))
        } catch (e) {
            alert('sorry')
        }
    }
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