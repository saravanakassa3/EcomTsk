import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { settingsReducer } from './settingsReducer';

const rootReducer = combineReducers({
  users: settingsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
