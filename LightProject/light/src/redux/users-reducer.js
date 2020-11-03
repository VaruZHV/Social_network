import {usersApi} from "../api/api";

const FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET_USERS",
    CHANGE_USERS = "CHANGE_USERS",
    IS_FETCHING = "IS_FETCHING",
    FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS"

let InitalState = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    usersInPage: 2,
    isFetching: false,
    followingInProgress: []
}

const UserReducer = (state = InitalState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, Followed: true, lox: 'aaaaaa'}
                    }
                    return user
                })
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, Followed: false}
                    }
                    return user
                })
            }
        }
        case SET_USERS: {
            console.log(action);
            return {
                ...state,
                totalCount: action.data.totalCount,
                users: [...action.data.items]
            }
        }
        case CHANGE_USERS: {
            return {
                ...state,
                currentPage: action.id
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {
            return {

                ...state,
                followingInProgress: action.inProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
            }
        }
        default:
            return state
    }
}
//nayi e s qo ogtagorcac painery chigtem vonc en ashxatum bayc karam cuyc tam vonc anser aranc dra


export const onFollow = (userId) => ({type: FOLLOW, userId})
export const onUnFollow = (userId) => ({type: UNFOLLOW, userId})
export const onSetUsers = (data) => ({type: SET_USERS, data})
export const setCurrentPage = (id) => ({type: CHANGE_USERS, id})
export const toggleIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (inProgress,userId) => ({type: FOLLOWING_IN_PROGRESS, inProgress, userId})

export const getUsersThunk = (currentPage,usersInPage) => (dispatch)=>{
    dispatch(toggleIsFetching(true))

    usersApi.getUsers(currentPage, usersInPage)
        .then(response => {
            console.log(response.data, 'date')
            dispatch(onSetUsers(response))
            dispatch(toggleIsFetching(false))

        })

}
export const followThunk = (userId) => (dispatch)=>{
    dispatch(toggleFollowingInProgress(true, userId))
    usersApi.follow(userId)
        .then(() => {
            dispatch(toggleFollowingInProgress(false, userId))
            dispatch(onUnFollow(userId))
        })
}

export const unFollowThunk = (userId) => (dispatch)=>{
    dispatch(toggleFollowingInProgress(true, userId))
    usersApi.unFollow(userId)
        .then(() => {
            dispatch(toggleFollowingInProgress(false, userId))
            dispatch(onFollow(userId))
        })
}
export default UserReducer
