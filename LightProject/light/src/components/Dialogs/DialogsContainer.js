import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {SendMessageActionCreator} from "../../redux/dialogs-reducer";
import AuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

//
// function DialogsContainer(){
//     return(
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState()
//
//
//                 let OnMessageSend = ()=>{
//                     store.dispatch(SendMessageActionCreator())
//                 }
//
//                 let OnNewMessageChange =(text)=>{
//                     store.dispatch(UptadeNewMessageTextActionCreator(text))
//                 }
//                 return (
//                     <Dialogs OnNewMessageChange ={OnNewMessageChange} OnMessageSend={OnMessageSend} state={state}/>
//                 )
//             }
//             }
//         </StoreContext.Consumer>
//     )
// }
//
// export default DialogsContainer

let MapStateToProps = (state) => {
    return {
        DialogsPage: state.DialogsPage,
    }
}

let MapDispatchToProps = (dispatch) => {
    return {
        OnMessageSend: (message) => {
            dispatch(SendMessageActionCreator(message))
        }

    }
}
export default compose(
    connect(MapStateToProps,MapDispatchToProps),
    AuthRedirect
)(Dialogs)

