import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const PurchaseForm = ({ onAddPurchase }) => {
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const purchaseData = { bookId, quantity };
    onAddPurchase(purchaseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Kitap ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <TextField
          label="Miktar"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">Satın Al</Button>
      </Stack>
    </form>
  );
};

export default PurchaseForm;
