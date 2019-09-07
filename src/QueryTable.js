import React from 'react';
//import Table from 'react-bootstrap/Table'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';
import Box from "@material-ui/core/Box";

function QueryTable (props) {
    if(props.data === null || props.data === undefined || props.data.length === 0){
        return null;
    }else {
        // Get keys of data
        const keys = Object.keys(props.data[0]);
        let rows = [];

        // Generate head of table
        let cells = [];
        keys.forEach((name) => cells.push(<TableCell key={name}>{name.toLocaleUpperCase()}</TableCell>));
        const head = <TableRow>{cells}</TableRow>;

        // Fill body of table
        let r = 0, i = 0;
        props.data.forEach((rowData) => {
            cells = [];
            // Fill row
            Object.values(rowData).forEach((value) => {
               cells.push(<TableCell key={`row-${r} cell-${i}`}>{value}</TableCell>);
               i++;
            });
            rows.push(<TableRow key={`row-${r}`}>{cells}</TableRow>);
            i = 0;
            r++;
        });

        return (
            <Box pt={2}>
                <Paper>
                    <Box overflow="auto">
                        <Table>
                            <TableHead>
                                {head}
                            </TableHead>
                            <TableBody>
                                {rows}
                            </TableBody>
                        </Table>
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default QueryTable;