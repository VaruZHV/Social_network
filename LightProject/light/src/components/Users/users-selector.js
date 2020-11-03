import {createSelector} from "reselect"

const getUserSelector = (state)=>{
    return state.UsersPage

}


export const getUserSuperSelector = createSelector( [getUserSelector], (users)=>{
    return users
})