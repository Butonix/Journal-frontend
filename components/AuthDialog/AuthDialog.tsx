import {Dialog} from '@material-ui/core'
import React, {useState} from "react";
import {AuthFormMain} from "./forms/AuthFormMain";
import {AuthFormRegistration} from "./forms/AuthFormRegistration";
import {AuthFormLogin} from "./forms/AuthFormLogin";

interface AuthDialogProps {
    open: boolean
    close: () => void
}

export const AuthDialog: React.FC<AuthDialogProps> = ({open, close}) => {

    const [form, setForm] = useState<'main' | 'registration' | 'login'>('main')

    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                fullWidth
                maxWidth='xs'
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                {form === 'main' && <AuthFormMain close={close} setForm={setForm}/>}
                {form === 'registration' && <AuthFormRegistration setForm={setForm}/>}
                {form === 'login' && <AuthFormLogin setForm={setForm}/>}
            </Dialog>
        </div>
    )
}