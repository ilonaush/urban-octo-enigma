const MENU_ITEMS = [
  {
    name: 'Home',
    to: '/',
    icon: 'list'
  },
  {
    name: 'Cats found home',
    to: '/history',
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

const PAGE_TITLES = [
  {
    title: 'Cats of our farm',
    path: '/'
  },
  {
    title: 'Cat registration',
    path: '/add-cat'
  }, {
    title: 'Cats that already found home',
    path: '/history'
  },
  {
    title: 'Choose a cat into your house :)',
    path: '/find-home'
  }, {
    title: 'Gallery of our cats',
    path: '/gallery'
  }
];


const REQUEST_PATHS = {
  GET_CATS: '/',
  GET_HISTORY: '/history',
  GET_PAGE: '/page',
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

export {
  MENU_ITEMS,
  REQUEST_PATHS,
  ACTIONS_TYPES,
  LOADING_TYPES,
  PAGE_TITLES
};
