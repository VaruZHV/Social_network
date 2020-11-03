import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

function AuthRedirect(Component) {
    
    function RedirectComponent(props) {
    
        console.log(props.isAuth)
        return !props.isAuth ?  <Redirect to={'/login'}/>: <Component {...props} />
    }

    return  connect(mapStateToProps)(RedirectComponent)

}


export default AuthRedirect;