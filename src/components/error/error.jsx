import React from 'react';
import Ram from '../../images/ram.png';
export default function Error() {
    return (
        <div className={'container center-text'}  style={{
            maxWidth: '450px'
        }}>
            <img src={Ram} className={'img-fluid'}/>
        </div>
    );
}
