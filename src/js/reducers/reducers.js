import {ACTIONS_TYPES} from "../constants";

const initialState = {
    pages: [
        {
            title: 'Table',
            path: '/'
        },
        {
            title: 'Add worker',
            path: '/add-worker'
        },
        {
            title: 'Fire worker',
            path: '/fire-worker'
        }, {
            title: 'Gallery',
            path: '/gallery'
        }
    ],
    loading: false
};


let reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.GET_WORKERS:
            return {
                ...state,
                workers: action.payload,
            };
        case ACTIONS_TYPES.EMPLOY_WORKER:
            return {
                ...state,
                workers: action.payload.workers,
                loading: action.payload.loading
            };
        case ACTIONS_TYPES.EDIT_WORKTIME:
            return {
                ...state,
                workers: action.payload.workers,
                loading: action.payload.loading
            };
        case ACTIONS_TYPES.FIRE_WORKER:
            return {
                ...state,
                workers: action.payload.workers,
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
