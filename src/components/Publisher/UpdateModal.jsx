import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

Modal.setAppElement('#root');

const UpdateModal = ({ isOpen, onClose, publisher, onUpdatePublisher }) => {
  const [name, setName] = useState('');
  const [establishmentYear, setEstablishmentYear] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (publisher) {
      setName(publisher.name);
      setEstablishmentYear(publisher.establishmentYear);
      setAddress(publisher.address);
    }
  }, [publisher]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPublisher = {
      id: publisher.id, // ID'yi dahil et
      name,
      establishmentYear: parseInt(establishmentYear),
      address
    };

    onUpdatePublisher(updatedPublisher);
  };

  const theme = useTheme();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Yayınevi Güncelleme Modalı"
      style={{
        content: {
          color: theme.palette.text.primary,
          textAlign: 'center',
          maxWidth: '500px',
          maxHeight: '350px',
          margin: 'auto',
          padding: '20px',
          overflow: 'auto',
          borderRadius: '20px',
          fontSize: '16px',
          backgroundColor: theme.palette.background.paper,
          zIndex: 1000
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000
        }
      }}
    >
      <h2>Yayınevi Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} style={{ maxWidth: '400px', margin: 'auto' }}>
          <TextField
            label="Yayın Evi Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            variant="outlined" // Ensure proper display of the label
          />
          <TextField
            label="Kuruluş Yılı"
            type="number"
            value={establishmentYear}
            onChange={(e) => setEstablishmentYear(e.target.value)}
            required
            fullWidth
            variant="outlined" // Ensure proper display of the label
          />
          <TextField
            label="Adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            fullWidth
            variant="outlined" // Ensure proper display of the label
          />
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Güncelle
            </Button>
            <Button type="button" onClick={onClose} variant="outlined" color="secondary">
              Kapat
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateModal;
