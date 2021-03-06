import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
class Header extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    handleClick = ({ key }) => {
        this.props.history.push(key);
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
            >
                <Menu.Item key="/">Me</Menu.Item>
                <Menu.Item key="/cover">Cover</Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(Header);