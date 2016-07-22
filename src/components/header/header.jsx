import React, {Component} from 'react';
import {Link} from 'react-router';
import cx from 'classnames';
export default class Header extends Component {
    render() {
        return (
            <div className='ui secondary fixed pointing menu' style={{
                background: 'white'
            }}>
                <Link className={cx({
                    item: true,
                    active: this.props.currentRoute == '/'
                })} to='/'>Me</Link>
                <Link className={cx({
                    item: true,
                    active: this.props.currentRoute == '/graffiti'
                })} to='/graffiti'>Graffiti</Link>
            </div>
        );
    }
}
