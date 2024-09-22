import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'; // Material-UI TextField bileşeni
import Button from '@mui/material/Button'; // Material-UI Button bileşeni
import Stack from '@mui/material/Stack'; // Material-UI Stack bileşeni
import MenuItem from '@mui/material/MenuItem'; // Material-UI MenuItem bileşeni
import axios from 'axios'; // HTTP istekleri için axios

const PurchaseForm = ({ onSubmit }) => {
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerMail, setBorrowerMail] = useState('');
  const [borrowingDate, setBorrowingDate] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Kitapları almak için API'ye istek yapma
    axios.get('https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Kitapları alırken bir hata oluştu:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBook) {
      console.error('Lütfen bir kitap seçin.');
      return;
    }

    const purchaseData = {
      borrowerName,
      borrowerMail,
      borrowingDate,
      bookForBorrowingRequest: {
        id: selectedBook.id,
        name: selectedBook.name,
        publicationYear: selectedBook.publicationYear,
        stock: selectedBook.stock,
      },
    };

    // Veriyi parent bileşene gönder
    if (typeof onSubmit === 'function') {
      onSubmit(purchaseData);
    } else {
      console.error('onSubmit fonksiyonu geçilmemiş.');
    }

    // Formu temizle
    setBorrowerName('');
    setBorrowerMail('');
    setBorrowingDate('');
    setSelectedBook(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '40px', marginBottom: '40px' }}>
      <Stack spacing={2} style={{ maxWidth: '500px', margin: 'auto' }}>
        <TextField
          label="Ödünç Alanın Adı"
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
          required
        />
        <TextField
          label="Ödünç Alanın E-Posta Adresi"
          type="email"
          value={borrowerMail}
          onChange={(e) => setBorrowerMail(e.target.value)}
          required
        />
        <TextField
          label="Ödünç Alma Tarihi (YYYY-DD-MM)"
          type="text"
          value={borrowingDate}
          onChange={(e) => setBorrowingDate(e.target.value)}
          required
          placeholder="YYYY-DD-MM"
        />
        <TextField
          select
          label="Kitap Seçin"
          value={selectedBook ? selectedBook.id : ''}
          onChange={(e) => {
            const bookId = e.target.value;
            const book = books.find(b => b.id === parseInt(bookId));
            setSelectedBook(book);
          }}
          required
        >
          {books.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.name} (Stok: {book.stock})
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          KAYDET
        </Button>
      </Stack>
    </form>
  );
};

export default PurchaseForm;
