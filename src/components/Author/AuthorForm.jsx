import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; // Material-UI TextField bileşeni
import Button from '@mui/material/Button'; // Material-UI Button bileşeni
import Stack from '@mui/material/Stack'; // Material-UI Stack bileşeni

const AuthorForm = ({ onAddAuthor }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const authorData = {
      name,
      birthDate,
      country
    };

    // Veriyi parent bileşene gönder
    onAddAuthor(authorData);

    // Formu temizle
    setName('');
    setBirthDate('');
    setCountry('');
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
          label="Doğum Tarihi (YYYY-DD-MM)"
          type="text"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          placeholder="YYYY-DD-MM"
        />
        <TextField
          label="Ülke"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          YAZAR EKLE
        </Button>
      </Stack>
    </form>
  );
};

export default AuthorForm;
