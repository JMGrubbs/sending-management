import React, { useEffect, useState } from 'react';
import { Grid, Button, Label, Segment } from 'semantic-ui-react';
import useDeleteSegments from '../../hooks/segments/useDeleteSegments'
import './SegmentList.css';

function SegmentList({ segmentsMemo, setRefresh}) {
    const { deleteSegments} = useDeleteSegments()
    const [localSegments, setLocalSegments] = useState([])

    useEffect(() => {
        setLocalSegments([...segmentsMemo])
    }, [segmentsMemo])

    const handleDelete = async (segmentId) => {
        try {
            let refreshedSegments = localSegments.filter(segment => segment.id !== segmentId);
            setLocalSegments(refreshedSegments);
            await deleteSegments(segmentId);
            setRefresh(true);
        } catch (error) {
            console.error("Error deleting segment:", error);
        }
    };

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
        <Segment padded className="segment-list-container"style={{ height: '80vh' }}>
            <div className="header-row">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4} className="column-header">Segment Name</Grid.Column>
                        <Grid.Column width={2} className="column-header">Segment Size</Grid.Column>
                        <Grid.Column width={2} className="column-header">Build Status</Grid.Column>
                        <Grid.Column width={4} className="column-header">Created At</Grid.Column>
                        <Grid.Column width={4} className="column-header">Actions</Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <div className="scrollable-content">
                <Grid>
                    {localSegments.map((segment, index) => (
                        <Grid.Row key={index}>
                            <Grid.Column width={4}>{segment.segment_name}</Grid.Column>
                            <Grid.Column width={2}>{segment.segment_size}</Grid.Column>
                            <Grid.Column width={2}>{getStatusLabel(segment.build_status)}</Grid.Column>
                            <Grid.Column width={4}>{segment.created_at}</Grid.Column>
                            <Grid.Column width={4}>
                                <Button onClick={() => handleDelete(segment.id)}>Delete</Button>
                            </Grid.Column>
                        </Grid.Row>
                    ))}
                </Grid>
            </div>
        </Segment>
    );
}

export default SegmentList;
