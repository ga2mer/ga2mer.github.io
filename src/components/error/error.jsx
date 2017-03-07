import React from 'react';
import { Row } from 'antd';
import Ram from '../../images/ram.png';
export default function Error() {
    return (
        <Row type={'flex'} justify={'center'} align={'middle'} style={{
            minHeight: '100vh'
        }}>
            <img src={Ram} className={'img-fluid'}/>
        </Row>
    );
}
