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
        {/* Search Section */}
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

        {/* Table Section */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >ID</TableCell>
              <TableCell>Adı</TableCell>
              <TableCell>E-Posta</TableCell>
              <TableCell width="100px">Alım Tarihi</TableCell>
              <TableCell width="100px">Iade Tarihi</TableCell>
              <TableCell>Kitap Adı</TableCell>
              <TableCell width="70px" >Yayın Yılı</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Yazar</TableCell>
              <TableCell>Yayımcı</TableCell>
              <TableCell>Kategoriler</TableCell>
              <TableCell>Eylemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.borrowerName}</TableCell>
                  <TableCell>{row.borrowerMail}</TableCell>
                  <TableCell>{row.borrowingDate}</TableCell>
                  <TableCell>{row.returnDate || 'Not returned'}</TableCell>
                  <TableCell>{row.book ? row.book.name : 'Unknown'}</TableCell>
                  <TableCell>{row.book ? row.book.publicationYear : 'N/A'}</TableCell>
                  <TableCell>{row.book ? row.book.stock : 'N/A'}</TableCell>
                  <TableCell>{row.book?.author ? row.book.author.name : 'Unknown'}</TableCell>
                  <TableCell>{row.book?.publisher ? row.book.publisher.name : 'Unknown'}</TableCell>
                  <TableCell>
                    {row.book?.categories
                      ? row.book.categories.map(cat => cat.name).join(', ')
                      : 'No categories'}
                  </TableCell>
                  <TableCell width="100px" >
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
                <TableCell colSpan={12} align="center" >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default TableComponent;
