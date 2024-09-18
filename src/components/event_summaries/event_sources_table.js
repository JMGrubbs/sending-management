import React, { useEffect, useState } from 'react';
import { Grid, Segment, Button, Label } from 'semantic-ui-react';
import useEventSources from '../../hooks/event_sources/useEventSources';
import useCreateEventSource from '../../hooks/event_sources/useCreateEventSource';

function EventSourceTables() {
    const { sourceEventsMemo, getEventSources, removeEventSources } = useEventSources()
    const { createEventSource} = useCreateEventSource()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (reload){
            setReload(false)
        }
        getEventSources()
    }, [getEventSources, reload]);


    const handleDelete = (row) => {
        removeEventSources(row.id)
        setReload(true)
    }

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

    const handleRemake = (row) => {
        createEventSource({"days": row.days, "event_type": row.event_type})
        setReload(true)
    }

    return (
        <Segment className="summaries-list-container">
            <Grid>
                <Grid.Row><h3>Event Summary build tables</h3></Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} className="column-header">Event Type</Grid.Column>
                    <Grid.Column width={2} className="column-header">Size</Grid.Column>
                    <Grid.Column width={2} className="column-header">Status</Grid.Column>
                    <Grid.Column width={2} className="column-header">days</Grid.Column>
                    <Grid.Column width={4} className="column-header">Created At</Grid.Column>
                    <Grid.Column width={4} className="column-header">Actions</Grid.Column>
                </Grid.Row>
                {sourceEventsMemo?.length > 0 ? (
                    sourceEventsMemo.map((row, index) => (
                        <Grid.Row key={index}>
                        <Grid.Column width={2}>{row.name}</Grid.Column>
                        <Grid.Column width={2}>{row.table_size}</Grid.Column>
                        <Grid.Column width={2}>{getStatusLabel(row.status)}</Grid.Column>
                        <Grid.Column width={2}>{row.days}</Grid.Column>
                        <Grid.Column width={4}>{row.created_at}</Grid.Column>
                        <Grid.Column width={4}>
                            <Button onClick={() => handleRemake(row)}>Remake</Button>
                            <Button onClick={() => handleDelete(row)}>Delete</Button>
                        </Grid.Column>
                        </Grid.Row>
                    ))
                ) : (
                    <Grid.Row>
                        <Grid.Column width={16}>No source tables available</Grid.Column>
                    </Grid.Row>
                )}
            </Grid>
        </Segment>
    );
}

export default EventSourceTables;
