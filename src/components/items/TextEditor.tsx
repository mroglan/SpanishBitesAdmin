import MUIRichTextEditor from 'mui-rte'
import {createMuiTheme, ThemeProvider, Box} from '@material-ui/core'
import {useState, useEffect, useMemo, useRef} from 'react'
import {EditorState, convertToRaw} from 'draft-js'

const theme = createMuiTheme()

Object.assign(theme, {
    overrides: {
        MUIRichTextEditor: {
            toolbar: {
                '& button': {
                    marginRight: '.1rem'
                }
            },
            editor: {
                border: '1px solid #ccc',
                '&:focus-within': {
                    borderColor: '#556cd6' 
                },
                minHeight: 100
            },
            editorContainer: {
                paddingLeft: '.5rem',
                paddingRight: '.5rem',
                fontSize: '1.1rem', 
                lineHeight: 1.5,
                marginBottom: 16,
                '& a': {
                    color: '#1976d2 !important'
                }
            }
        }
    }
})

interface BasicProps {
    value: string;
    onChange: (val:any) => void;
    inputId: string;
}

const handleContentChange = (state:EditorState, callback:BasicProps['onChange']) => {
    console.log('content changing...')
    const content = state.getCurrentContent()
    const raw = JSON.stringify(convertToRaw(content))
    
    callback(raw)
}

const basicControls  = [
    'bold', 'italic', 'underline', 'highlight', 'link'
]

export function BasicTextEditor({value, onChange, inputId}:BasicProps) {

    const [clientSide, setClientSide] = useState(false)

    const [defaultVal, setDefaultVal] = useState(value)
    
    const [id, setId] = useState(inputId)

    useMemo(() => {
        if(!inputId) return
        if(inputId === id) return
        setId(inputId)
        setDefaultVal(value)
    }, [value])

    useEffect(() => {
        setClientSide(true)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Box>
                {clientSide && <MUIRichTextEditor label="Start typing..." defaultValue={defaultVal} controls={basicControls}
                onChange={(state) => handleContentChange(state, onChange)} /> }
            </Box>
        </ThemeProvider>
    )
}

interface AdvancedProps {
    value: string;
    onSave: (data:string, config:any) => void;
    inputId: string;
    inputRef: any;
    config: any;
}

const advancedControls = [
    "title", "bold", "italic", "underline", "strikethrough", "highlight",
    "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear", 
]

export function AdvancedTextEditor({value, onSave, inputId, config, inputRef}:AdvancedProps) {

    const [clientSide, setClientSide] = useState(false)

    const [defaultVal, setDefaultVal] = useState(value) 

    const [id, setId] = useState(inputId)

    useMemo(() => {
        if(!inputId) return
        if(inputId === id) return
        setId(inputId)
        setDefaultVal(value)
    }, [value])

    useEffect(() => {
        setClientSide(true)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Box>
                {clientSide && <MUIRichTextEditor label="Start typing..." defaultValue={defaultVal} controls={advancedControls}
                onSave={(data) => onSave(data, config)} ref={inputRef} /> }
            </Box>
        </ThemeProvider>
    )
}