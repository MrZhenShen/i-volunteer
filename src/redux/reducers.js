import { combineReducers } from 'redux';
import volunteersReducer from '../features/volunteers/redux/volunteers.reducers';

const rootReducer = combineReducers({
    volunteers: volunteersReducer
});

export default rootReducer;

