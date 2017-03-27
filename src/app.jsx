import './style/main.scss';
import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { Layout } from 'antd';
const { Sider, Content } = Layout;
import HeaderComponent from './components/header';
import Home from './components/home/home.jsx';
import Graffiti from './components/graffiti/graffiti.jsx';
import Cover from './components/cover/cover.jsx';
import Error from './components/error/error.jsx';
render((
    <Router>
        <Layout className={'layout-center'}>
            <Sider collapsible><HeaderComponent /></Sider>
            <Layout>
                <Content>
                    <Switch>
                        <Route path={'/'} exact component={Home} />
                        <Route path={'/graffiti'} component={Graffiti} />
                        <Route path={'/cover'} component={Cover} />
                        <Route component={Error} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    </Router>
), document.querySelector('#root'));