import React from 'react';
import Nagisa from '../../images/nagisa.png';
export default function Home() {
    return (
        <div className={'vertical-center'}>
            <div className={'container center-text'}>
                <img src={Nagisa} className={'img-fluid'}/>
                <ul className={'links'}>
                    <li>
                        <a href='https://vk.com/ga2mer_o_o'>VK</a>
                    </li>
                    <li>
                        <a href='https://twitter.com/ga2mer_ru'>Twitter</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
