import React, { useEffect, useState } from 'react';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { useSearchParams } from 'react-router-dom';

import DataPartnerSelect from './data_partner_select';
import DataPartnerEditForm from './data_partner_edit';
import BrandsManagment from './data_partner_brands/brands_managment';

import useGetDataPartners from '../../hooks/data_partners/useGetDatePartners';
import DataPartnerCreateForm from './data_partner_new';

function DataPartnerManagment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const { dataPartnersMemo, loadingDataPartners, errorDataParterns, getDataPartners } = useGetDataPartners();
  const [createDataPartner, setCreateDataPartner] = useState(false);

  // Fetch data partners on initial render
  useEffect(() => {
    getDataPartners();
  }, [getDataPartners]);

  // Set search params when selectedPartner changes
  useEffect(() => {
    if (selectedPartner) {
      setSearchParams({ partnerId: selectedPartner.id });
    } else {
      setSearchParams({});
    }
  }, [selectedPartner, setSearchParams]);

  // Handle loading selectedPartner based on URL param after data partners are fetched
  useEffect(() => {
    const partnerId = searchParams.get('partnerId');
    if (partnerId && dataPartnersMemo.length > 0) {
      const partner = dataPartnersMemo.find((p) => p.id === parseInt(partnerId, 10));
      if (partner) {
        setSelectedPartner(partner);
      } else {
        setSelectedPartner(null);
      }
    }
  }, [searchParams, dataPartnersMemo]);

  return (
    <Segment padded style={{ height: '80h' }}>
      <Grid>
        <Grid.Row>
          <Header>Data Partners: {selectedPartner ? selectedPartner.data_partner_name : null}</Header>
        </Grid.Row>
        <Grid.Column width={8}>
          {errorDataParterns ? <h3>Error...</h3> : null}
          {!loadingDataPartners && !errorDataParterns ? (
            <Grid.Row width={16}>
              <DataPartnerSelect
                data_partners={dataPartnersMemo}
                setSelectedPartner={setSelectedPartner}
                setCreateDataPartner={setCreateDataPartner}
              />
            </Grid.Row>
          ) : (
           null
          )}
          {createDataPartner ?
            <DataPartnerCreateForm setSelectedPartner={setSelectedPartner}/>:
            <Segment>
              <Button style={{ marginBottom: '1rem' }} onClick={()=> setCreateDataPartner(true)}>New Partner</Button>
              <Grid.Column width={6}>
                {selectedPartner !== null ?
                  (<DataPartnerEditForm
                    selectedPartner={selectedPartner}
                    setSelectedPartner={setSelectedPartner}
                    />) : null}
              </Grid.Column>
            </Segment>
            }
        </Grid.Column>
        <Grid.Column width={8}>
          <BrandsManagment
            selectedPartner={selectedPartner}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default DataPartnerManagment;
