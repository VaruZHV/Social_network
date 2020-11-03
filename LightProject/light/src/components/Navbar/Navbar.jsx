import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"
function Navbar() {
    return (
        <div className={s.navbar}>
            <NavLink to='/profile' className={s.navitem}>Profile</NavLink>
            <NavLink to='/dialogs' className={s.navitem}>Dialogs</NavLink>
            <NavLink to='/users' className={s.navitem}>Users</NavLink>
            <NavLink to='/settings' className={s.navitem}>Settings</NavLink>
        </div>
    )
}

export default Navbar;