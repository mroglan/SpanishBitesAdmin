import {ClientAuthor} from '../../database/dbInterfaces'

interface State extends Omit<ClientAuthor, '_id' | 'timePeriod'> {
    _id?: string;
    timePeriod: string;
}

interface Action {
    type: string;
    payload: any;
}

const initialValues = {
    firstName: '',
    lastName: '',
    birthDate: '2020-01-01',
    deathDate: '2020-01-01',
    timePeriod: '',
    detailedInfo: '',
    keyPoints: [''],
    relevantWorks: [],
    influences: []
}

export default function valuesReducer(state, {type, payload}:Action) {
    const copy = {...state}
    switch(type) {
        case 'MODIFY_STRING_VALUE':
            return {...state, [payload.property]: payload.value}
        case 'ADD_INFLUENCE':
            return {...state, influences: [...state.influences, payload.values]}
        case 'MODIFY_INFLUENCE':
            copy.influences.splice(payload.index, 1, payload.values)
            return copy
        case 'REMOVE_INFLUENCE':
            copy.influences.splice(payload.index, 1)
            return copy
        case 'ADD_RELEVANT_WORK':
            return {...state, relevantWorks: [...state.relevantWorks, payload.values]}
        case 'MODIFY_RELEVANT_WORK':
            copy.relevantWorks.splice(payload.index, 1, payload.values)
            return copy
        case 'REMOVE_RELEVANT_WORK':
            copy.relevantWorks.splice(payload.index, 1)
            return copy
        case 'ADD_KEY_POINT':
            copy.keyPoints.splice(payload.index + 1, 0, '')
            return copy
        case 'MODIFY_KEY_POINT':
            copy.keyPoints.splice(payload.index, 1, payload.value)
            return copy
        case 'REMOVE_KEY_POINT':
            if(copy.keyPoints.length === 1) return
            copy.keyPoints.splice(payload.index, 1)
            return copy
        case 'CLEAR_VALUES':
            return initialValues
        default:
            return state
    }
}