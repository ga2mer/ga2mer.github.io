import React from 'react';
import {Link} from 'inferno-router';
import cx from 'classnames';
export default function Header() {
    return (
        <nav className='navbar navbar-pills navbar-fixed-top' style={{
            background: 'white'
        }}>
            <ul className="nav nav-pills navbar-nav">
                <li className={cx({
                    'nav-item': true,
                    active: location.pathname == '/'
                })}>
                    <Link className={'nav-link'} to='/'>Me</Link>
                </li>
                <li className={cx({
                    'nav-item': true,
                    active: location.pathname == '/graffiti'
                })}>
                    <Link className={'nav-link'} to='/graffiti'>Graffiti</Link>
                </li>
                <li className={cx({
                    'nav-item': true,
                    active: location.pathname == '/cover'
                })}>
                    <Link className={'nav-link'} to='/cover'>Cover</Link>
                </li>
            </ul>
        </nav>
    );
}
