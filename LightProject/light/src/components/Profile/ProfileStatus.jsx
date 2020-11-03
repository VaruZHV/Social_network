import React, {useState,useEffect} from "react";

const ProfileStatus = React.memo((props) => {

        console.log(props.status, "staus");
        const [editMode, setEditMode] = useState(true);
        const [status, setStatus] = useState(props.status);

        useEffect(() => {
            setStatus(props.status);
        }, [props.status]);

        let activateEditMode = () => {
            setEditMode(false);
        };

        let deactivateEditMode = () => {
            setEditMode(true);
            props.setStatusThunk(status);
        };

        let changeStatus = (event) => {
            setStatus(event.target.value);
        };

        return (
            <>
                <div>
                    {editMode ? <div onDoubleClick={activateEditMode}>{status}</div>
                        : <input onChange={changeStatus} autoFocus={true}
                            onBlur={deactivateEditMode}
                            value={status} type="text" />}
                </div>

            </>
        );
    }
)
export default ProfileStatus