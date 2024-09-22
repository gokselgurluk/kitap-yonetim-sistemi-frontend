import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PurchaseForm from '../components/Purchase/PurchaseForm';
import TableComponent from '../components/Purchase/TableComponent';
import UpdateModal from '../components/Purchase/UpdateModal';
import ModalComponent from '../components/ModalComponent'; // ModalComponent import edildi

const API_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/borrows';

const PurchasePage = () => {
  const [purchases, setPurchases] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Modal mesajları
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' veya 'error'

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(API_URL);
      setPurchases(response.data);
    } catch (error) {
      console.error('Satın alma verileri alınırken hata oluştu:', error);
      setModalMessage('Satın alma verileri alınırken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  const handleAddPurchase = async (purchaseData) => {
    try {
      await axios.post(API_URL, purchaseData);
      setModalMessage('Kitap başarıyla satın alındı!');
      setModalType('success');
      setModalIsOpen(true);
      fetchPurchases(); // Satın alınan kitaplar listesini güncelle
    } catch (error) {
      console.error('Kitap satın alınırken bir hata oluştu:', error);
      setModalMessage('Kitap satın alınırken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  const handleUpdatePurchase = async (purchaseData) => {
    try {
      await axios.put(`${API_URL}/${purchaseData.id}`, purchaseData);
      setModalMessage('Satın alma işlemi başarıyla güncellendi!');
      setModalType('success');
      setIsUpdateModalOpen(false); // Güncelleme modali kapatıldı
      setModalIsOpen(true);
      fetchPurchases(); // Satın alma işlemleri listesini güncelle
    } catch (error) {
      console.error('Satın alma güncellenirken bir hata oluştu:', error);
      setModalMessage('Satın alma güncellenirken bir hata oluştu.');
      setModalType('error');
      setIsUpdateModalOpen(false); // Güncelleme modali kapatıldı
      setModalIsOpen(true);
    }
  };

  const handleDeletePurchase = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setModalMessage('Satın alma başarıyla silindi!');
      setModalType('success');
      setModalIsOpen(true);
      fetchPurchases(); // Satın alma işlemleri listesini güncelle
    } catch (error) {
      console.error('Satın alma silinirken bir hata oluştu:', error);
      setModalMessage('Satın alma silinirken bir hata oluştu.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  const handleSearchPurchase = async (searchId) => {
    if (!searchId) {
      fetchPurchases(); // Arama yapılmadıysa tüm satın alma işlemlerini göster
    } else {
      try {
        const response = await axios.get(`${API_URL}/${searchId}`);
        if (response.data) {
          setPurchases([response.data]); // ID'ye göre satın alma işlemini göster
        } else {
          setPurchases([]);
        }
      } catch (error) {
        console.error(`Satın alma ${searchId} bulunamadı:`, error);
        setModalMessage(`Satın alma ${searchId} bulunamadı.`);
        setModalType('error');
        setModalIsOpen(true);
      }
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <h1>Kitap Alma</h1>
      <PurchaseForm onSubmit={handleAddPurchase} />
      <TableComponent
        rows={purchases}
        onSearch={handleSearchPurchase}
        onEdit={handleEditPurchase}
        onDelete={handleDeletePurchase}
      />
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        purchase={selectedPurchase}
        onUpdatePurchase={handleUpdatePurchase}
      />
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default PurchasePage;
