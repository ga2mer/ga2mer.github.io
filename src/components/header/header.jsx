import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';
export default function Header({currentRoute}) {
    return (
        <nav className='navbar navbar-pills navbar-fixed-top' style={{
            background: 'white'
        }}>
            <ul className="nav nav-pills navbar-nav">
                <li className={cx({
                    'nav-item': true,
                    active: currentRoute == '/'
                })}>
                    <Link className={'nav-link'} to='/'>Me</Link>
                </li>
                <li className={cx({
                    'nav-item': true,
                    active: currentRoute == '/graffiti'
                })}>
                    <Link className={'nav-link'} to='/graffiti'>Graffiti</Link>
                </li>
            </ul>
        </nav>
    );
}
