import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '../components/Book/TableComponent';
import UpdateModal from '../components/Book/UpdateModal';
import BookForm from '../components/Book/BookForm';
import ModalComponent from '../components/ModalComponent';

const API_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/books';
const AUTHORS_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/authors';
const PUBLISHERS_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/publishers';
const CATEGORIES_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/categories'; // Kategoriler API'si

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Modal mesajları
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' veya 'error'

  // Yazarlar, yayınevleri ve kategoriler
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]); // Kategoriler için state

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

  const fetchAuthorsAndPublishers = async () => {
    try {
      const [authorsResponse, publishersResponse] = await Promise.all([
        axios.get(AUTHORS_URL),
        axios.get(PUBLISHERS_URL)
      ]);

      setAuthors(authorsResponse.data);
      setPublishers(publishersResponse.data);
    } catch (error) {
      console.error('Yazarlar ve yayınevleri alınırken hata oluştu:', error);
      setModalMessage('Yazarlar ve yayınevleri alınırken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Kategoriler alınırken hata oluştu:', error);
      setModalMessage('Kategoriler alınırken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchAuthorsAndPublishers();
    fetchCategories(); // Kategorileri de al
  }, []);

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

  const handleUpdateBook = async (updatedBook) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedBook.id}`, updatedBook);
      if (response.status === 200) {
        setModalMessage('Kitap başarıyla güncellendi!');
        setModalType('success');
        setIsUpdateModalOpen(false);
        setModalIsOpen(true);
        fetchBooks(); // Kitap listesini güncelle
      } else {
        setModalMessage('Kitap güncellenirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Kitap güncellenirken hata oluştu:', error);
      setModalMessage('Kitap güncellenirken bir hata oluştu.');
      setModalType('error');
      setIsUpdateModalOpen(false);
      setModalIsOpen(true);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
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

  const handleSearchBook = (searchId) => {
    try {
      if (!searchId) {
        setFilteredBooks(books);
      } else {
        const filtered = books.filter(book => book.id.toString() === searchId);
        setFilteredBooks(filtered);

        if (filtered.length === 0) {
          setModalMessage(`Kitap ${searchId} bulunamadı.`);
          setModalType('error');
          setModalIsOpen(true);
        }
      }
    } catch (error) {
      console.error('Kitap arama sırasında bir hata oluştu:', error);
      setModalMessage('Kitap arama sırasında bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Kitaplar</h1>
      <BookForm onAddBook={handleAddBook} />
      <TableComponent
        rows={filteredBooks}
        onSearch={handleSearchBook}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />
      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          book={selectedBook}
          onUpdateBook={handleUpdateBook}
          authors={authors}
          publishers={publishers}
          categories={categories} // Kategorileri geçir
        />
      )}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default BookPage;
