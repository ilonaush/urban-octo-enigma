import { createStore, applyMiddleware } from 'redux';
import reducer   from './reducers';
import  { saveStore, loadStore } from '../services/LocalStorageService';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger();

// const predefinedStore = loadStore();

const store = createStore(
    reducer,
    // predefinedStore,
    applyMiddleware(thunk, loggerMiddleware)
);

// store.subscribe(() => {
//     saveStore(store.getState())
// });

export {
    store,
    // predefinedStore
};
