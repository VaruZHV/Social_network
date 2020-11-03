import React from "react";
import s from "./Dialogs.module.css"
import {Field, reduxForm} from "redux-form";
import Textarea from "../../validations/FormsControl";
import Validate from "../../validations/validation";


function Dialogs(props) {



    let dialogitem = props.DialogsPage.dialogs.map(nameobj => <div key={nameobj.id}>{nameobj.name}</div>)
    let dialogitemmessages = props.DialogsPage.messages.map(messageobj => <div key={messageobj.id}>{messageobj.message}</div>)

    // let NewMessageChange = (textarea) => {
    //     console.log(textarea.target.value);
    //     props.OnNewMessageChange(textarea.target.value)
    // }

    let SendMessage = (data) => {
        console.log(data);
        props.OnMessageSend(data.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div>{dialogitem}</div>
            <div>{dialogitemmessages}</div>
            <AddMessageRF onSubmit={SendMessage}/>
        </div>

    )
}
const AddMessage = (props)=>{
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} validate={Validate} name={"newMessageBody"} placeholder={"write Message here"} />
            <button>Send</button>
        </form>
    )
}

const AddMessageRF = reduxForm({
    form:"dialogs"
})(AddMessage)

export default Dialogs
