import * as facade from '../../../api/volunteer.facade'
import { composeActionName, DELETE, FAILURE, FETCH_LIST, FETCH, POST, PUT, REQUEST, SUCCESS } from '../../../redux/actions';

/**
 * @typedef {import('../../../api/volunteer.facade').Volunteer} Volunteer
    * @typedef {import('../../../api/volunteer.facade').CreateVolunteerRequest} CreateVolunteerRequest
*/

export const VOLUNTEERS = 'VOLUNTEERS';
export const PROFILE = 'PROFILE';

export function volunteerAction(...parts) {
    return composeActionName(VOLUNTEERS, ...parts)
}

export const fetchVolunteers = () => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(FETCH_LIST, REQUEST) });

        try {
            const data = await facade.getVolunteers();
            dispatch({ type: volunteerAction(FETCH_LIST, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: volunteerAction(FETCH_LIST, FAILURE), error: error.message });
        }
    };
};

/**
    * Create a volunteer
    * @param {CreateVolunteerRequest} volunteer
    * @returns {function}
*/
export const createVolunteer = (volunteer) => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(POST, REQUEST) });
        try {
            const data = await facade.postVolunteer(volunteer);
            dispatch({ type: volunteerAction(POST, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: volunteerAction(POST, FAILURE), error: error.message });
        }
    }
}

/**
    * Fetch a volunteer
    * @param {number} id
    * @returns {function}
*/
export const fetchVolunteer = (id) => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(FETCH, REQUEST) });
        try {
            const data = await facade.getVolunteer(id);
            dispatch({ type: volunteerAction(FETCH, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: volunteerAction(FETCH, FAILURE), error: error.message });
        }
    }
}

/*
    * Update a volunteer
    * @param {number} id
    * @param {Volunteer} volunteer
    * @returns {function}
*/
export const updateVolunteer = (id, volunteer) => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(PUT, REQUEST) });
        try {
            const data = await facade.putVolunteer(id, volunteer);
            dispatch({ type: volunteerAction(PUT, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: volunteerAction(PUT, FAILURE), error: error.message });
        }
    }
}

/**
    * Delete a volunteer
    * @param {number} id
    * @returns {function}
*/
export const deleteVolunteer = (id) => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(DELETE, REQUEST) });
        try {
            await facade.deleteVolunteer(id);
            dispatch({ type: volunteerAction(DELETE, SUCCESS) });
        } catch (error) {
            dispatch({ type: volunteerAction(DELETE, FAILURE), error: error.message });
        }
    }
}

/**
    * Fetch a volunteer profile
    * @param {number} id
    * @returns {function}
*/
export const fetchVolunteerProfile = (id) => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(FETCH, PROFILE, REQUEST) });
        try {
            const data = await facade.getVolunteerProfileById(id);
            dispatch({ type: volunteerAction(FETCH, PROFILE, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: volunteerAction(FETCH, PROFILE, FAILURE), error: error.message });
        }
    }
}

/**
    * Fetch a list of volunteers by region
    * @param {number} region
    * @returns {function}
*/
export const fetchVolunteersByRegion = (region) => {
    return async (dispatch) => {
        dispatch({ type: volunteerAction(FETCH_LIST, REQUEST) });
        try {
            const data = await facade.findAllVolunteersByRegionId(region);
            dispatch({ type: volunteerAction(FETCH_LIST, SUCCESS), payload: data });
        } catch (error) {
            dispatch({ type: volunteerAction(FETCH_LIST, FAILURE), error: error.message });
        }
    }
}

const actions = {
    fetchVolunteers,
    createVolunteer,
    fetchVolunteer,
    updateVolunteer,
    deleteVolunteer,
    fetchVolunteerProfile,
    fetchVolunteersByRegion
}

export default actions;
