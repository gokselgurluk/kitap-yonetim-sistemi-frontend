import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublisherForm from '../components/Publisher/PublisherForm';
import TableComponent from '../components/Publisher/TableComponent';
import UpdateModal from '../components/Publisher/UpdateModal';
import ModalComponent from '../components/ModalComponent';

const PublisherPage = () => {
  const [publishers, setPublishers] = useState([]);
  const [filteredPublishers, setFilteredPublishers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' veya 'error'
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  // API URL'sini güncelleyin
  const API_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/publishers'; // Buraya gerçek API URL'sini yerleştirin

  // Tüm yayınevlerini çeker
  const fetchPublishers = () => {
    axios.get(API_URL)
      .then(response => {
        setPublishers(response.data);
        setFilteredPublishers(response.data); // Başlangıçta tüm yayınevleri gösteriliyor
      })
      .catch(error => {
        console.error('Yayınevlerini alırken bir hata oluştu:', error);
        setModalMessage('Yayınevlerini alırken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  // Yayımcı ekleme fonksiyonu
  const handleAddPublisher = (publisherData) => {
    axios.post(API_URL, publisherData)
      .then(() => {
        setModalMessage('Yayımcı başarıyla eklendi!');
        setModalType('success');
        setModalIsOpen(true);
        fetchPublishers(); // Yayınevlerini tekrar çek
      })
      .catch(error => {
        console.error('Yayınevi eklenirken bir hata oluştu:', error);
        setModalMessage('Yayınevi eklenirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  // Yayımcı güncelleme fonksiyonu
  const handleUpdatePublisher = (publisherData) => {
    axios.put(`${API_URL}/${publisherData.id}`, publisherData)
      .then(() => {
        setModalMessage('Yayınevi başarıyla güncellendi!');
        setModalType('success');
        setUpdateModalIsOpen(false); // Modal'ı kapat
        setModalIsOpen(true);
        fetchPublishers();
      })
      .catch(error => {
        console.error('Yayınevi güncellenirken bir hata oluştu:', error);
        setModalMessage('Yayınevi güncellenirken bir hata oluştu.');
        setModalType('error');
        setUpdateModalIsOpen(false); // Modal'ı kapat
        setModalIsOpen(true);
      });
  };

  // Yayımcı silme fonksiyonu
  const handleDeletePublisher = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setModalMessage('Yayımcı başarıyla silindi!');
        setModalType('success');
        setModalIsOpen(true);
        fetchPublishers(); // Yayınevlerini tekrar çek
      })
      .catch(error => {
        console.error('Yayınevi silinirken bir hata oluştu:', error);
        setModalMessage('Yayınevi silinirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  // Yayımcı arama fonksiyonu
  const handleSearchPublisher = (id) => {
    if (!id) {
      setFilteredPublishers(publishers); // ID girilmemişse tüm yayınevlerini göster
      return;
    }

    axios.get(`${API_URL}/${id}`)
      .then(response => {
        if (response.data) {
          setFilteredPublishers([response.data]); // ID'ye göre yayınevini göster
        } else {
          setFilteredPublishers([]);
        }
      })
      .catch(error => {
        console.error(`Yayınevi ${id} bulunamadı:`, error);
        setModalMessage(`Yayınevi ${id} bulunamadı.`);
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleEditPublisher = (publisher) => {
    setSelectedPublisher(publisher);
    setUpdateModalIsOpen(true);
  };

  return (
    <div>
      {/* Yayımcı ekleme formu */}
      <PublisherForm onAddPublisher={handleAddPublisher} />
      
      {/* Yayımcıları listeleyen tablo ve arama alanı */}
      <TableComponent
        rows={filteredPublishers}
        onSearch={handleSearchPublisher}  
        onDeletePublisher={handleDeletePublisher}
        onEditPublisher={handleEditPublisher} // Düzenleme butonuna tıklama işlevi
      />
      
      {/* Modal mesajları */}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />

      {/* Güncelleme Modalı */}
      {selectedPublisher && (
        <UpdateModal
          isOpen={updateModalIsOpen}
          onClose={closeUpdateModal}
          publisher={selectedPublisher}
          onUpdatePublisher={handleUpdatePublisher}
        />
      )}
    </div>
  );
};

export default PublisherPage;
