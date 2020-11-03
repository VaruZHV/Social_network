import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import { useDispatch } from "react-redux";

function Header(props) {
    let dispatch = useDispatch()

    return (
        <div className={s.header}>
            <div>LiGht</div>
            {props.isAuth

                ?

                <div className={s.headerMe}>
                    <p className={s.loginName}>{props.login}</p>
                    <button className={s.login} onClick={()=>dispatch(props.LogOutThunk)} >
                             logout
                    </button>
                </div>

                :

                <NavLink to={'/login'}
                         className={s.login}>login
                </NavLink>

            }
        </div>
    )
}

export default Header;