import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';

const BookForm = ({ onAddBook }) => {
  const [name, setName] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [stock, setStock] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  // API'den mevcut yazarları getir
  const fetchAuthors = async () => {
    try {
      const response = await axios.get('https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Yazarlar alınırken hata oluştu:', error);
    }
  };

  // API'den mevcut yayınevlerini getir
  const fetchPublishers = async () => {
    try {
      const response = await axios.get('https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/publishers');
      setPublishers(response.data);
    } catch (error) {
      console.error('Yayınevleri alınırken hata oluştu:', error);
    }
  };

  // API'den mevcut kategorileri getir
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Kategoriler alınırken hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      name,
      publicationYear: parseInt(publicationYear, 10),
      stock: parseInt(stock, 10),
      author: selectedAuthor,
      publisher: selectedPublisher,
      categories: selectedCategories,
    };

    onAddBook(newBook);

    // Formu temizle
    setName('');
    setPublicationYear('');
    setStock('');
    setSelectedAuthor('');
    setSelectedPublisher('');
    setSelectedCategories([]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '40px', marginBottom: '40px'}}>
      <Box display="flex" flexDirection="column" gap={2} style={{ maxWidth: '300px', margin: 'auto' }} >
        <TextField
          label="Kitap Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Yayın Yılı"
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        />
        <TextField
          label="Stok"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        {/* Yazar Seçimi */}
       
        <FormControl required>
        <InputLabel >Yazar</InputLabel>
          <Select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Yayınevi Seçimi */}
        <FormControl required>
          <InputLabel>Yayınevi</InputLabel>
          <Select
          
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
          >
            {publishers.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Kategori Seçimi */}
        <FormControl required>
          <InputLabel>Kategoriler</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Kitap Ekle
        </Button>
      </Box>
    </form>
  );
};

export default BookForm;
