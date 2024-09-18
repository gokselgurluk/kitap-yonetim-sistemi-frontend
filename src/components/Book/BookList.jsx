// BookList.jsx

import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import TableComponent from './TableComponent'; // Reusable TableComponent
import UpdateModal from './UpdateModal'; // Reusable UpdateModal

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch books (replace with actual API call)
  useEffect(() => {
    // Example data; replace with actual data fetching
    setBooks([
      { id: 1, name: 'Book One', establishmentYear: '2020', address: 'Address One' },
      { id: 2, name: 'Book Two', establishmentYear: '2021', address: 'Address Two' },
    ]);
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    setModalOpen(false);
  };

  return (
    <Box>
      <Paper style={{ padding: 20 }}>
        <TableComponent
          rows={books}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onSearch={(id) => {
            // Implement search functionality
          }}
        />
      </Paper>
      <UpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedBook}
        onUpdateCategory={handleUpdateBook}
      />
    </Box>
  );
};

export default BookList;
