
const initialValues = {
    name: '',
    dateRange: ['', ''],
    spainEvents: [],
    worldEvents: []
}

export default function valuesReducer(state, {type, payload}) {
    const copy = {...state}
    switch(type) {
        case 'MODIFY_STRING_VALUE':
            return {...state, [payload.property]: payload.value}
        case 'MODIFY_DATE_RANGE':
            return {...state, dateRange: payload.dateRange}
        case 'ADD_EVENT':
            if(payload.scope === 'spain') {
                return {...state, spainEvents: [...state.spainEvents, payload.values]}
            }
            return {...state, worldEvents: [...state.worldEvents, payload.values]}
        case 'MODIFY_EVENT':
            if(payload.scope === 'spain') {
                copy.spainEvents.splice(payload.index, 1, payload.values)
            } else {
                copy.worldEvents.splice(payload.index, 1, payload.values)
            }
            return copy
        case 'DELETE_EVENT':
            if(payload.scope === 'spain') {
                copy.spainEvents.splice(payload.index, 1)
            } else {
                copy.worldEvents.splice(payload.index, 1)
            }
            return copy
        case 'CLEAR_VALUES':
            return initialValues
        case 'CHANGE_INITIAL_VALUES':
            return payload
        default: 
            return state
    }
}