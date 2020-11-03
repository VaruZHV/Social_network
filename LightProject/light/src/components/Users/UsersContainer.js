import {connect} from "react-redux";
import Users from "./Users";
import {
    onFollow,
    onUnFollow,
    onSetUsers,
    setCurrentPage,
    toggleIsFetching,
    toggleFollowingInProgress,
    getUsersThunk, followThunk, unFollowThunk
} from "../../redux/users-reducer";
import {compose} from "redux";
import AuthRedirect from "../../hoc/withAuthRedirect";
import { getUserSuperSelector } from "./users-selector";

let mapStateToProps = (state) => {
    return {
        UsersPage:  getUserSuperSelector(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        onFollow,
        onUnFollow,
        onSetUsers,
        setCurrentPage,
        toggleIsFetching,
        toggleFollowingInProgress,
        getUsersThunk,
        followThunk,
        unFollowThunk
    }),
    AuthRedirect
)(Users)