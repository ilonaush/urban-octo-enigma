const MENU_ITEMS = [
    {
        name: 'Home',
        to: '/',
        icon: 'list'
    },
    {
        name: 'Register a cat',
        to: '/add-cat',
        icon: 'add'
    },
    {
        name: 'Issue a cat',
        to: '/find-home',
        icon: 'fire'
    },
    {
        name: 'Gallery',
        to: '/gallery',
        icon: 'gallery'
    }
];


const REQUEST_PATHS = {
    GET_CATS: '/',
    ADD_CAT: '/add-worker',
    ISSUE_CAT: '/fire-worker',
    EDIT_WORKTIME: '/edit-time'
};

const ACTIONS_TYPES = {
    GET_CATS: 'GET_WORKERS',
    ADD_CAT: 'EMPLOY_WORKER',
    ISSUE_CAT: 'FIRE_WORKER',
    EDIT_WORKTIME: 'EDIT_WORK_TIME',
    SET_LOADING: 'SET_LOADING'
};

export {MENU_ITEMS, REQUEST_PATHS, ACTIONS_TYPES};
