import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '../components/Book/TableComponent';
import UpdateModal from '../components/Book/UpdateModal';
import BookForm from '../components/Book/BookForm';
import ModalComponent from '../components/ModalComponent';

const API_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/books';
const AUTHORS_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/authors';
const PUBLISHERS_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/publishers';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

  // Kitapları getir
  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      const sortedBooks = response.data.sort((a, b) => a.id - b.id);
      setBooks(sortedBooks);
      setFilteredBooks(sortedBooks);
    } catch (error) {
      console.error('Kitaplar alınırken hata oluştu:', error);
      setModalMessage('Kitaplar alınırken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  // Yazarlar ve yayınevlerini getir
  const fetchAuthorsAndPublishers = async () => {
    try {
      const [authorsResponse, publishersResponse] = await Promise.all([
        axios.get(AUTHORS_URL),
        axios.get(PUBLISHERS_URL)
      ]);

      setAuthors(authorsResponse.data || []); // Yazarları yükle
      setPublishers(publishersResponse.data || []); // Yayınevlerini yükle
    } catch (error) {
      console.error('Yazarlar ve yayınevleri alınırken hata oluştu:', error);
      setModalMessage('Yazarlar ve yayınevleri alınırken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthorsAndPublishers();
  }, []);

  // Kitap ekleme işlemi
  const handleAddBook = async (newBook) => {
    try {
      await axios.post(API_URL, newBook);
      setModalMessage('Kitap başarıyla eklendi!');
      setModalType('success');
      setModalIsOpen(true);
      fetchBooks(); // Kitap listesini güncelle
    } catch (error) {
      console.error('Kitap eklenirken hata oluştu:', error);
      setModalMessage('Kitap eklenirken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  // Kitap güncelleme işlemi
  const handleUpdateBook = async (updatedBook) => {
    try {
      await axios.put(`${API_URL}/${updatedBook.id}`, updatedBook);
      setModalMessage('Kitap başarıyla güncellendi!');
      setModalType('success');
      setModalIsOpen(true);
      setIsUpdateModalOpen(false); // Modalı kapat
      fetchBooks(); // Kitap listesini güncelle
    } catch (error) {
      console.error('Kitap güncellenirken hata oluştu:', error);
      setModalMessage('Kitap güncellenirken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  // Kitap silme işlemi
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${API_URL}/${bookId}`);
      setModalMessage('Kitap başarıyla silindi!');
      setModalType('success');
      setModalIsOpen(true);
      fetchBooks(); // Kitap listesini güncelle
    } catch (error) {
      console.error('Kitap silinirken hata oluştu:', error);
      setModalMessage('Kitap silinirken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  // Düzenleme butonuna tıklayınca tetiklenen fonksiyon
  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsUpdateModalOpen(true); // Düzenleme modunu aç
  };

  return (
    <div>
      <h1>Kitap Yönetimi</h1>

      {/* Kitap ekleme formu */}
      <BookForm
        onAddBook={handleAddBook}
        authors={authors}
        publishers={publishers}
      />

      {/* Kitap listesi tablosu */}
      {books.length > 0 ? (
        <TableComponent
          books={filteredBooks}
          onDeleteBook={handleDeleteBook}
          onEditBook={handleEditClick}
        />
      ) : (
        <p>Kitap bulunamadı.</p>
      )}

      {/* Kitap güncelleme modali */}
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        book={selectedBook}
        onUpdateBook={handleUpdateBook}
        authors={authors}
        publishers={publishers}
      />

      {/* Genel başarı/hata mesajları için modal */}
      <ModalComponent
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default BookPage;
