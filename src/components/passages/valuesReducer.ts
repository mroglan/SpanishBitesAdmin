
const initialValues = {
    name: '',
    desc: '',
    book: '',
    englishText: '',
    spanishText: '',
    commentary: '',
    vocab: [],
    annotations: ''
}

export default function valuesReducer(state, {type, payload}) {
    const copy = {...state}
    switch(type) {
        case 'MODIFY_VALUE':
            return {...state, [payload.property]: payload.value}
        case 'CLEAR_VALUES':
            return initialValues
        case 'CHANGE_INITIAL_VALUES':
            return payload
        case 'ADD_VOCAB_WORD':
            return {...state, vocab: [...state.vocab, payload.value]}
        case 'MODIFY_VOCAB_WORD':
            copy.vocab.splice(payload.index, 1, payload.value)
            return copy
        case 'REMOVE_VOCAB_WORD':
            copy.vocab.splice(payload.index, 1)
            return copy
        default:
            return state
    }
}