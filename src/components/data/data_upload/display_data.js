import { Button, Table } from 'semantic-ui-react';


function DiplayData({ fileData, handleUpload }) {
    return (
        <div>
            <div style={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {fileData.length > 0 && fileData[0].map((cell, index) => (
                                <Table.HeaderCell key={index}>{cell}</Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {fileData.slice(1).map((row, rowIndex) => (
                            <Table.Row key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <Table.Cell key={cellIndex}>{cell}</Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Button onClick={handleUpload}>Upload Data</Button>
            </div>
        </div>

    );
}

export default DiplayData;
