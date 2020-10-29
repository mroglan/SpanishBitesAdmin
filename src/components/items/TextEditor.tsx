import MUIRichTextEditor from 'mui-rte'
import {createMuiTheme, ThemeProvider, Box, Button, Typography} from '@material-ui/core'
import {useState, useEffect, useMemo, useRef} from 'react'
import {EditorState, convertToRaw} from 'draft-js'
import AdbIcon from '@material-ui/icons/Adb';

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
                fontSize: '16px', 
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

interface BlogProps {
    value: string;
    onSave: (val:string) => void;
    inputRef: any;
}

const blogControls = [
    "h4", "h5", "h6", "bold", "italic", "underline", "strikethrough", "highlight",
    "link", "media", "numberList", "bulletList", "quote", "undo", "redo",
]

const blogCustomControls:any = [
    {name: 'h4', icon: <Typography variant="h6">h4</Typography> , type: 'block', blockWrapper: <Typography variant="h4"  style={{margin: '25px 0 5px 0'}} />},
    {name: 'h5', icon: <Typography variant="h6">h5</Typography>, type: 'block', blockWrapper: <Typography variant="h5" style={{margin: '20px 0 5px 0'}} /> },
    {name: 'h6', icon: <Typography variant="h6">h6</Typography>, type: 'block', blockWrapper: <Typography variant="h6" style={{margin: '10px 0 0 0'}} /> }
]

export function BlogTextEditor({value, onSave, inputRef}:BlogProps) { // add parameter for custom controls

    const [defaultVal, setDefaultVal] = useState(value)

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <MUIRichTextEditor label="Start typing..." defaultValue={defaultVal} controls={blogControls} 
                customControls={blogCustomControls} onSave={(data) => onSave(data)} ref={inputRef}
                 /> 
            </Box>
        </ThemeProvider>
    )
}

interface TextDisplayProps {
    text: string;
}

export function TextDisplay({text}:TextDisplayProps) {

    const [ready, setReady] = useState(false)

    useEffect(() => setReady(true), [])

    return (
        <Box>
            {ready && <MUIRichTextEditor customControls={blogCustomControls} controls={[]} defaultValue={text} readOnly />}
        </Box>
    )
}