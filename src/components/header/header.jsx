import React, {Component} from 'react';
export default class Header extends Component {
    render(props, state) {
        return (
            <div id="header">
                <ul>
                    <li>
                        <a href="/">Main</a>
                    </li>
                    <li>
                        <a href="/graffiti">Graffiti</a>
                    </li>
                </ul>
            </div>
        );
    }
}
