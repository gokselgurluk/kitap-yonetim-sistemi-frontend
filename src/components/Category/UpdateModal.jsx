import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField'; // Material-UI TextField bileşeni
import Button from '@mui/material/Button'; // Material-UI Button bileşeni
import Stack from '@mui/material/Stack'; // Material-UI Stack bileşeni
import { useTheme } from '@mui/material/styles'; // Material-UI tema kancası

const UpdateModal = ({ isOpen, onClose, category, onUpdateCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const theme = useTheme(); // Tema kullanımı
  
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = {
      id: category.id,
      name,
      description
    };

    onUpdateCategory(updatedCategory);
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
          boxShadow: theme.shadows[5],
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000
        }
      }}
    >
      <h2>Kategoriyi Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} style={{ maxWidth: '400px', margin: 'auto' }}>
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
