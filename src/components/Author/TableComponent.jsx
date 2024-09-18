// TableComponent.jsx

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField, Button, Box, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableComponent = ({ rows, onDelete, onEdit, onSearch }) => {
  const [searchId, setSearchId] = useState('');

  const handleSearch = () => {
    onSearch(searchId);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" marginBottom={2}>
          <TextField
            label="Search by ID"
            variant="outlined"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>İsim</TableCell>
              <TableCell>Doğum Tarihi</TableCell>
              <TableCell>Ülke</TableCell>
              <TableCell>Eylemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.birthDate}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(row)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(row.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default TableComponent;
