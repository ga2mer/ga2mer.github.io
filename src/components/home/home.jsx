import React, {Component} from 'react';
var Nagisa = require('../../images/nagisa.png');
export default class Home extends Component {
    render(props, state) {
        return (
            <div className="center-container">
                <div className={'center'}>
                    <img src={Nagisa}/>
                    <ul className={"links"}>
                        <li>
                            <a href="https://vk.com/ga2mer_o_o">VK</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/ga2mer_ru">Twitter</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
