import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from "../reducers/actions"
import {ACTIONS_TYPES, REQUEST_PATHS} from "../constants";
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
        console.log(mockAxios.history);

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates SET_LOADING after fail while fetching workers', async () => {

        const cat = { id: 1, name: 'John Smith' };

        const expectedActions = [
            { type: ACTIONS_TYPES.SET_LOADING, payload: true },
            { type: ACTIONS_TYPES.ADD_CAT, payload: {cats: [{ id: 1, name: 'John Smith' }], loading: false}},
        ];

        RequestService.post(REQUEST_PATHS.ADD_CAT, {
            _id: '123'
        })
            .then(function(response) {
                console.log(response.data.cats);
            })
            .catch(e => {
                console.log(e);
            })

        // mockAxios.onPost(REQUEST_PATHS.ADD_CAT).reply(200, { status: true, cats: 'stuff to reply with' });




        const store = mockStore({ cats: []});

        await store.dispatch(actions.addCat(cat));

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates GET_CATS after fail while fetching cats', async () => {
        const expectedActions = [
            { type: ACTIONS_TYPES.GET_CATS, payload: [] },
        ];

        mockAxios.onGet('/').networkError();

        const store = mockStore({ workers: []});

        await store.dispatch(actions.getCats());

        expect(store.getActions()).toEqual(expectedActions);

    });


});
