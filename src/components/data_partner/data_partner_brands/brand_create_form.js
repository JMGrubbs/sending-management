import React, { useState, useEffect } from 'react';
import { Form, Segment, Input, Button } from 'semantic-ui-react';

import useCreateBrand from '../../../hooks/brands/useCreateBrand';

function BrandCreateForm({ setSelectedBrand, selectedPartner, setCreateNewBrand, createBrand}) {
    const { errorNewBrand } = useCreateBrand()
    const [brandName, setBrandName] = useState('');
    const [dataPartnerId, setDataPartnerId] = useState(selectedPartner.id);
    const [brandSku, setBrandSku] = useState('');
    const [brandAbbrv, setBrandAbbrv] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBrand = {
            brand_name: String(brandName),
            data_partner_id: Number(dataPartnerId),
            brandSku: Number(brandSku),
            brand_abbrv: String(brandAbbrv)
        };
        await createBrand(newBrand);
        setCreateNewBrand(false)
        if (errorNewBrand){
            window.alert("Error updating this brand.");
        }
    };

    const handleBack = () => {
        setSelectedBrand(null)
    }

    return (
        <Segment>
            <Button color='green' onClick={handleBack}>Back</Button>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Brand Name</label>
                    <Input
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder='Enter data partner name'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Brand Sku</label>
                    <Input
                        value={brandSku}
                        onChange={(e) => setBrandSku(e.target.value)}
                        placeholder='Enter Brand Sku'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Brand Abbrv</label>
                    <Input
                        value={brandAbbrv}
                        onChange={(e) => setBrandAbbrv(e.target.value)}
                        placeholder='Enter Brand ShorCode'
                    />
                </Form.Field>
                <Button type='submit' primary>Save</Button>
            </Form>
        </Segment>
    );
}

export default BrandCreateForm;
