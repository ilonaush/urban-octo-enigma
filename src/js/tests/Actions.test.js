import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from "../reducers/actions"
import {ACTIONS_TYPES, LOADING_TYPES, REQUEST_PATHS} from "../constants";
import MockAdapter from 'axios-mock-adapter';
import RequestService from "../services/RequestService";

const mockAxios = new MockAdapter(RequestService.service);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {

    it('creates GET_CATS after successfuly fetching cats', async () => {
        const expectedActions = [
            { type: ACTIONS_TYPES.GET_CATS, payload: {cats: [{ id: 1, name: 'John Smith' }]} },
        ];

        mockAxios.onGet('/').reply(200, {
            cats: [
                {id: 1, name: 'John Smith'}
            ]
        });

        const store = mockStore({ cats: []});

        await store.dispatch(actions.getCats()) ;

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates SET_LOADING after adding new cat', async () => {

        const cat = { id: 1, name: 'John Smith' };

        const expectedActions = [
            { type: ACTIONS_TYPES.SET_LOADING, payload: {loading: true, loadingType: null} },
            { type: ACTIONS_TYPES.ADD_CAT, payload: {cats: [{ id: 1, name: 'John Smith' }], loading: false, }},
        ];

        mockAxios.onPost(REQUEST_PATHS.ADD_CAT).reply(200, { status: true, cats: [{ id: 1, name: 'John Smith' }] });

        const store = mockStore({ cats: []});

        await store.dispatch(actions.addCat(cat));

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates GET_CATS after fail while fetching cats', async () => {
        const expectedActions = [
            { type: ACTIONS_TYPES.GET_CATS, payload: [] },
        ];

        mockAxios.onGet('/').networkError();

        const store = mockStore({ cats: []});

        await store.dispatch(actions.getCats());

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates HUG_CAT after dispatching action HUG_CAT', async () => {
        const expectedActions = [
            { type: ACTIONS_TYPES.SET_LOADING, payload: {loading: true, loadingType: LOADING_TYPES.HUG_CAT}},
            { type: ACTIONS_TYPES.HUG_CAT, payload: {cats: [{ id: 1, name: 'John Smith', huggingTime: 'now' }], loading: false}},
        ];

        mockAxios.onPatch(REQUEST_PATHS.HUG_CAT).reply(200, { status: true, cats: [{ id: 1, name: 'John Smith', huggingTime: 'now' }] });

        const store = mockStore({ cats: []});

        await store.dispatch(actions.hugCat());

        expect(store.getActions()).toEqual(expectedActions);

    });

});
