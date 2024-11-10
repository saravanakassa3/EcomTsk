import * as actionType from '../redux1/actionType';

const initial_state = {
    get_settings_lists: [],
    get_catgory_lists: [] // Initialize as an empty array to avoid undefined issues
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case actionType.GET_GLOBAL_SETTINGS:
            return {
                ...state, 
                get_settings_lists: action.payload
            }
        case actionType.GET_GLOBAL_CATEGORIES:
            return {
                ...state, 
                get_catgory_lists: action.payload // Ensure the payload is being passed correctly
            }
        default:
            return state;
    }
}

export default reducer;
