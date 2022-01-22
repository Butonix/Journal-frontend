import {Dialog} from '@material-ui/core'
import {useState} from "react";
import {AuthFormMain} from "./forms/AuthFormMain";
import {AuthFormRegistration} from "./forms/AuthFormRegistration";
import {AuthFormLogin} from "./forms/AuthFormLogin";

export const AuthDialog = ({open, close}) => {

    const [form, setForm] = useState<'main' | 'registration' | 'login'>('main')

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={open}
                keepMounted
                onClose={close}
                aria-describedby="alert-dialog-slide-description"
            >
                {form === 'main' && <AuthFormMain close={close} setForm={setForm}/>}
                {form === 'registration' && <AuthFormRegistration setForm={setForm}/>}
                {form === 'login' && <AuthFormLogin setForm={setForm}/>}
            </Dialog>
        </div>
    )
}