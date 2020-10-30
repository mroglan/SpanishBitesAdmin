import {BlogPost} from '../../../database/dbInterfaces'
import {useState, useCallback} from 'react'
import Wizard from '../../items/FormWizard'
import {Box} from '@material-ui/core'
import {useReducer} from 'react'
import BasicInfoStep from './BasicInfoStep'
import ContentStep from './ContentStep'
import ReviewStep from './ReviewStep'

export interface Values extends BlogPost {
    _id?: string;
}

interface Props {
    values: Values;
    mode: string;
}

const sections = [
    'Basic Info', 'Content', 'Review'
]

const valuesReducer = (state:Values, {type, payload}) => {
    switch(type) {
        case 'CHANGE_TITLE':
            return {...state, title: payload}
        case 'CHANGE_SUBTITLE':
            return {...state, subtitle: payload}
        case 'CHANGE_KEYWORDS':
            return {...state, keyWords: payload}
        case 'CHANGE_DATE':
            return {...state, releaseDate: payload}
        case 'CHANGE_CONTENT':
            return {...state, content: payload}
        default:
            return state
    }
}

export default function PostForm({values:initialVals, mode}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialVals)

    const [section, setSection] = useState(0)

    const changeStep = (diff:number) => setSection(section + diff)

    return (
        <Box>
            <Box>
                <Wizard sections={sections} sectionNum={section} changeStep={changeStep} />
            </Box>
            <Box>
                {section === 0 ? <BasicInfoStep values={values} dispatch={valuesDispatch} /> : 
                section === 1 ? <ContentStep values={values} dispatch={valuesDispatch} /> : 
                <ReviewStep values={values} mode={mode} /> }
            </Box>
        </Box>
    )
}