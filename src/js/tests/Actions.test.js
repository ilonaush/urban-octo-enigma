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

    it('creates GET_WORKERS after successfuly fetching workers', async () => {
        const expectedActions = [
            { type: ACTIONS_TYPES.GET_WORKERS, payload: {workers: [{ id: 1, name: 'John Smith' }]} },
        ];

        mockAxios.onGet('/').reply(200, {
            workers: [
                {id: 1, name: 'John Smith'}
            ]
        });

        const store = mockStore({ workers: []});

        await store.dispatch(actions.getWorkers()) ;
            // return of async actions
        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates GET_WORKERS after fail while fetching workers', async () => {
        const expectedActions = [
            { type: ACTIONS_TYPES.GET_WORKERS, payload: [] },
        ];

        mockAxios.onGet('/').networkError();

        const store = mockStore({ workers: []});

        await store.dispatch(actions.getWorkers());

        expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates SET_LOADING after fail while fetching workers', async () => {

        const worker = { id: 1, name: 'John Smith' };

        const expectedActions = [
            { type: ACTIONS_TYPES.SET_LOADING, payload: true },
            { type: ACTIONS_TYPES.EMPLOY_WORKER, payload: {workers: [{ id: 1, name: 'John Smith' }], loading: false}},
        ];

        mockAxios.onPost(REQUEST_PATHS.EMPLOY_WORKER).reply(function (config) {
            return RequestService.get(REQUEST_PATHS.GET_WORKERS)
        });


        const store = mockStore({ workers: []});

        await store.dispatch(actions.employWorker(worker));

        expect(store.getActions()).toEqual(expectedActions);

    });
});
