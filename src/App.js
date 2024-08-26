import React from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {Button, Toast} from '@douyinfe/semi-ui';
import Main from './main';
import Load from './load';
import store from './store';
import {switchToMain, switchToLoad} from './actions';

function App() {
    return (
        <Provider store={store}>
            <ScreenSwitcher/>
        </Provider>
    );
}

function ScreenSwitcher() {
    const currentScreen = useSelector(state => state.currentScreen);
    const dispatch = useDispatch();

    const handleSwitchToMain = () => {
        Toast.success({content: '切换到main'});
        dispatch(switchToMain());
    };

    const handleSwitchToLoad = () => {
        Toast.success({content: '切换到load'});
        dispatch(switchToLoad());
    };

    return (
        <>
            {currentScreen === 'load' && (
                <>
                    <Load/>
                </>
            )}
            {currentScreen === 'main' && (
                <>
                    <Main/>
                </>
            )}
        </>
    );
}

export default App;