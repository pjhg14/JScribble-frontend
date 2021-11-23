export const initialUserState = {
    username: "guest",
    profile_img: ""
}

export function userReducer(state, action) {
    switch (action.type) {
        case "login":
            return action.payload

        case "logout":
            return {
                username: "guest",
                profile_img: ""
            }

        case "changeUsername":
            return {
                ...state,
                username: action.payload
            }

        case "uploadUserProfile":
            return {
                ...state,
                profile_img: action.payload
            }
    
        default:
            return state;
    }
}