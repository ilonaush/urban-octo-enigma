import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer   from './reducers';
import  { saveStore, loadStore } from '../services/LocalStorageService';

const predefinedStore = loadStore() || {};

const store = createStore(
    reducer,
    predefinedStore

);

store.subscribe(() => {
    saveStore(store)
});

export {
    store, predefinedStore
};
