import React from 'react';
import { Grid, Button, Label, Segment } from 'semantic-ui-react';
import './EventSummaryList.css';

function EventSummaryList({ eventSummaries, loading, handleDelete }) {

    const getStatusLabel = (build_status) => {
        switch (build_status) {
            case "pending":
                return <Label color="yellow">pending</Label>;
            case "in_progress":
                return <Label color="orange">processing</Label>;
            case "completed":
                return <Label color="green">ready</Label>;
            case "failed":
                return <Label color="red">failed</Label>;
            default:
                return <Label color='purple'>{build_status}</Label>;
        }
    };

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2} className="column-header">Brand ID</Grid.Column>
                    <Grid.Column width={3} className="column-header">Name</Grid.Column>
                    <Grid.Column width={3} className="column-header">Source Table</Grid.Column>
                    <Grid.Column width={2} className="column-header">Status</Grid.Column>
                    <Grid.Column width={2} className="column-header">Size</Grid.Column>
                    <Grid.Column width={2} className="column-header">Created At</Grid.Column>
                    <Grid.Column width={2} className="column-header">Actions</Grid.Column>
                </Grid.Row>
            </Grid>
            <Segment className="summaries-list-container" style={{ maxHeight: '32vh', overflowY: 'auto' }}>
                <Grid>
                    {loading? <span>loading...</span>: eventSummaries.map((summary, index) => (
                        <Grid.Row key={index}>
                            <Grid.Column width={2}>{summary.brand_id}</Grid.Column>
                            <Grid.Column width={3}>{summary.name}</Grid.Column>
                            <Grid.Column width={3}>{summary.source_table}</Grid.Column>
                            <Grid.Column width={2}>{getStatusLabel(summary.build_status)}</Grid.Column>
                            <Grid.Column width={2}>{summary.size}</Grid.Column>
                            <Grid.Column width={2}>{summary.created_at}</Grid.Column>
                            <Grid.Column width={2}>
                                <Button onClick={() => handleDelete(summary.id)}>Delete</Button>
                            </Grid.Column>
                        </Grid.Row>
                    ))}
                </Grid>
            </Segment>
        </>
    );
}

export default EventSummaryList;
