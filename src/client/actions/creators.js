/**
* ************************************
*
* @module  action creators
* @author  jonnydodad
* @date    08/07/18
* @description 
*
* ************************************
*/

import { makeActionCreator, asyncFetch, reduceCartToJS } from './utils';
import * as types from './actionTypes';

const setContent = makeActionCreator(types.SET_CONTENT, 'items', 'loaded');
const error = makeActionCreator(types.ERROR, 'error', 'loaded');
// const successMessage = makeActionCreator(types.CHECK_OUT, 'successMessage', 'error');
// const clearMessagesActionCreator = makeActionCreator(types.CLEAR_MESSAGES);
const changeImgActionCreator = makeActionCreator(types.CHANGE_IMG, 'rowDataImg', 'rowDataText');
const handleRadioActionCreator = makeActionCreator(types.HANDLE_RADIO_EVENT, 'radioEvent');
const handleSelectActionCreator = makeActionCreator(types.HANDLE_SELECT_EVENT, 'selectEvent');

export const changeImg = e => changeImgActionCreator(e.rowData.img, e.rowData.text);
export const handleRadioChange = e => handleRadioActionCreator(e);
export const handleSelectChange = e => handleSelectActionCreator(e);

export const fetchAllItems = () => (dispatch) => {
  asyncFetch('/get-synths')
    .then((res) => {
      const loaded = true;
      dispatch(setContent(res, loaded));
    })
    .catch((err) => {
      const loaded = true;
      dispatch(error(err.message, loaded));
    });
};
// export const postCart = cart => (dispatch) => {
// 	if (!cart.size) return;
// 	const init = {
//   	method: 'POST',
//   	body: JSON.stringify({ items: reduceCartToJS(cart) }), 
//   	headers: {
//     	'Content-Type': 'application/json'
//   	},
//   };
//   asyncFetch('/checkout', init)
//     .then((res) => {
//       dispatch(successMessage(res))
//     })
//     .catch((err) => {
//       dispatch(error(err.message));
//     });
// };
