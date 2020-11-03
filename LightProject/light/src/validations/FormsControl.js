import React from "react";

export default function Textarea({ input, label, type, meta: { touched, error }, ...props}){

    return(
        <div>
            <textarea {...input} {...props}></textarea>
            {touched && error && <span>error</span>}
        </div>
    )
}
