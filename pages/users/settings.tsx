import {Button, Input, Divider, Paper, TextField, Typography} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {Api} from "../../utils/api";

export default function Settings() {
    const userData = useAppSelector(selectUserData)
    const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl)
    const [fullName, setFullName] = useState(userData.fullName)
    const [email, setEmail] = useState(userData.email)
    const [about, setAbout] = useState(userData.about || '')
    const [link, setLink] = useState(userData.link || '')
    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Api().users.editUserProfile({avatarUrl, fullName, email, about, link})
        } catch (e) {
            alert('123')
        }
    }
    const uploadImage = async (e) => {
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            const {data} = await axios.post('http://localhost:7070/upload', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            })
            setAvatarUrl(data.file.url)
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }
    return (
        <MainLayout hideComments>
            <Paper className="p-20" elevation={0}>
                <Typography variant="h6">Основные настройки</Typography>
                <Divider className="mt-20 mb-30"/>
                <form onSubmit={onSubmit}>
                    <TextField
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className="mb-20"
                        fullWidth
                        required
                        label='Полное имя'
                    />
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mb-20"
                        fullWidth
                        label='email'
                        required
                    />
                    <TextField
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                        className="mb-20"
                        fullWidth
                        label='О себе'
                    />
                    <TextField
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        className="mb-20"
                        fullWidth
                        label='Ссылка'
                        required
                    />
                    <Input type='file' onChange={e => uploadImage(e)}/>
                    <Divider className="mt-30 mb-20"/>
                    <Button disabled={isLoading} type='submit' color="primary" variant="contained">
                        Сохранить изменения
                    </Button>
                </form>
            </Paper>
        </MainLayout>
    );
}
