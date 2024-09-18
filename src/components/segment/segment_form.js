import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Dropdown } from 'semantic-ui-react';
import useGetEventSummaries from '../../hooks/event_summaries/useGetEventSummaries'
import useCreateSegments from '../../hooks/segments/useCreateSegments';
import useGetBrands from '../../hooks/brands/useGetBrands';

function CreateSegmentForm({refresh, setRefresh}) {
    const { eventSummariesMemo, getEventSummaries } = useGetEventSummaries()
    const { createSegments } = useCreateSegments()
    const { brandsMemo, getBrands } = useGetBrands()

    const [newSegmentName, setNewSegmentName] = useState()
    const [newSegmentSize, setNewSegmentSize] = useState()
    const [newSegmentSource, setNewSegmentSource] = useState()
    const [newBrandId, setNewBrandId] = useState()

    useEffect(()=>{
        getEventSummaries()
        getBrands()
    },[getEventSummaries, refresh, getBrands])

    const handleNameChange = (e, {value}) => {
        setNewSegmentName(value)
    };

    const handleSizeChange = (e, {value}) => {
        setNewSegmentSize(value)
    };

    const handleSourceChange = (e, {value}) => {
        setNewSegmentSource(value)
    };

    const handleSourceBrandId = (e, {value}) => {
        setNewBrandId(value)
    };

    const eventSummariesOption = eventSummariesMemo.map(table => ({
        key: table.id,
        text: table.name,
        value: table.name,
    }));

    const handleSubmit = async (e) => {
        const payload = {
            "segment_name": newSegmentName,
            "segment_size": parseInt(newSegmentSize),
            "segment_source": newSegmentSource,
            "brand_id": newBrandId
        }
        await createSegments(payload)
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
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Segment Name:</label>
                <Input
                    placeholder='Enter segment name'
                    name='segmentName'
                    value={newSegmentName}
                    onChange={handleNameChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Segment Size:</label>
                <Input
                    placeholder='Enter segment size'
                    name='segmentSize'
                    value={newSegmentSize}
                    onChange={handleSizeChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Segment Source:</label>
                <Dropdown
                    placeholder='Select event source'
                    fluid
                    search
                    selection
                    options={eventSummariesOption}
                    onChange={handleSourceChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Segment Brand:</label>
                <Dropdown
                    placeholder='Select Brand'
                    fluid
                    search
                    selection
                    options={brandOptions}
                    onChange={handleSourceBrandId}
                />
            </Form.Field>
            <Button type='submit'>Add Segment</Button>
        </Form>
    );
}

export default CreateSegmentForm;
