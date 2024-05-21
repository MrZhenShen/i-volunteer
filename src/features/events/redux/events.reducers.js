import { FETCH_LIST, POST, PUT, DELETE, REQUEST, SUCCESS, FAILURE, FETCH } from '../../../redux/actions';
import { eventsAction } from './events.actions';

const initialState = {
    loading: false,
    data: [],
    current: null,
    profile: null,
    error: null
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case eventsAction(FETCH_LIST, REQUEST):
        case eventsAction(FETCH, REQUEST):
        case eventsAction(POST, REQUEST):
        case eventsAction(PUT, REQUEST):
        case eventsAction(DELETE, REQUEST):
            return {
                ...state,
                loading: true
            };

        case eventsAction(FETCH_LIST, SUCCESS):
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case eventsAction(FETCH_LIST, FAILURE):
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case eventsAction(POST, SUCCESS):
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
            };
        case eventsAction(POST, FAILURE):
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case eventsAction(DELETE, SUCCESS):
            return {
                ...state,
                loading: false,
                data: state.data.filter((event) => event.id !== action.payload)
            };
        case eventsAction(DELETE, FAILURE):
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case eventsAction(FETCH, SUCCESS):
            return {
                ...state,
                loading: false,
                current: action.payload
            };
        case eventsAction(FETCH, FAILURE):
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default eventsReducer;
