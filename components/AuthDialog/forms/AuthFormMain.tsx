import style from "../AuthDialog.module.scss";
import {Button} from "@material-ui/core";

export const AuthFormMain = ({setForm,close}) => {
    return (
        <div className={style.buttonGroup}>
            <Button onClick={()=>setForm('login')} className={'m-10'} variant='contained'>Войти в Journal</Button>
            <Button onClick={()=>setForm('registration')} className={'m-10'} variant='contained'>Регистрация</Button>
            <Button onClick={close} className={'m-10'} variant='contained'>Закрыть</Button>
        </div>
    )
}