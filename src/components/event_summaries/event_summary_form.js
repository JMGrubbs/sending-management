import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Input } from 'semantic-ui-react';
// import { createEventSummary } from '../../services/event_summaries_api';
import useEventSources from '../../hooks/event_sources/useEventSources'
import useGetEventSummaryRules from '../../hooks/event_summaries/useGetEventSummaryRules'
import useCreateEventSummary from '../../hooks/event_summaries/useCreateEventSummary';

function EventSummaryForm( {brand_id}) {
    const { sourceEventsMemo, getEventSources } = useEventSources()
    const { eventSummaryRulesMemo, getEventSummaryRules } = useGetEventSummaryRules()
    const { createEventSummary } = useCreateEventSummary()
    const [selectedEventSourceTable, setSelectedEventSourceTable] = useState(null);
    const [selectedRules, setSelectedRules] = useState([]);
    const [summaryName, setSummaryName] = useState("")

    useEffect(() => {
        getEventSources()
        getEventSummaryRules()
    }, [getEventSources, getEventSummaryRules]);

    const handleEventTypeChange = (e, { value }) => {
        setSelectedEventSourceTable(value);
    };

    const handleRuleChange = (e, { value }) => {
        setSelectedRules(value);
    };

    const handleNameChange = (e, { value }) => {
        setSummaryName(value)
    }

    const handleSubmit = (e) => {
        if (selectedRules.length > 0 && selectedEventSourceTable && brand_id && summaryName !== ""){

            const new_summary = {
                "brand_id": brand_id,
                "table_rules": selectedRules,
                "source_table": selectedEventSourceTable,
                "recurring": true,
                "name": summaryName
            }
            createEventSummary(new_summary)
            setSelectedEventSourceTable(null)
            setSummaryName("")
            setSelectedRules([])
        } else {
            console.log("Missing fields")
        }
    };

    const sourceTableOptions = sourceEventsMemo.map(table => ({
        key: table.id,
        text: table.name,
        value: table.name,
    }));

    const tableRulesOptions = eventSummaryRulesMemo.map(rule => ({
        key: rule.id,
        text: rule.display,
        value: rule.sql,
    }));

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>New Input Field</label>
                <Input
                    placeholder='Enter name'
                    value={summaryName}
                    onChange={handleNameChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Segment Source Table</label>
                <Dropdown
                    fluid
                    placeholder='Select event'
                    selection
                    options={sourceTableOptions}
                    value={selectedEventSourceTable}
                    onChange={handleEventTypeChange}
                />
            </Form.Field>
            <Form.Field>
                <label>Table Rules</label>
                <Dropdown
                    placeholder='Select days'
                    multiple
                    fluid
                    search
                    selection
                    options={tableRulesOptions}
                    value={selectedRules}
                    onChange={handleRuleChange}
                />
            </Form.Field>
            <Button type='submit'>Generate Summary</Button>
        </Form>
    );
}

export default EventSummaryForm;