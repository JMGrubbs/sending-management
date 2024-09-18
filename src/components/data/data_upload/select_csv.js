import React from 'react';

function SelectCSV({ getRootProps, getInputProps }) {


    return (
        <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a CSV file here, or click to select one</p>
        </div>
    );
}

export default SelectCSV;
