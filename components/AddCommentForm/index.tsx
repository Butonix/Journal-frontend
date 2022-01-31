import {Input, Button} from "@material-ui/core";
import styles from './AddCommetForm.module.scss'
import {useState} from "react";

export const AddCommentForm = () => {
    const [clicked, setClicked] = useState(false)
    const [text,setText] = useState('')

    const onChangeHandler = (e) => {
        setText(e.target.value)
    }
    const onSubmit = () => {
        setText('')
        setClicked(false)
    }
    const onFocusHandler = () => {
        setClicked(true)
    }

    return (
        <div className={styles.commentForm}>
            <Input value={text} onChange={onChangeHandler}
                onFocus={onFocusHandler}
                fullWidth
                minRows={clicked ? 5 : 2}
                placeholder='Написать комментарий'
                classes={{root: styles.field}}
                multiline
            />
            <div className={styles.buttonContainer}>
                {clicked && <Button onClick={onSubmit} variant='contained' color='primary'>Отправить</Button>}
            </div>
        </div>

    )
}