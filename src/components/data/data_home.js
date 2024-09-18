import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

function DataManager() {
    return (
        <Container>
            <Segment padded="very" raised>
                <Header as='h2' textAlign='center'>Partner Data</Header>
                <p>
                    Welcome to the Partner Data page. Here you can manage your partners data and change partners data settings.
                </p>
            </Segment>
        </Container>
    );
}

export default DataManager;
