const SEND_MESSAGE = "SEND_MESSAGE"

let InitalState = {
    dialogs: [
        {id: 1, name: "hrantoo"},
        {id: 2, name: "vrejik"}
    ],
    messages: [
        {id: 1, message: "HI"},
        {id: 2, message: "lasharik"}
    ]
}


const DialogsReducer = (state = InitalState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages,{id: 1, message:action.message}],
            }
        }
        default:
            return state
    }
}

export default DialogsReducer

export const SendMessageActionCreator = (message) => ({type: SEND_MESSAGE, message })
