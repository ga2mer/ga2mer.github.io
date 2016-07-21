import React, {Component} from 'react';
import Router from 'preact-router';
import cx from 'classnames';
export default class Header extends Component {
    render(props, state) {
        return (
            <div className="ui secondary fixed pointing menu" style={{
                background: 'white'
            }}>
                <a className={cx({
                    item: true,
                    active: props.currentRoute == '/'
                })} href="/">Me</a>
                <a className={cx({
                    item: true,
                    active: props.currentRoute == '/graffiti'
                })} href="/graffiti">Graffiti</a>
            </div>
        );
    }
}
