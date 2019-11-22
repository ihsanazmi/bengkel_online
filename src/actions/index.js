
export const sendData = (id, nama, email, no_hp, role)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload:{
            nama, id, email, no_hp, role
        }
    }
    
}

export const logOut = (_id, _nama, _email, _no_hp, _role )=>{
    localStorage.removeItem('userData')
    return {
        type: "LOGOUT_SUCCESS",
       
    }
}

export const keepLogin = (userData)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload: {
            id: userData.id,
            nama: userData.nama,
            email: userData.email,
            no_hp: userData.no_hp,
            role: userData.role
        }
    }
}