import styles from './WriteForm.module.scss'
import {Input,Button} from "@material-ui/core";
import {NextPage} from "next";
import dynamic from "next/dynamic";
import MessageIcon from "@material-ui/icons/TextsmsOutlined";

const Editor = dynamic(() => import("../Editor").then(m => m.Editor), {ssr: false})

interface WriteFormProps {
    title?: string
}

export const WriteForm: NextPage<WriteFormProps> = ({title}) => {
    return (
        <div>
            <Input
                classes={{root: styles.titleField}}
                placeholder="Заголовок"
                fullWidth
            />
            <div className={styles.editor}>
                <Editor/>
            </div>

            <Button variant='contained' color='primary'>
                <MessageIcon/>
                Опубликовать
            </Button>

        </div>
    )
}