import React from 'react'
import {Field, reduxForm} from "redux-form";
import Textarea from "../../validations/FormsControl";
import Validate from "../../validations/validation";
import s from "./login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {LoginThunk} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


function LoginForm(props) {
    console.log(props);
    const dispatch = useDispatch()
    let isAuth = useSelector(state => state.auth.isAuth)
    if(isAuth){
       
        return <Redirect to={'/profile'}/>
    }
    
    let onSubmit = (data) => {
        console.log(data)
        const LoginDispatch = (data) => dispatch(LoginThunk(data))
        return LoginDispatch(data)
    }
     
    return (
        <div className={s.login}>
            <h1>Login</h1>
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <div>
                    <Field placeholder={"login"} name={"login"} component={Textarea} validate={Validate}/>
                </div>
                <div>
                    <Field placeholder={"password"} name={"password"} component={Textarea} validate={Validate}/>
                </div>
                <div>
                    <Field component={"input"} name={"rememberMe"} type={"checkbox"}/>
                    remember me
                </div>
                {props.error && <div>
                    {props.error}
                    </div>}
                <button>login</button>
            </form>
        </div>
    )
}

export default reduxForm({form: 'login'})(LoginForm)
