import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { TextField, Button, Stack, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const UpdateModal = ({ isOpen, onClose, book, onUpdateBook, authors, publishers, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    publicationYear: '',
    stock: '',
    author: '',
    publisher: '',
    categories: []
  });

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name || '',
        publicationYear: book.publicationYear || '',
        stock: book.stock || '',
        author: book.author ? book.author.id : '',
        publisher: book.publisher ? book.publisher.id : '',
        categories: book.categories.map(category => category.id) || []
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...book,
      name: formData.name,
      publicationYear: formData.publicationYear,
      stock: formData.stock,
      author: authors.find(a => a.id === formData.author) || null,
      publisher: publishers.find(p => p.id === formData.publisher) || null,
      categories: formData.categories.map(categoryId => categories.find(c => c.id === categoryId))
    };
    onUpdateBook(updatedBook);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          textAlign: 'center',
          maxWidth: '500px',
          maxHeight: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          zIndex: 1000,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000
        }
      }}
      ariaHideApp={false}
    >
      <h2>Kitabı Güncelle</h2>
      <form onSubmit={handleUpdate}>
        <Stack spacing={2}>
          <TextField
            label="Kitap Adı"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Yayın Yılı"
            name="publicationYear"
            type="number"
            value={formData.publicationYear}
            onChange={handleChange}
            required
          />
          <TextField
            label="Stok"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <FormControl fullWidth required>
            <InputLabel>Yazar</InputLabel>
            <Select
              name="author"
              value={formData.author}
              onChange={handleChange}
              label="Yazar"
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Yayınevi</InputLabel>
            <Select
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              label="Yayınevi"
            >
              {publishers.map((publisher) => (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel>Kategoriler</InputLabel>
            <Select
              multiple
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              label="Kategoriler"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100px' }}
            >
              Güncelle
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              sx={{ width: '100px' }}
            >
              Kapat
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateModal;
