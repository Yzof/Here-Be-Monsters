import { combineReducers } from 'redux';

import hexReducer from 'hex_reducer';
// we actually need to build the hexReducer

export default combineReducers({
  hexes: hexReducer
});
