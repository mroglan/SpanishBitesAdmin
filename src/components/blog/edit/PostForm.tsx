import {BlogPost} from '../../../database/dbInterfaces'
import {useState, useCallback} from 'react'
import Wizard from '../../items/FormWizard'
import {Box} from '@material-ui/core'

interface Values extends BlogPost {
    _id?: string;
}

interface Props {
    values: Values;
}

const sections = [
    'Basic Info', 'Content', 'Review'
]

export default function PostForm({values}:Props) {

    const [section, setSection] = useState(0)

    const changeStep = (diff:number) => setSection(section + diff)

    return (
        <div>
            <Box>
                <Wizard sections={sections} sectionNum={section} changeStep={changeStep} />
            </Box>
        </div>
    )
}