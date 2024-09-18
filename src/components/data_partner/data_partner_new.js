import React, { useState, useEffect } from 'react';
import { Form, Segment, Input, Dropdown, Button } from 'semantic-ui-react';

import useCreateDataPartner from '../../hooks/data_partners/useCreateDatePartners';

function DataPartnerCreateForm({ setSelectedPartner }) {
    const { newDataPartnerMemo, createDataPartner } = useCreateDataPartner()

    const [partnerName, setPartnerName] = useState('');
    const [commissionSource, setCommissionSource] = useState('');
    const [method, setMethod] = useState('');
    const [partnerSku, setPartnerSku] = useState('');
    const [split, setSplit] = useState(0);

    useEffect(() => {
        setSelectedPartner(newDataPartnerMemo || null);
    }, [newDataPartnerMemo, setSelectedPartner]);

    const methodOptions = [
        { key: 'net', text: 'Net', value: 'Net' },
        { key: 'gross', text: 'Gross', value: 'Gross' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPartner = {
            data_partner_name: partnerName,
            commission_source: parseInt(commissionSource)? parseInt(commissionSource): null,
            method: method,
            partner_sku: Number(partnerSku) || null,
            split: split,
        };
        await createDataPartner(newPartner);
    };

    return (
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Data Partner Name</label>
                    <Input
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder='Enter data partner name'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Commission Source</label>
                    <Input
                        value={commissionSource}
                        onChange={(e) => setCommissionSource(e.target.value)}
                        placeholder='Enter commission source'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Method</label>
                    <Dropdown
                        fluid
                        selection
                        options={methodOptions}
                        value={method}
                        onChange={(e, { value }) => setMethod(value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Partner SKU</label>
                    <Input
                        value={partnerSku}
                        onChange={(e) => setPartnerSku(e.target.value)}
                        placeholder='Enter partner SKU'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Split</label>
                    <Input
                        type="number"
                        step="0.01"
                        value={split}
                        onChange={(e) => setSplit(parseFloat(e.target.value))}
                        placeholder='Enter split percentage'
                    />
                </Form.Field>
                <Button type='submit' primary>Save</Button>
            </Form>
        </Segment>
    );
}

export default DataPartnerCreateForm;
