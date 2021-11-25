export const initialUserState = {
    id: -1,
    username: "guest",
    profile_img: "",
    images: []
}

export function userReducer(state, action) {
    switch (action.type) {
        case "setUser":
            return action.payload

        case "logout":
            localStorage.removeItem("token")

            return {
                id: -1,
                username: "guest",
                profile_img: "",
                images: []
            }
    
        default:
            return state;
    }
}