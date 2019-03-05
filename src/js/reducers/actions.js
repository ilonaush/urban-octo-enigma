import RequestService from "../services/RequestService";
import {ACTIONS_TYPES, REQUEST_PATHS} from "../constants";

export default {
    getCats: function() {
        return  async (dispatch) => {
            try {
                const {data: cats} = await RequestService.get(REQUEST_PATHS.GET_CATS);
                dispatch({
                    type: ACTIONS_TYPES.GET_CATS,
                    payload: cats
                })
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.GET_CATS,
                    payload: [],
                })
            }
        };
    },
    addCat: function (cat) {
        return async (dispatch) => {
            function setLoading() {
                return dispatch({
                    type: ACTIONS_TYPES.SET_LOADING,
                    payload: true
                });
            }

            setLoading();

            try {
                const {data: {cats, status}} = await RequestService.post(REQUEST_PATHS.ADD_CAT, cat);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.ADD_CAT,
                        payload: {cats: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.ADD_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.ADD_CAT,
                    payload: {cats: [], loading: false}
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
    findHome: function (catId) {
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
                    ID: catId
                };

                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.ISSUE_CAT, variables);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.ISSUE_CAT,
                        payload: {cats: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.ISSUE_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.ISSUE_CAT,
                    payload: {cats: [], loading: false}
                })
            }
        }
    }
};
