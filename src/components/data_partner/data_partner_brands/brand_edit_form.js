import React, { useState, useEffect } from 'react';
import { Form, Segment, Input, Dropdown, Button } from 'semantic-ui-react';

import useGetDataPartners from '../../../hooks/data_partners/useGetDatePartners';
import useUpdateBrands from '../../../hooks/brands/useUpateBrands';

function BrandEditForm({ selectedBrand, setSelectedBrand, handleDelete }) {
    const { dataPartnersMemo, getDataPartners } = useGetDataPartners();
    const { updateBrands, loadingUpdateBrand, errorUpdatedBrand } = useUpdateBrands()
    const [brandName, setBrandName] = useState('');
    const [dataPartnerId, setDataPartnerId] = useState('');
    const [brandSku, setBrandSku] = useState('');
    const [brandAbbrv, setBrandAbbrv] = useState(0);

    useEffect(() => {
        if (selectedBrand) {
            getDataPartners()
            setBrandName(selectedBrand.brand_name || '');
            setDataPartnerId(selectedBrand.data_partner_id || '');
            setBrandSku(selectedBrand.brand_sku || '');
            setBrandAbbrv(selectedBrand.brand_abbrv || '');
        }
    }, [selectedBrand, getDataPartners]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBrand = {
            ...selectedBrand,
            brand_name: brandName,
            data_partner_id: dataPartnerId,
            brandSku: brandSku,
            brand_abbrv: brandAbbrv
        };
        console.log("update", updatedBrand)
        await updateBrands(updatedBrand);
        if (errorUpdatedBrand){
            window.alert("Error updating this brand.");
        } else {
            setSelectedBrand(updatedBrand);
        }
    };

    const handleBack = () => {
        setSelectedBrand(null)
    }

    const dataPartnerOptions = dataPartnersMemo.map((dataPartner, index) => {
        return {
            key: index,
            text: dataPartner.data_partner_name,
            value: dataPartner.id
        }
    })

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
                    <label>Data Partner Id</label>
                    <Dropdown
                        fluid
                        selection
                        options={dataPartnerOptions}
                        value={dataPartnerId}
                        onChange={(e, { value }) => setDataPartnerId(value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Brand Abbrv</label>
                    <Input
                        value={brandAbbrv}
                        onChange={(e) => setBrandAbbrv(e.target.value)}
                        placeholder='Enter Brand SKU'
                    />
                </Form.Field>
                <Button type='submit' primary>Save</Button>
                <Button
                    color='red'
                    type='button'
                    onClick={handleDelete}
                >Delete
                </Button>
            </Form>
        </Segment>
    );
}

export default BrandEditForm;
