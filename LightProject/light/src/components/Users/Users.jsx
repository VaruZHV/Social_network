import React, { useEffect } from "react";
import s from "./Users.module.css"
import Preloader from "../preloader/Preloader";
import { NavLink } from "react-router-dom";
import { useState } from "react";
      
function Users({getUsersThunk,...props}) {
    useEffect(() => {
        getUsersThunk(props.UsersPage.currentPage, props.UsersPage.usersInPage)
    }, [getUsersThunk,props.UsersPage.currentPage, props.UsersPage.usersInPage])


    

    function onPageChanged(el) {

        props.setCurrentPage(el)
        getUsersThunk(el, props.UsersPage.usersInPage)
    }


    let count = Math.ceil(props.UsersPage.totalCount / props.UsersPage.usersInPage)
    let pages = []
    for (let i = 1; i <= count; i++) {
        pages.push(i)
    }
    const [PortionNumber, setPortionNumber] = useState(1)
    let portionCount = Math.ceil(count / 2)
    let leftPortion = (PortionNumber - 1) * 2 + 1
    let rightPortion = PortionNumber * 2
    return <>
        {props.UsersPage.isFetching ? <Preloader /> : null}

        <div className={s.users}>
            <div className={s.pagination_parent}>
                <div className={s.pagination}>
                    {PortionNumber > 1 &&
                        <span onClick={() => setPortionNumber(PortionNumber - 1)}>Prev</span>}
                    {
                        pages
                            .filter(p => p >= leftPortion && p <= rightPortion)
                            .map(p => {
                                return <span
                                    key={p}
                                    className={props.UsersPage.currentPage === p ? s.selected_page : s.page}
                                    onClick={() => (onPageChanged(p))}>{p}</span>
                            })
                    }
                    {portionCount > PortionNumber &&
                        <span onClick={() => setPortionNumber(PortionNumber + 1)}>Next</span>}
                </div>

            </div>
            {props.UsersPage.users.map((user) => (


                <div key={user.id}>
                    <div>
                        <NavLink to={`profile/${user.id}`}>
                            {console.log(user.id)}
                            <img src={user.photo} alt="" />
                        </NavLink>
                    </div>
                    <div>
                        {
                            user.Followed
                                ? <button
                                    disabled={props.UsersPage.followingInProgress.some((id) => id === user.id)}
                                    onClick={() => {
                                        props.followThunk(user.id)
                                    }
                                    }>Unfollow</button>
                                : <button
                                    disabled={props.UsersPage.followingInProgress.some((id) => id === user.id)}
                                    onClick={() => {
                                        props.unFollowThunk(user.id)
                                    }
                                    }>Follow</button>
                        }
                    </div>
                    <div>
                        {
                            user.Fullname
                        }
                    </div>
                    <div>
                        {
                            user.status
                        }
                    </div>
                    <div>
                        <span>
                            {user.location.country}
                        </span>
                        <span>
                            {user.location.city}
                        </span>
                    </div>
                </div>

            ))}
        </div>
    </>


}

export default Users