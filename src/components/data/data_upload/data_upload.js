import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Segment, Dropdown } from 'semantic-ui-react';
import { fetchDataPartners, uploadCSVData } from '../../../services/data_partners_api';
import { useDropzone } from 'react-dropzone';
import DiplayData from './display_data';
import SelectCSV from './select_csv';

function DataUpload() {
    const { partner_id } = useParams();
    const navigate = useNavigate();
    const [selectedPartner, setSelectedPartner] = useState(partner_id || '');
    const [partners, setPartners] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileData, setFileData] = useState([]);

    useState(() => {
        fetchDataPartners().then(data => setPartners(data.map(partner => ({
            key: partner.id,
            text: partner.data_partner_name,
            value: partner.id,
        }))));
        if (partner_id) {
            setSelectedPartner(partner_id);
        }
    }, [partner_id]);

    useEffect(() => {
        if (selectedPartner) {
            navigate(`/data/upload/${selectedPartner}`);
        }
    }, [selectedPartner, navigate]);

    const handlePartnerChange = (e, { value }) => {
        setSelectedPartner(value);
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const rows = content.split('\n').map(row => row.split(','));
            setFileData(rows);
        };
        reader.readAsText(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = () => {
        uploadCSVData(selectedPartner, uploadedFile);
        setFileData([]);
    }

    return (
        <Segment padded>
            <h2>Data Manager</h2>
            <Grid>
                <Grid.Column width={8}>
                    <label>Partners:</label>
                    <br />
                    <Dropdown
                        placeholder='Select or search for a partner...'
                        fluid
                        search
                        selection
                        options={partners}
                        value={selectedPartner}
                        onChange={handlePartnerChange}
                    />
                    <br />
                </Grid.Column>
                <Grid.Column width={8}>
                    <SelectCSV getRootProps={getRootProps} getInputProps={getInputProps} />
                    {uploadedFile && (
                        <p>Uploaded file: {uploadedFile.name}</p>
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    <h2>File Data</h2>
                    {fileData.length > 0 ? (
                        <DiplayData fileData={fileData} handleUpload={handleUpload} />
                    ) : (
                        <span>Upload a file</span>
                    )}
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default DataUpload;
