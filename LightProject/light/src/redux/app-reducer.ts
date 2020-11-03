import { getIdThunk } from "./auth-reducer"

const INITALIZED:string = "INITALIZED"
type InitalStateType = {
    initalized: boolean
}
let InitalState:InitalStateType = {
    initalized: false
}
type actionType= {
    type:string

}
const appReducer = (state = InitalState, action:actionType) => {
    switch (action.type) {
        case INITALIZED: {
        
            return {

                ...state,
                initalized: true
            }
        }
        default:
            return state
    }
}

export default appReducer


export const initalizedSuccsses = ()=>  ({
    type: INITALIZED
})

export const InitilieApp = ()=> (dispatch:Function) =>{

    let promise = dispatch(getIdThunk())

    Promise.all([promise]).then(()=>{ 
        dispatch(initalizedSuccsses())
    })
    
    
}
