import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

function HomePage() {
    return (
        <Container>
            <Segment padded="very" raised>
                <Header as='h2' textAlign='center'>Welcome to Our Application</Header>
                <p>
                    This is the home page of your application. From here, you can navigate to various sections of the app.
                </p>
                <p>
                    Use the navigation bar at the top of the page to access different features like creating segments or managing your data.
                </p>
            </Segment>
        </Container>
    );
}

export default HomePage;
