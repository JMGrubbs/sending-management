import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button, Form, Container, Segment, Message } from 'semantic-ui-react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/home');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Container>
            <Segment>
                <Form onSubmit={handleSubmit} error={!!error}>
                    <Form.Input
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                    <Form.Input
                        type='password'
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    <Button type='submit' content='Login' />
                    {error && <Message error header='Login Failed' content={error} />}
                </Form>
            </Segment>
        </Container>
    );
}

export default Login;
