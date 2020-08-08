
const initialValues = {
    title: '',
    author: '',
    genre: '',
    timePeriod: '',
    desc: '',
    detailedInfo: ''
}

export default function valuesReducer(state, {type, payload}) {

    switch(type) {
        case 'MODIFY_STRING_VALUE':
            return {...state, [payload.property]: payload.value}
        case 'CLEAR_VALUES':
            return initialValues
        case 'CHANGE_INITIAL_VALUES':
            return payload
        default:
            return state
    }
}