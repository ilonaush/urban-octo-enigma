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
    ADD_CAT: '/add-cat',
    ISSUE_CAT: '/issue-cat',
    FEED_CAT: '/feed-cat',
    HUG_CAT: '/hug-cat',
    WASH_CAT: '/wash-cat'
};

const ACTIONS_TYPES = {
    GET_CATS: 'GET_CATS',
    ADD_CAT: 'ADD_CAT',
    ISSUE_CAT: 'ISSUE_CAT',
    FEED_CAT: 'FEED_CAT',
    HUG_CAT: 'HUG_CAT',
    WASH_CAT: 'WASH_CAT',
    SET_LOADING: 'SET_LOADING'
};

const LOADING_TYPES = {
    FEED_CAT: 'FEED_CAT',
    HUG_CAT: 'HUG_CAT',
    WASH_CAT: 'WASH_CAT',
};

export {MENU_ITEMS, REQUEST_PATHS, ACTIONS_TYPES, LOADING_TYPES};
