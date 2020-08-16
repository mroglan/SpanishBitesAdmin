

const initialValues = {
    name: '',
    author: '',
    image: '',
    work: '',
    text: '',
    desc: '',
    dates: []
}

export default function valuesReducer(state, {type, payload}) {

    switch(type) {
        case 'MODIFY_VALUE':
            return {...state, [payload.property]: payload.value}
        case 'CLEAR_VALUES':
            return initialValues
        case 'CHANGE_INITIAL_VALUES':
            return payload
        default: 
            return state
    }
}