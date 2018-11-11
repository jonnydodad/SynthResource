/**
* ************************************
*
* @module  actions utils
* @author  jonnydodad
* @date    08/07/18
* @description helper functions
*
* ************************************
*/

import fetch from 'isomorphic-fetch';
import "babel-polyfill"

export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const asyncFetch = async (url, init) => {
  if (!url) throw new Error(`Error in async_fetch: url is ${url}`);
  const response = await fetch(url, init);
  if (!response.ok) throw new Error(response.status);
  return response.json();
};

