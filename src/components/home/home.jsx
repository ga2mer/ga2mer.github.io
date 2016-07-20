import React, {Component} from 'react';
var Nagisa = require('../../images/nagisa.png');
export default class Home extends Component {
    render(props, state) {
        return (
            <div id="home">
                <img src={Nagisa}/>
                <ul>
                    <li>
                        <a href="https://vk.com/ga2mer_o_o">VK</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/ga2mer_ru">Twitter</a>
                    </li>
                </ul>
            </div>
        )
    }
}
