import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, Typography, Stack, TextField, useTheme } from '@mui/material';

const UpdateModal = ({ isOpen, onClose, purchase, onUpdatePurchase }) => {
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowingDate, setBorrowingDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const theme = useTheme(); // Temayı almak için

  useEffect(() => {
    if (purchase) {
      setBorrowerName(purchase.borrowerName || '');
      setBorrowingDate(purchase.borrowingDate || '');
      setReturnDate(purchase.returnDate || '');
    }
  }, [purchase]);

  const handleUpdate = () => {
    onUpdatePurchase({
      ...purchase,
      borrowerName,
      borrowingDate,
      returnDate,
    });
  };

  const modalStyles = {
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
      zIndex: 1000,
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" component="h2">
          Güncelle
        </Typography>
        <TextField
          label="Ödünç Alanın Adı"
          variant="outlined"
          fullWidth
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
        />
        <TextField
          label="Ödünç Alma Tarihi (YYYY-MM-DD)"
          type="text"
          fullWidth
          value={borrowingDate}
          onChange={(e) => setBorrowingDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          variant="outlined"
        />
        <TextField
          label="İade Tarihi (YYYY-MM-DD)"
          type="text"
          fullWidth
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          variant="outlined"
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Güncelle
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Kapat
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default UpdateModal;
