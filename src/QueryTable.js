import React from 'react';
import Table from 'react-bootstrap/Table'

function QueryTable (props) {
    if(props.data === null){
        return null;
    }else {
        // Get keys of data
        const keys = Object.keys(props.data[0]);
        let rows = [];

        // Generate head of table
        let cells = [];
        keys.forEach((name) => cells.push(<th key={name}>{name}</th>));
        const head = <tr>{cells}</tr>;

        // Fill body of table
        let r = 0, i = 0;
        props.data.forEach((rowData) => {
            cells = [];
            // Fill row
            Object.values(rowData).forEach((value) => {
               cells.push(<td key={`row-${r} cell-${i}`}>{value}</td>);
               i++;
            });
            rows.push(<tr key={`row-${r}`}>{cells}</tr>);
            i = 0;
            r++;
        });

        return (
            <Table striped hover borderless size='sm'>
                <thead>
                    {head}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }
}

export default QueryTable;