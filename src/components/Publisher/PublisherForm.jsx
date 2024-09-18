import React, { useState } from 'react';
import axios from 'axios';
import ModalComponent from '../ModalComponent'; // Modal bileşeni import et
import TextField from '@mui/material/TextField'; // Material-UI TextField bileşeni
import Button from '@mui/material/Button'; // Material-UI Button bileşeni
import Stack from '@mui/material/Stack'; // Material-UI Stack bileşeni

const PublisherForm = ({ onAddPublisher }) => {
  const [name, setName] = useState('');
  const [establishmentYear, setEstablishmentYear] = useState('');
  const [address, setAddress] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' veya 'error'

  const handleSubmit = (e) => {
    e.preventDefault();

    const publisherData = {
      name,
      establishmentYear: parseInt(establishmentYear), // Yıl sayısal olmalı
      address
    };

    onAddPublisher(publisherData); // onAddPublisher fonksiyonunu çağır
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

 
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '40px', marginBottom: '40px'}}> {/* AppBar ile arasına boşluk ekleyin */}
      <Stack spacing={2} style={{ maxWidth: '300px', margin: 'auto' }}>
        <TextField
          label="Yayın Evi Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Kuruluş Yılı"
          type="number"
          value={establishmentYear}
          onChange={(e) => setEstablishmentYear(e.target.value)}
          required
        />
        <TextField
          label="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Yayın Evi Ekle
        </Button>
      </Stack>

      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />
    </form>
  );
};

export default PublisherForm;
