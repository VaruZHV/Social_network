import {authApi} from "../api/api";

const SET_USER_DATA:string = "SET_USER_DATA"

let InitalState = {
    login:null,
    id: null,
    isAuth: false
}

const AuthReducer = (state = InitalState, action:any) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {

                ...state,
                ...action.data
            }
        }
        default:
            return state
    }
}

export default AuthReducer

export const setUserData = ({id,login, isAuth}:{id:number| null,login:string| null, isAuth:boolean | null}) => ({
    type: SET_USER_DATA,
    data: {
        login,
        id,
        isAuth
    }
})

export const getIdThunk = ()=>(dispatch:Function)=>{
    return authApi.getId()
        .then((response:any) => {  
            if(response.status === 200){
                dispatch(setUserData(response.data))
            }
        })
}

export const LoginThunk = ({login,password }:{login:string | null,password:string | null})=>(dispatch:Function)=>{
   
    authApi.login({login, password})
        .then((response:any) => {
            debugger
            if(response.status===200) {
                dispatch(setUserData(response.data))
            }else{
                dispatch(setUserData({id:null, login:null,isAuth:false}))
            }
        })
} 

export const LogOutThunk =()=>(dispatch:Function)=>{
    authApi.loginOut()
        .then(() => {
            dispatch(setUserData({id:null, login:null,isAuth:false}))
        })
}
