export const FETCH_LIST = 'FETCH_LIST';
export const FETCH = 'FETCH';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function composeActionName(prefix, ...parts) {
    return `${prefix}.${parts.join('.')}`;
}
