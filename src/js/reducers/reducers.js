import {ACTIONS_TYPES} from "../constants";

const initialState = {
    pages: [
        {
            title: 'Cats of our farm',
            path: '/'
        },
        {
            title: 'Cat registration',
            path: '/add-worker'
        },
        {
            title: 'Choose a cat into your house :)',
            path: '/fire-worker'
        }, {
            title: 'Gallery of our cats',
            path: '/gallery'
        }
    ],
    loading: false
};


let reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.GET_CATS:
            return {
                ...state,
                cats: action.payload,
            };
        case ACTIONS_TYPES.ADD_CAT:
            return {
                ...state,
                cats: action.payload.cats,
                loading: action.payload.loading
            };
        case ACTIONS_TYPES.EDIT_WORKTIME:
            return {
                ...state,
                cats: action.payload.cats,
                loading: action.payload.loading
            };
        case ACTIONS_TYPES.ISSUE_CAT:
            return {
                ...state,
                cats: action.payload.cats,
                loading: action.payload.loading
            };
        case ACTIONS_TYPES.SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        default:
            return state;
    }
}
export default reducer;
