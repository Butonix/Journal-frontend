import styles from './WriteForm.module.scss'
import {Button, TextField} from "@material-ui/core";
import {NextPage} from "next";
import dynamic from "next/dynamic";
import MessageIcon from "@material-ui/icons/TextsmsOutlined";
import {useState} from "react";
import {Api} from "../../utils/api";
import {ArticleResponse} from "../../utils/api/types";
import {useRouter} from 'next/router';

const Editor = dynamic(() => import("../Editor").then(m => m.Editor), {ssr: false})

interface WriteFormProps {
    data?: ArticleResponse
}

export const WriteForm: NextPage<WriteFormProps> = ({data}) => {
    const router = useRouter();
    const [title, setTitle] = useState(data?.title || '')
    const [blocks, setBlocks] = useState(data?.body || [])

    const onAddArticles = async () => {
        try {
            const obj = {
                title, body: blocks
            }
            if (!data) {
                const article = await Api().article.sendArticle({
                    title, body: blocks
                })
                await router.push(`/write/${article.id}`);
            } else {
                await Api().article.editArticle(obj, +data.id)
            }


        } catch (e) {
            console.warn(e, 'error')
        }

    }
    return (
        <div className={styles.writeForm}>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                classes={{root: styles.titleField}}
                placeholder="Заголовок"
                fullWidth
                multiline
            />
            <div className={styles.editorWrapper}>
                <Editor value={blocks} setBlocks={setBlocks}/>
                <Button className={styles.button} onClick={onAddArticles} variant='contained' color='primary'>
                    <MessageIcon/>
                    {data ? 'Сохранить' : 'Опубликовать'}
                </Button>
            </div>


        </div>
    )
}