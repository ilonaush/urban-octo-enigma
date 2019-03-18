import RequestService from "../services/RequestService";
import {ACTIONS_TYPES, LOADING_TYPES, REQUEST_PATHS} from "../constants";

/**
 * sets loading state and loader type
 * @param type
 * @param dispatch
 * @returns {*}
 */
function setLoading(type, dispatch) {
    return dispatch({
        type: ACTIONS_TYPES.SET_LOADING,
        payload: {loading: true, loadingType: type}
    });
}

/**
 * dispatches empty array
 * @param dispatch
 * @param type
 */
function handleError(dispatch, type) {
    dispatch({
        type: type,
        payload: { cats: [], loading: false }
    })
}

export default {
    getCats: function() {
        return  async (dispatch) => {

            setLoading(null, dispatch);

            try {
                const {data: cats} = await RequestService.get(REQUEST_PATHS.GET_CATS);
                dispatch({
                    type: ACTIONS_TYPES.GET_CATS,
                    payload: { cats, loading: false }
                })
            }
            catch (e) {
              handleError(dispatch, ACTIONS_TYPES.GET_CATS)
            }
        };
    },
    addCat: function (cat) {
        return async (dispatch) => {

            setLoading(null, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.post(REQUEST_PATHS.ADD_CAT, cat);
                if (!status) {
                    handleError(dispatch, ACTIONS_TYPES.ADD_CAT)
                }
                dispatch({
                    type: ACTIONS_TYPES.ADD_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                handleError(dispatch, ACTIONS_TYPES.ADD_CAT)
            }
        }
    },
    feedCat(catInfo) {
        return async (dispatch) =>  {

            setLoading(LOADING_TYPES.FEED_CAT, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.FEED_CAT, catInfo);
                if (!status) {
                    handleError(dispatch, ACTIONS_TYPES.FEED_CAT)
                }
                dispatch({
                    type: ACTIONS_TYPES.FEED_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                handleError(dispatch, ACTIONS_TYPES.FEED_CAT)

            }
    }},
    hugCat(catInfo) {
        return async (dispatch) =>  {

            setLoading(LOADING_TYPES.HUG_CAT, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.HUG_CAT, catInfo);
                if (!status) {
                    handleError(dispatch, ACTIONS_TYPES.HUG_CAT)
                }
                dispatch({
                    type: ACTIONS_TYPES.HUG_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                handleError(dispatch, ACTIONS_TYPES.HUG_CAT)
            }
    }},
    washCat(catInfo) {
        return async (dispatch) =>  {

            setLoading(LOADING_TYPES.WASH_CAT, dispatch);

            try {
                const {data: {cats, status}} = await RequestService.patch(REQUEST_PATHS.WASH_CAT, catInfo);
                if (!status) {
                    handleError(dispatch, ACTIONS_TYPES.WASH_CAT)
                }
                dispatch({
                    type: ACTIONS_TYPES.WASH_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                handleError(dispatch, ACTIONS_TYPES.WASH_CAT)
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
                    handleError(dispatch, ACTIONS_TYPES.ISSUE_CAT)
                }
                dispatch({
                    type: ACTIONS_TYPES.ISSUE_CAT,
                    payload: {cats, loading: false}
                });
            }
            catch (e) {
                handleError(dispatch, ACTIONS_TYPES.ISSUE_CAT)
            }
        }
    }
};
