import React, { useState } from "react";
import s from "./Profile.module.css"
import Preloader from "../preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import { Field, reduxForm } from "redux-form";
import Validate from "../../validations/validation";
import Textarea from "../../validations/FormsControl";
import { useDispatch } from "react-redux";
import { changeUserData } from "../../redux/profile-reducer";

function Profile(props) {
    const [editMode, setEditMode] = useState(false)
    let PostElemnts = props.ProfilePage.posts.map((post) => <span key={post.id}>{post.comment}</span>)

    let addPost = (comment) => {
        props.OnPostSend(comment.postComment)
    }
    let avatarSelected = (e) => {
        props.savePhotoThunk(e.target.files[0])
    }
    return (
        <>

            {props.ProfilePage.isFetching ? <Preloader /> : null}
            <div className={s.profile}>
                {props.ProfilePage.user.map((user) => {

                    return (
                        <div key={user.id}>
                            <div>
                                <img src={user.photo} alt="" className={s.avatar} />
                                {props.isOwner && <><input type="file" onChange={avatarSelected} />
                                    <button onClick={() => setEditMode(!editMode)}>Edit mode</button> <ProfileStatus setStatusThunk={props.setStatusThunk} status={user.status} /></>}

                            </div>
                            {props.isOwner && editMode ?
                                <ProfileDataChangeForm {...props} changeMode={() => setEditMode(false)} />
                                :

                                <ProfileData {...props} />
                            }
                        </div>

                    )
                })}
                <div>post 1</div>
                <form onSubmit={props.handleSubmit(addPost)}>
                    <Field component={Textarea}
                        name={"postComment"}
                        placeholder={"comment"}
                        validate={Validate}></Field>
                    <button>Send</button>
                </form>
                <div>
                    {PostElemnts}
                </div>
            </div>

        </>

    )
}
function ProfileDataChangeForm({ changeMode, ...props }) {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ ...props.ProfilePage.user[0] })
    const user = props.ProfilePage.user[0]

    const handeSubmit = (event) => {
        event.preventDefault()
        changeMode()
        dispatch(changeUserData(userData))
    }
    
    return <form onSubmit={handeSubmit}>
        <div>
            <button>Submit chages</button>
            {
                user.Followed
                    ? <button onClick={() => {
                        props.followThunk(user.id)
                    }
                    }>Unfollow</button>
                    : <button onClick={() => {
                        props.unFollowThunk(user.id)
                    }
                    }>Follow</button>
            }
        </div>
        <div>
            {
                user.Fullname
            }
            <input type="text" name={"fullname"} value={userData.Fullname}
                onChange={(e) => setUserData({ ...userData, Fullname: e.target.value })} />
        </div>
        <div>
            <span>
                {user.location.country}
                <input type="text" name={"country"} value={userData.location.country}
                    onChange={(e) => setUserData({ ...userData, location: { ...userData.location, country: e.target.value } })} />
            </span>
            <span>
                {user.location.city}
                <input type="text" name={"city"} value={userData.location.city}
                    onChange={(e) => setUserData({ ...userData, location: { ...userData.location, city: e.target.value } })} />
            </span>
        </div>
    </form>

}

function ProfileData({ changeMode, ...props }) {
    let user = props.ProfilePage.user[0]
    return <>
        <div>
            {

                user.Followed
                    ? <button onClick={() => {
                        props.followThunk(user.id)
                    }
                    }>Unfollow</button>
                    : <button onClick={() => {
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
    </>
}
export default reduxForm({
    form: "addComment"
})(Profile)


