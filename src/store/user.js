import * as TYPES from "./constants";

export default function(state, action) {
    switch (action.type) {
        case TYPES.ADD_USER_INFO:
            return action.user;
        default:
            return state;
    }
}
