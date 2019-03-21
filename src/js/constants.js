const MENU_ITEMS = [
  {
    name: 'Головна',
    to: '/',
    icon: 'list'
  },
  {
    name: 'Котики нашли дім',
    to: '/history',
    icon: 'list'
  },
  {
    name: 'Регістрація котика',
    to: '/add-cat',
    icon: 'add'
  },
  {
    name: 'Видача котика',
    to: '/find-home',
    icon: 'fire'
  },
  {
    name: 'Галерея',
    to: '/gallery',
    icon: 'gallery'
  }
];

const PAGE_TITLES = [
  {
    title: 'Наші котики',
    path: '/'
  },
  {
    title: 'Прийом котика',
    path: '/add-cat'
  }, {
    title: 'Котики, які вже знайшли дім',
    path: '/history'
  },
  {
    title: 'Оберіть котика собі в родину :)',
    path: '/find-home'
  }, {
    title: 'Галерея наших котиків',
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
