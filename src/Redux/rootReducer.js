import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Thêm các reducer khác nếu có
});

export default rootReducer;
