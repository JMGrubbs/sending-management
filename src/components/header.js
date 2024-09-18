import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useAuth } from './userAuth/AuthContext';

function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <Menu>
            <Menu.Item>
                <Link to="/">Home</Link>
            </Menu.Item>
            {isAuthenticated && (
                <>
                    <Menu.Item>
                        <Link to="/segments/create">Create Segment</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/eventsummaries/">Summary Tables</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/data_partners">Data Partners</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/data/upload/select">Partner Data</Link>
                    </Menu.Item>
                </>
            )}
            <Menu.Item position='right'>
                {isAuthenticated ? (
                    <Link to="/logout">Logout</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </Menu.Item>
        </Menu>
    );
}

export default Header;
