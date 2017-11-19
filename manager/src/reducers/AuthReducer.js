import { EMAIL_CHANGED } from '../actions/types';

const INITIAL_STATE = {
    email: ''
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case EMAIL_CHANGED:
            // make a new object from the existing state and overwrite email field
            return { ...state, email: action.payload };
        default:
            return state;
    }
};
