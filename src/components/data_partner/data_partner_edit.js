import React, { useState, useEffect } from 'react';
import { Form, Segment, Input, Dropdown, Button } from 'semantic-ui-react';

import useDeleteDataPartner from '../../hooks/data_partners/useDeleteDatePartners';
import useUpdateDataPartner from '../../hooks/data_partners/useUpateDatePartners';

function DataPartnerEditForm({ selectedPartner, setSelectedPartner }) {
    const { deleteDataPartner } = useDeleteDataPartner();
    const { updateDataPartner } = useUpdateDataPartner();

    const [partnerName, setPartnerName] = useState('');
    const [commissionSource, setCommissionSource] = useState('');
    const [method, setMethod] = useState('');
    const [partnerSku, setPartnerSku] = useState('');
    const [split, setSplit] = useState(0);

    useEffect(() => {
        if (selectedPartner) {
            setPartnerName(selectedPartner.data_partner_name || '');
            setCommissionSource(selectedPartner.commission_source || '');
            setMethod(selectedPartner.method || '');
            setPartnerSku(selectedPartner.partner_sku || '');
            setSplit(selectedPartner.split || 0);
        }
    }, [selectedPartner]);

    const methodOptions = [
        { key: 'net', text: 'Net', value: 'Net' },
        { key: 'gross', text: 'Gross', value: 'Gross' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPartner = {
            ...selectedPartner,
            data_partner_name: partnerName,
            commission_source: parseInt(commissionSource)? parseInt(commissionSource): null,
            method,
            partner_sku: partnerSku,
            split
        };
        console.log("update", updatedPartner)
        await updateDataPartner(updatedPartner);
        setSelectedPartner(updatedPartner);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this partner?")) {
            await deleteDataPartner(selectedPartner.id);
            setSelectedPartner(null);
        }
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
                <Button
                    color='red'
                    type='button'
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Form>
        </Segment>
    );
}

export default DataPartnerEditForm;
