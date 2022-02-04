import React, {useEffect} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import ImageTool from '@editorjs/image';


interface EditorProps {
    value?: OutputData['blocks']
    setBlocks: (blocks: OutputData['blocks']) => void
}

export const Editor: React.FC<EditorProps> = ({setBlocks, value}) => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Начните вводить текст',
            async onChange() {
                const {blocks} = await editor.save()
                setBlocks(blocks)
            },
            data: {
                blocks: value
            },
            tools:{
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:7070/upload',
                        },
                        field:'file'
                    }
                }
            }
        })
        return () => {
            editor.isReady
                .then(() => {
                    editor.destroy()
                })
                .catch(() => console.log('editor cleanup error'))
        }
    }, [])
    return (
        <div id='editor'/>
    )
}