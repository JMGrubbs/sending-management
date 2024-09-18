import React, { useEffect, useState } from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { useSearchParams } from 'react-router-dom';

import BrandEditForm from './brand_edit_form'
import BrandCreateForm from './brand_create_form';

import useGetBrands from '../../../hooks/brands/useGetBrands';
import useDeleteBrands from '../../../hooks/brands/useDeleteBrands';
import useCreateBrand from '../../../hooks/brands/useCreateBrand'

function BrandsManagment({ selectedPartner }) {
    const { getBrands, brandsMemo, loadingBrands, errorBrands } = useGetBrands();
    const { newBrandMemo, errorNewBrand, createBrand } = useCreateBrand()
    const [localBrands, setLocalBrands] = useState([]);
    const { deleteBrands } = useDeleteBrands()
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brandSelected, setBrandSelected] = useState(false);
    const [createNewBrand, setCreateNewBrand] = useState(false)

    useEffect(()=>{
        setSelectedBrand(newBrandMemo || null)
    }, [newBrandMemo, setSelectedBrand])

    useEffect(() => {
        if (selectedPartner) {
            getBrands({"data_partner_id": selectedPartner.id});
        }
    }, [selectedPartner, getBrands, newBrandMemo]);

    useEffect(() => {
        setLocalBrands(brandsMemo);
    }, [brandsMemo]);

    useEffect(()=>{
        if (selectedPartner) {
            setSearchParams({ partnerId: selectedPartner.id });
          }
    }, [selectedPartner, setSearchParams])

    useEffect(() => {
        if (selectedPartner) {
            const updatedBrands = brandsMemo.filter(brand => brand.data_partner_id === selectedPartner.id);
            setLocalBrands(updatedBrands);
        } else {
            setLocalBrands(brandsMemo);
        }
    }, [brandsMemo, selectedPartner]);

    const handleEdit = (brand) => {
        setSelectedBrand(brand);
        setBrandSelected(true);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            await deleteBrands(selectedBrand.id);
            let removeFromLocal = localBrands.filter((brand)=> brand.id !== selectedBrand.id)
            setLocalBrands(removeFromLocal)
            setBrandSelected(false)
            setSelectedBrand(null);
        }
    };

    return (
        <Segment>
            {createNewBrand? <BrandCreateForm
                selectedPartner={selectedPartner}
                setSelectedBrand={setSelectedBrand}
                setCreateNewBrand={setCreateNewBrand}
                createBrand={createBrand}/> : (<>
                    <Grid.Column>
                    {!brandSelected ?
                        (<>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={11} className="column-header">Brand Name</Grid.Column>
                                    <Grid.Column width={5} className="column-header">Actions</Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Segment className="summaries-list-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                <Grid>
                                    {errorBrands && <h3>ERROR LOADING...</h3>}
                                    {!loadingBrands && selectedPartner && localBrands.map((brand, index) => (
                                        <Grid.Row key={index}>
                                            <Grid.Column width={11}>{brand.brand_name}</Grid.Column>
                                            <Grid.Column width={5}>
                                                <Button color='green' size='small' onClick={() => handleEdit(brand)}>Edit</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    ))}
                                </Grid>
                            </Segment>
                        </>) : (
                            <BrandEditForm selectedBrand={selectedBrand} setSelectedBrand={setBrandSelected} handleDelete={handleDelete}/>
                        )}
                    </Grid.Column>
                    {selectedPartner? <Button style={{margin: '1rem'}} onClick={()=>setCreateNewBrand(true)}>Create Brand</Button>: null}
                </>)}
        </Segment>
    );
}

export default BrandsManagment;
