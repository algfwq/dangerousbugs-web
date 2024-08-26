import { createStore } from 'redux';

const initialState = {
    currentScreen: 'main'
};

function screenReducer(state = initialState, action) {
    switch (action.type) {
        case 'SWITCH_TO_MAIN':
            return { ...state, currentScreen: 'main' };
        case 'SWITCH_TO_LOAD':
            return { ...state, currentScreen: 'load' };
        default:
            return state;
    }
}

const store = createStore(screenReducer);

export default store;