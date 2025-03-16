import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  // Add more reducers here as your application grows
});

export default rootReducer;
