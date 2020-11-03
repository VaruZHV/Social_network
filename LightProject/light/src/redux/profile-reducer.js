import {ProfileApi, usersApi} from "../api/api";
import {toggleFollowingInProgress} from "./users-reducer";


const FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    ADD_POST = "ADD_POST",
    IS_FETCHING = "IS_FETCHING",
    SET_USER = "SET_USER",
    SET_STATUS = "SET_STATUS",
    SAVE_PHOTO = "SAVE_PHOTO",
    CHANGE_USERDATA = "CHANGE_USERDATA" 

let InitalState = {
    user: [],
    posts: [
        {id: 1, comment: "hi lox", likeCount: 0},
        {id: 2, comment: "hi lox2", likeCount: 0},
        {id: 3, comment: "hi lox3", likeCount: 0},
        {id: 4, comment: "hi lox4", likeCount: 0}
    ],
    isFetching: false,
    status: ''

}

const ProfileReducer = (state = InitalState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                user:state.user.map(user =>{
                    if(user.id === action.userId){
                        return {...user, Followed: true}
                    }
                    return user
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                user:state.user.map(user =>{
                    if(user.id === action.userId){
                        return {...user, Followed: false}
                    }
                    return user
                })
            }
        }
        case ADD_POST: {
            let NewComment = {
                id: 8,
                comment: action.comment,
                likeCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, NewComment],
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.userdata
            }
        }
        case SET_STATUS:{
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO:{
            return{
                ...state,
                user:[{...state.user[0],photo:action.photo}]
            }
        }
        case CHANGE_USERDATA:{
            debugger
            return{
                ...state,
                user:[{...action.userData}]
            }
        }
        default:
            return state
    }
}

export default ProfileReducer

export const onFollow = (userId) => ({type: FOLLOW, userId})
export const onUnFollow = (userId) => ({type: UNFOLLOW, userId})
export const OnPostSend = (comment) => ({type: ADD_POST, comment})
export const toggleIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching})
export const setUser = (userdata) => ({type: SET_USER, userdata})
export const setStatus = (status) => ({type: SET_STATUS,status})
export const savePhoto = (photo)=>({type:SAVE_PHOTO,photo})
export const putUserData = (userData)=>({type:CHANGE_USERDATA,userData})

export const followThunk = (userId) => async (dispatch)=>{
    dispatch(toggleFollowingInProgress(true, userId))
    await usersApi.follow(userId)
    dispatch(toggleFollowingInProgress(false, userId))
    dispatch(onUnFollow(userId))
}

export const unFollowThunk = (userId) => async (dispatch)=>{
    dispatch(toggleFollowingInProgress(true, userId))
    await usersApi.unFollow(userId)
    dispatch(toggleFollowingInProgress(false, userId))
    dispatch(onFollow(userId))
}

export const getUserThunk = (userId)=> async (dispatch)=>{
    dispatch(toggleIsFetching(true))
    let response = await ProfileApi.getUser(userId)
    dispatch(setUser(response.data))
    dispatch(toggleIsFetching(false))
        
}

export const savePhotoThunk = (photo)=> async (dispatch)=>{
    let response = await ProfileApi.putPhoto(photo)
    dispatch(savePhoto("/avatars/"+response.data))
    debugger
}
export const changeUserData = (userData)=> async (dispatch)=>{
    debugger
    let response = await ProfileApi.changeUserData(userData)
    dispatch(putUserData(response.data))
}

export const setStatusThunk =  (status)=> async (dispatch) =>{
    let response = await ProfileApi.putStatus(status)
    dispatch(setStatus(response.data))
}

