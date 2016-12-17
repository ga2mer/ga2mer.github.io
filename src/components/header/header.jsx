import React from 'react';
import {Link} from 'inferno-router';
import cx from 'classnames';
export default function Header() {
    return (
        <header style={{
            background: 'white'
        }}>
            <ul className="navigation">
                <li
                    className={cx({
                    active: location.pathname == '/'
                })}>
                    <Link to='/'>Me</Link>
                </li>
                <li
                    className={cx({
                    active: location.pathname == '/graffiti'
                })}>
                    <Link to='/graffiti'>Graffiti</Link>
                </li>
                <li
                    className={cx({
                    active: location.pathname == '/cover'
                })}>
                    <Link to='/cover'>Cover</Link>
                </li>
            </ul>
        </header>
    );
}
