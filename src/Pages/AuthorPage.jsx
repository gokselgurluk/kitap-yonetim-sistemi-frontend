import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorForm from '../components/Author/AuthorForm';
import TableComponent from '../components/Author/TableComponent';
import UpdateModal from '../components/Author/UpdateModal';
import ModalComponent from '../components/ModalComponent';

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' veya 'error'
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  // Tüm yazarları çeker
  const API_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/authors';
  const fetchAuthors = () => {
    axios.get(API_URL)
      .then(response => {
        setAuthors(response.data);
        setFilteredAuthors(response.data); // Başlangıçta tüm yazarlar gösteriliyor
      })
      .catch(error => {
        console.error('Yazarları alırken bir hata oluştu:', error);
        setModalMessage('Yazarları alırken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  // Yazar ekleme fonksiyonu
  const handleAddAuthor = (authorData) => {
    axios.post(API_URL, authorData)
      .then(() => {
        setModalMessage('Yazar başarıyla eklendi!');
        setModalType('success');
        setModalIsOpen(true);
        fetchAuthors(); // Yazarları tekrar çek
      })
      .catch(error => {
        console.error('Yazar eklenirken bir hata oluştu:', error);
        setModalMessage('Yazar eklenirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  // Yazar güncelleme fonksiyonu
  const handleUpdateAuthor = (authorData) => {
    axios.put(`${API_URL}/${authorData.id}`, authorData)
      .then(() => {
        setModalMessage('Yazar başarıyla güncellendi!');
        setModalType('success');
        setUpdateModalIsOpen(false); // Modal'ı kapat
        setModalIsOpen(true);
        fetchAuthors();
      })
      .catch(error => {
        console.error('Yazar güncellenirken bir hata oluştu:', error);
        setModalMessage('Yazar güncellenirken bir hata oluştu.');
        setModalType('error');
        setUpdateModalIsOpen(false); // Modal'ı kapat
        setModalIsOpen(true);
      });
  };

  // Yazar silme fonksiyonu
  const handleDeleteAuthor = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setModalMessage('Yazar başarıyla silindi!');
        setModalType('success');
        setModalIsOpen(true);
        fetchAuthors(); // Yazarları tekrar çek
      })
      .catch(error => {
        console.error('Yazar silinirken bir hata oluştu:', error);
        setModalMessage('Yazar silinirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  // Yazar arama fonksiyonu
  const handleSearchAuthor = (id) => {
    if (!id) {
      setFilteredAuthors(authors); // ID girilmemişse tüm yazarları göster
      return;
    }

    axios.get(`${API_URL}/${id}`)
      .then(response => {
        if (response.data) {
          setFilteredAuthors([response.data]); // ID'ye göre yazarı göster
        } else {
          setFilteredAuthors([]);
        }
      })
      .catch(error => {
        console.error(`Yazar ${id} bulunamadı:`, error);
        setModalMessage(`Yazar ${id} bulunamadı.`);
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
    setUpdateModalIsOpen(true);
  };

  return (
    <div>
      {/* Yazar ekleme formu */}
      <AuthorForm onAddAuthor={handleAddAuthor} />
      
      {/* Yazarları listeleyen tablo ve arama alanı */}
      <TableComponent
        rows={filteredAuthors}
        onSearch={handleSearchAuthor}
        onDelete={handleDeleteAuthor}
        onEdit={handleEditAuthor}
      />
      
      {/* Modal mesajları */}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />

      {/* Güncelleme Modalı */}
      {selectedAuthor && (
        <UpdateModal
          isOpen={updateModalIsOpen}
          onClose={closeUpdateModal}
          author={selectedAuthor}
          onUpdateAuthor={handleUpdateAuthor}
        />
      )}
    </div>
  );
};

export default AuthorPage;
