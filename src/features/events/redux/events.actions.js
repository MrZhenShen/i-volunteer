import * as facade from '../../../api/events.facade'
import { composeActionName, DELETE, FAILURE, FETCH_LIST, FETCH, POST, REQUEST, SUCCESS } from '../../../redux/actions';

/**
 * @typedef {import('../../../api/events.facade').EventRequest} EventRequest
 * @typedef {import('../../../api/events.facade').EventDTO} EventDTO
*/

export const EVENTS = 'EVENTS';

export function eventsAction(...parts) {
    return composeActionName(EVENTS, ...parts)
}

export function getEvents() {
    return async (dispatch) => {
        dispatch({ type: eventsAction(FETCH_LIST, REQUEST) });

        try {
            const data = await facade.getAllEvents();
            dispatch({ type: eventsAction(FETCH_LIST, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: eventsAction(FETCH_LIST, FAILURE), error: error.message });
        }
    };
}

/**
 * Create Event
 * @param {EventRequest} event
 * @returns {function}
*/
export function createEvent(event) {
    return async (dispatch) => {
        dispatch({ type: eventsAction(POST, REQUEST) });

        try {
            const data = await facade.createEvent(event);
            dispatch({ type: eventsAction(POST, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: eventsAction(POST, FAILURE), error: error.message });
        }
    };
}

/**
    * Get Event
    * @param {number} id
    * @returns {function}
*/
export function getEvent(id) {
    return async (dispatch) => {
        dispatch({ type: eventsAction(FETCH, REQUEST) });

        try {
            const data = await facade.getEventById(id);
            dispatch({ type: eventsAction(FETCH, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: eventsAction(FETCH, FAILURE), error: error.message });
        }
    };
}

/**
 * Delete Event
 * @param {number} id
 * @returns {function}
*/
export function deleteEvent(id) {
    return async (dispatch) => {
        dispatch({ type: eventsAction(DELETE, REQUEST) });

        try {
            await facade.deleteEvent(id);
            dispatch({ type: eventsAction(DELETE, SUCCESS), payload: id });
        } catch (error) {
            dispatch({ type: eventsAction(DELETE, FAILURE), error: error.message });
        }
    };
}
