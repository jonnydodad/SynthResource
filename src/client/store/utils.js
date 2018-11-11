/**
* ************************************
*
* @module  redux logger
* @author  jonnydodad
* @date    08/07/18
* @description https://redux.js.org/api/applymiddleware#example-custom-logger-middleware
*
* ************************************
*/
/**/

export default ({ getState }) => next => (action) => {
  console.log('will dispatch', action);
  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);
  console.log('state after dispatch', getState());
  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};
