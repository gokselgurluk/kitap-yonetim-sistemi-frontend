import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField'; // Material-UI TextField bileşeni
import Button from '@mui/material/Button'; // Material-UI Button bileşeni
import Stack from '@mui/material/Stack'; // Material-UI Stack bileşeni
import { useTheme } from '@mui/material/styles'; // Material-UI tema kancası

const UpdateModal = ({ isOpen, onClose, author, onUpdateAuthor }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  
  const theme = useTheme(); // Tema kullanımı
  
  useEffect(() => {
    if (author) {
      setName(author.name);
      setBirthDate(author.birthDate);
      setCountry(author.country);
    }
  }, [author]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAuthor = {
      id: author.id,
      name,
      birthDate,
      country
    };

    onUpdateAuthor(updatedAuthor);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          color: theme.palette.text.primary,
          textAlign: 'center',
          maxWidth: '500px',
          maxHeight: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5], // Temadan arka plan rengi al
          zIndex: 1200 // Yüksek bir zIndex değeri seçilmesi, diğer bileşenlerle uyumlu olabilir
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000
        }
      }}
    >
      <h2>Yazarı Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} style={{ maxWidth: '400px', margin: 'auto' }}>
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
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Güncelle
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Kapat
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateModal;
