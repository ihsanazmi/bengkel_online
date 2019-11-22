import {combineReducers} from 'redux'

let initState = {
    id: 0,
    nama: '',
    email: '',
    no_hp: '',
    role: ''
}

let authReducer = (state = initState, action)=>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, id:action.payload.id, nama:action.payload.nama, no_hp: action.payload.no_hp, email: action.payload.email, role: action.payload.role }
        
        case "LOGOUT_SUCCESS":
            return {...state, ...initState}

        default:
            return state
    }
}

let reducers = combineReducers(
    {
        auth: authReducer
    }
)

export default reducers