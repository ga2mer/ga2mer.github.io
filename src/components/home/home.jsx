import React from 'react';
import { Row, Col, Menu } from 'antd';
import Nagisa from '../../images/nagisa.png';
export default function Home() {
    return (
        <Row type={'flex'} justify={'center'} align={'middle'} style={{
            minHeight: '100vh'
        }}>
            <Col>
                <img src={Nagisa} className={'img-fluid'} />
                <Menu
                    mode="horizontal"
                    className={'no-border center-horizontal'}
                    selectedKeys={[]}
                >
                    <Menu.Item key="VK"><a target={'_blank'} href='https://vk.com/ga2mer_o_o'>VK</a></Menu.Item>
                    <Menu.Item key="Twitter"><a target={'_blank'} href='https://twitter.com/ga2mer_ru'>Twitter</a></Menu.Item>
                </Menu>
            </Col>
        </Row>
    );
}
