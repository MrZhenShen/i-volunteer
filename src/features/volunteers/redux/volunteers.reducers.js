import { FETCH_LIST, POST, PUT, DELETE, REQUEST, SUCCESS, FAILURE, FETCH } from '../../../redux/actions';
import { PROFILE, volunteerAction } from './volunteers.actions';

const initialState = {
    loading: false,
    data: [],
    current: null,
    profile: null,
    error: null
};

const volunteersReducer = (state = initialState, action) => {
    switch (action.type) {
        case volunteerAction(FETCH_LIST, REQUEST):
        case volunteerAction(FETCH, REQUEST):
        case volunteerAction(POST, REQUEST):
        case volunteerAction(PUT, REQUEST):
        case volunteerAction(DELETE, REQUEST):
        case volunteerAction(FETCH, PROFILE, REQUEST):
            return {
                ...state,
                loading: true
            };

        case volunteerAction(FETCH_LIST, SUCCESS):
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case volunteerAction(FETCH, SUCCESS):
            return {
                ...state,
                loading: false,
                current: action.payload
            };
        case volunteerAction(POST, SUCCESS):
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
            };
        case volunteerAction(PUT, SUCCESS):
            return {
                ...state,
                loading: false,
                data: state.data.map(volunteer => volunteer.id === action.payload.id ? action.payload : volunteer)
            };
        case volunteerAction(DELETE, SUCCESS):
            return {
                ...state,
                loading: false,
                data: state.data.filter(volunteer => volunteer.id !== state.current.id),
                current: null
            };
        case volunteerAction(FETCH, PROFILE, SUCCESS):
            return {
                ...state,
                loading: false,
                profile: action.payload
            };

        case volunteerAction(FETCH_LIST, FAILURE):
        case volunteerAction(FETCH, FAILURE):
        case volunteerAction(POST, FAILURE):
        case volunteerAction(PUT, FAILURE):
        case volunteerAction(DELETE, FAILURE):
        case volunteerAction(FETCH, PROFILE, FAILURE):
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default volunteersReducer;

