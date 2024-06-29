import { combineReducers } from 'redux';

import eventsReducer from '../features/events/redux/events.reducers';
import volunteersReducer from '../features/volunteers/redux/volunteers.reducers';

const rootReducer = combineReducers({
    volunteers: volunteersReducer,
    events: eventsReducer,
});

export default rootReducer;

