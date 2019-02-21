import RequestService from "../services/RequestService";
import {ACTIONS_TYPES, REQUEST_PATHS} from "../constants";

export default {
    getWorkers: function() {
        return  async (dispatch) => {
            try {
                const {data: workers} = await RequestService.get(REQUEST_PATHS.GET_WORKERS);
                dispatch({
                    type: ACTIONS_TYPES.GET_WORKERS,
                    payload: workers
                })
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.GET_WORKERS,
                    payload: []
                })
            }
        };
    },
    employWorker: function (worker) {
        return async (dispatch) => {
            function setLoading() {
                return dispatch({
                    type: ACTIONS_TYPES.SET_LOADING,
                    payload: true
                });
            }

            setLoading();

            try {
                const {data: {workers, status}} = await RequestService.post(REQUEST_PATHS.EMPLOY_WORKER, worker);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.EMPLOY_WORKER,
                        payload: {workers: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.EMPLOY_WORKER,
                    payload: {workers, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.EMPLOY_WORKER,
                    payload: {workers: [], loading: false}
                })
            }
        }
    },
    editWorkTime: function (worker) {
        return async (dispatch) =>  {
            function setLoading() {
                return dispatch({
                    type: ACTIONS_TYPES.SET_LOADING,
                    payload: true
                });
            }

            setLoading();
            console.log(worker);
            try {
                const {data: {workers, status}} = await RequestService.patch(REQUEST_PATHS.EDIT_WORKTIME, worker);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.EDIT_WORKTIME,
                        payload: {workers: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.EDIT_WORKTIME,
                    payload: {workers, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.EDIT_WORKTIME,
                    payload: {workers: [], loading: false}
                })
            }
        }
    },
    fireWorker: function (workerId) {
        return async (dispatch) =>  {
            function setLoading() {
                return dispatch({
                    type: ACTIONS_TYPES.SET_LOADING,
                    payload: true
                });
            }

            setLoading();

            try {
                const variables = {
                    ID: workerId
                };

                const {data: {workers, status}} = await RequestService.patch(REQUEST_PATHS.FIRE_WORKER, variables);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.FIRE_WORKER,
                        payload: {workers: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.FIRE_WORKER,
                    payload: {workers, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.FIRE_WORKER,
                    payload: {workers: [], loading: false}
                })
            }
        }
    }
};
