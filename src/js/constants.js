
const MENU_ITEMS = [
    {
        name: 'Home',
        to: '/',
        icon: 'list'
    },
    {
        name: 'Add a worker',
        to: '/add-worker',
        icon: 'add'
    },
    {
        name: 'Fire worker',
        to: '/fire-worker',
        icon: 'fire'
    },
    {
        name: 'Gallery',
        to: '/gallery',
        icon: 'gallery'
    }
];


const REQUEST_PATHS = {
    GET_WORKERS: '/',
    EMPLOY_WORKER: '/add-worker',
    FIRE_WORKER: '/fire-worker',
    EDIT_WORKTIME: '/edit-time'
};

const ACTIONS_TYPES = {
    GET_WORKERS: 'GET_WORKERS',
    EMPLOY_WORKER: 'EMPLOY_WORKER',
    FIRE_WORKER: 'FIRE_WORKER',
    EDIT_WORKTIME: 'EDIT_WORK_TIME',
    SET_LOADING: 'SET_LOADING'
};

export {MENU_ITEMS, REQUEST_PATHS, ACTIONS_TYPES};
