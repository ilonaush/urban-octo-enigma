import RequestService from "../services/RequestService";
import {ACTIONS_TYPES, LOADING_TYPES, REQUEST_PATHS} from "../constants";

function setLoading(type, dispatch) {
    return dispatch({
        type: ACTIONS_TYPES.SET_LOADING,
        payload: {loading: true, loadingType: type}
    });
}

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
            setLoading(null, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.post(REQUEST_PATHS.ADD_CAT, cat);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.ADD_CAT,
                        payload: {cats: [], loading: false}
                    })
                }
                console.log(cats);
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
    feedCat(catInfo) {
        return async (dispatch) =>  {
            setLoading(LOADING_TYPES.FEED_CAT, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.FEED_CAT, catInfo);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.FEED_CAT,
                        payload: {cats: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats: [], loading: false}
                })
            }
    }},
    hugCat(catInfo) {
        return async (dispatch) =>  {
            setLoading(LOADING_TYPES.HUG_CAT, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.FEED_CAT, catInfo);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.FEED_CAT,
                        payload: {cats: [], loading: false }
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats: [], loading: false}
                })
            }
    }},
    washCat(catInfo) {
        return async (dispatch) =>  {

            setLoading(LOADING_TYPES.WASH_CAT, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.FEED_CAT, catInfo);
                if (!status) {
                    dispatch({
                        type: ACTIONS_TYPES.FEED_CAT,
                        payload: {cats: [], loading: false}
                    })
                }
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats: [], loading: false}
                })
            }
    }},
    findHome: function (cat) {
        return async (dispatch) =>  {
            setLoading(null, dispatch);

            try {
                const variables = {
                    ...cat
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
