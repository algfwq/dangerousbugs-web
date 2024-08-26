import React from 'react';
import {useDispatch} from 'react-redux';
import {switchToMain} from './actions';
import {Button, Toast} from '@douyinfe/semi-ui';

const Main = () => {
    const dispatch = useDispatch();

    const handleSwitchToMain = () => {
        dispatch(switchToMain());
    };

    return (
        <div>
            <h2>Load 组件</h2>
            <Button onClick={handleSwitchToMain}>在 Load 组件中切换到 Main</Button>
        </div>
    );
};

export default Main;