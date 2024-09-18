import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; // Material-UI TextField bileşeni
import Button from '@mui/material/Button'; // Material-UI Button bileşeni
import Stack from '@mui/material/Stack'; // Material-UI Stack bileşeni

const CategoryForm = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      description
    };

    // Veriyi parent bileşene gönder
    onAddCategory(categoryData);

    // Formu temizle
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '40px', marginBottom: '40px'}}> {/* AppBar ile arasına boşluk ekleyin */}
      <Stack spacing={2} style={{ maxWidth: '300px', margin: 'auto' }}>
        <TextField
          label="Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          KATEGORİ EKLE
        </Button>
      </Stack>
    </form>
  );
};

export default CategoryForm;
