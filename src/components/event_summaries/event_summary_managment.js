import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Segment, Dropdown } from 'semantic-ui-react';

import EventSummaryForm from './event_summary_form';
import EventSourceTables from './event_sources_table';
import EventSummaryList from './event_summary_list';

import useGetBrands from '../../hooks/brands/useGetBrands';
import useGetEventSummaries from '../../hooks/event_summaries/useGetEventSummaries';
import useDeleteEventSummary from '../../hooks/event_summaries/useDeleteEventSummary';

function EventSummaryManager() {
    const [searchParams, setSearchParams] = useSearchParams();
    const brand_id = searchParams.get('brand_id');
    const { eventSummariesMemo, loadingEventSummaries, getEventSummaries} = useGetEventSummaries()
    const { brandsMemo, getBrands } = useGetBrands()
    const { loadingDeletedEventSummary, deleteEventSummary} = useDeleteEventSummary()
    const [selectedBrand, setSelectedBrand] = useState(brand_id);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (refresh){
            setRefresh(false)
        }
        getEventSummaries(selectedBrand)
        getBrands()
    }, [refresh, setRefresh, getEventSummaries, getBrands, selectedBrand]);

    const handleBrandChange = (e, { value }) => {
        setSelectedBrand(value);
        setSearchParams({ brand_id: value });
    };

    const handleDelete = (summaryId) => {
        deleteEventSummary(summaryId)
        while (loadingDeletedEventSummary === true){
            console.log("loading...")
        }
        setRefresh(true)
    };

    const brandOptions = brandsMemo.map(brand => {
        return {
            key: brand.id,
            text: brand.brand_name,
            value: brand.id,
        }
    })

    return (
        <Segment padded style={{ height: '80vh' }}>
            <Grid>
                <Grid.Column width={5}>
                    <Segment padded style={{ maxHeight: '40vh' }}>
                        <label>Brand:</label>
                        <br />
                        <Dropdown
                            placeholder='Select or search for a brand...'
                            fluid
                            search
                            selection
                            options={brandOptions}
                            value={selectedBrand}
                            onChange={handleBrandChange}
                        />
                        <br />
                        <EventSummaryForm brand_id={selectedBrand}/>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={11}>
                    <EventSummaryList eventSummaries={eventSummariesMemo} loading={loadingEventSummaries} handleDelete={handleDelete} />
                </Grid.Column>
            </Grid>
            <Grid>
                <EventSourceTables />
            </Grid>
        </Segment>
    );
}

export default EventSummaryManager;
