import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import CreateSegmentForm from './segment_form';
import SegmentList from './segment_list';
import useGetSegments from '../../hooks/segments/useGetSegments'


function SegmentManager() {
    const { segmentsMemo, loadingSegments, errorEventSegments, getSegments } = useGetSegments()
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        if (refresh) {
            getSegments();
            setRefresh(false)
        }
    }, [getSegments, refresh]);

    return (
        <Segment padded>
            <Grid>
                <Grid.Column width={6}>
                    <Segment padded>
                        <CreateSegmentForm
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
                    <SegmentList
                        setRefresh={setRefresh}
                        segmentsMemo={segmentsMemo}
                        loadingSegments={loadingSegments}
                        errorEventSegments={errorEventSegments}
                    />
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default SegmentManager;
