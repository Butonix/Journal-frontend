import {useEffect} from "react";
import EditorJS from "@editorjs/editorjs";

export const Editor = () => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder:'Начните вводить текст'
        })
        return () => {
            editor.isReady
                .then(() => {editor.destroy()})
                .catch(() => console.log('editor cleanup error'))
        }
    }, [])
    return (
        <div id='editor'/>
    )
}