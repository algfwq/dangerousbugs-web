import React from 'react';
import {useDispatch} from 'react-redux';
import {switchToLoad, switchToMain} from './actions';
import {Button, Toast} from '@douyinfe/semi-ui';
import {Carousel, Typography, Space} from '@douyinfe/semi-ui';
import {Lottie} from '@douyinfe/semi-ui';
import './index.css';


const Main = () => {
    //计时器
    let connectionStartTime;
    //开始计时
    connectionStartTime = Date.now();

    //深色浅色模式跟随系统
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
        } else {
            body.setAttribute('theme-mode', 'dark');
        }
    };

    const dispatch = useDispatch();

    const handleSwitchToLoad = () => {
        dispatch(switchToLoad());
    };

    const [Loading, setLoading] = React.useState(true);

    const StopLoading = () => {
        setLoading(false);
    };

    //获取加载动画URL
    const protocol = window.location.protocol;
    const host = window.location.host;
    const url = `${protocol}//${host}/download/LoadLottie/load.json`;
    console.log("获取加载动画URL：", url);

    const jsonURL =
        'http://127.0.0.1:8080/download/LoadLottie/load.json';

    //websocket连接
    // 获取当前页面的主机名和端口号
    const protocolWebsocket = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostWebsocket = window.location.host;
    const urlWebsocket = `${protocolWebsocket}//${hostWebsocket}/main/`;
    console.log("websocket连接地址：", urlWebsocket);

    const UrlWebSocket = "ws://127.0.0.1:8080/main/";

    const socket = new WebSocket(UrlWebSocket);

    socket.onclose = () => {
        console.log("websocket连接关闭");
    }

    socket.onmessage = (message) => {
        // 接收到消息
        console.log("websocket接收到消息：", message);
        // 解析消息
        const data = JSON.parse(message.data);
        // 判断消息类型
        console.log(data.mode)

        if (data.mode === 'stop_loading') {
            //停止计时
            const connectionEndTime = Date.now();
            const connectionTime = connectionEndTime - connectionStartTime;
            console.log("连接时间：", connectionTime);
            // 延迟30秒停止加载动画
            if (connectionTime < 5000) { // 5秒 = 5000毫秒
                setTimeout(StopLoading, 5000 - connectionTime);
            } else {
                StopLoading();
            }
        }
    }

    //轮播图配置
    const {Title, Paragraph} = Typography;

    const style = {
        width: '100%',
        height: '400px',
    };

    const titleStyle = {
        position: 'absolute',
        top: '100px',
        left: '100px',
        color: '#1C1F23'
    };

    const colorStyle = {
        color: '#1C1F23'
    };

    //工作室LOGO
    const URL_LOGO = `${protocol}//${host}/download/logo/logo.png`;
    const renderLogo = () => {
        return (
            <img
                // src={URL_LOGO}
                src="http://127.0.0.1:8080/download/logo/logo.png"
                alt='semi_logo' style={{width: 87, height: 31}}/>
        );
    };

    const imgList = [
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png',
    ];

    const textList = [
        ['Semi', '从 Semi Design，到 Any Design', '快速定制你的设计系统，并应用在设计稿和代码中'],
        ['Semi 物料市场', '面向业务场景的定制化组件，支持线上预览和调试', '内容由 Semi Design 用户共建'],
        ['Semi Template', '高效的 Design2Code 设计稿转代码', '海量 Figma 设计模板一键转为真实前端代码'],
    ];


    return (
        <>
            {Loading === true && (
                <body>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <Lottie params={{path: jsonURL}} width={'300px'} height={'300'}/>
                    </div>
                </body>
            )}
            {Loading === false && (
                <body>
                    <Carousel style={style} theme='dark'>
                        {
                            imgList.map((src, index) => {
                                return (
                                    <div key={index}
                                         style={{backgroundSize: 'cover', backgroundImage: `url('${src}')`}}>
                                        <Space vertical align='start' spacing='medium' style={titleStyle}>
                                            {renderLogo()}
                                            <Title heading={2} style={colorStyle}>{textList[index][0]}</Title>
                                            <Space vertical align='start'>
                                                <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                                                <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                                            </Space>
                                        </Space>
                                    </div>
                                );
                            })
                        }
                    </Carousel>
                    <br/><br/>
                    <Button onClick={switchMode}>切换模式</Button>
                </body>
            )}
        </>
    );
}

export default Main;