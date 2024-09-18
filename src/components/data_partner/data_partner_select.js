import React from 'react';
import { Dropdown, Segment } from 'semantic-ui-react';

function DataPartnerSelect({ data_partners, setSelectedPartner, setCreateDataPartner }) {

    const dataPartnerOptions = data_partners.map((partner, index) => ({
        key: index,
        text: partner.data_partner_name,
        value: partner.id,
    }));

    const handleChange = (e, { value }) => {
        setCreateDataPartner(false)
        let clickedPartner = null
        data_partners.map(((partner) => {
            if (partner.id === value){
                return clickedPartner = partner
            }
            return null
        }))
        setSelectedPartner(clickedPartner);
    };

    return (
        <Segment>
            <Dropdown
                placeholder='Select or search for a brand...'
                fluid
                search
                selection
                options={dataPartnerOptions}
                onChange={handleChange}
            />
        </Segment>
    );
}

export default DataPartnerSelect;
