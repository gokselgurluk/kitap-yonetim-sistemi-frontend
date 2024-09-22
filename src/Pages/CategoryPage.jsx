import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from '../components/Category/CategoryForm';
import TableComponent from '../components/Category/TableComponent';
import UpdateModal from '../components/Category/UpdateModal'; // Doğru yolu kontrol edin
import ModalComponent from '../components/ModalComponent';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' veya 'error'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const API_URL = 'https://kitap-yonetim-sistemi-backend.onrender.com/api/v1/categories';

  const fetchCategories = () => {
    axios.get(API_URL)
      .then(response => {
        setCategories(response.data);
        setFilteredCategories(response.data); // Başlangıçta tüm kategoriler gösteriliyor
      })
      .catch(error => {
        console.error('Kategorileri alırken bir hata oluştu:', error);
        setModalMessage('Kategorileri alırken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  const handleAddCategory = (categoryData) => {
    axios.post(API_URL, categoryData)
      .then(() => {
        setModalMessage('Kategori başarıyla eklendi!');
        setModalType('success');
        setModalIsOpen(true);
        fetchCategories(); // Kategorileri tekrar çek
      })
      .catch(error => {
        console.error('Kategori eklenirken bir hata oluştu:', error);
        setModalMessage('Kategori eklenirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  const handleUpdateCategory = (categoryData) => {
    axios.put(`${API_URL}/${categoryData.id}`, categoryData)
      .then(() => {
        setModalMessage('Kategori başarıyla güncellendi!');
        setModalType('success');
        setUpdateModalIsOpen(false); // Modal'ı kapat
        setModalIsOpen(true);
        fetchCategories();
      })
      .catch(error => {
        console.error('Kategori güncellenirken bir hata oluştu:', error);
        setModalMessage('Kategori güncellenirken bir hata oluştu.');
        setModalType('error');
        setUpdateModalIsOpen(false); // Modal'ı kapat
        setModalIsOpen(true);
      });
  };

  const handleDeleteCategory = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setModalMessage('Kategori başarıyla silindi!');
        setModalType('success');
        setModalIsOpen(true);
        fetchCategories(); // Kategorileri tekrar çek
      })
      .catch(error => {
        console.error('Kategori silinirken bir hata oluştu:', error);
        setModalMessage('Kategori silinirken bir hata oluştu.');
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  const handleSearchCategory = (id) => {
    if (!id) {
      setFilteredCategories(categories); // ID girilmemişse tüm kategorileri göster
      return;
    }

    axios.get(`${API_URL}/${id}`)
      .then(response => {
        if (response.data) {
          setFilteredCategories([response.data]); // ID'ye göre kategoriyi göster
        } else {
          setFilteredCategories([]);
        }
      })
      .catch(error => {
        console.error(`Kategori ${id} bulunamadı:`, error);
        setModalMessage(`Kategori ${id} bulunamadı.`);
        setModalType('error');
        setModalIsOpen(true);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setUpdateModalIsOpen(true);
  };

  return (
    <div>
      {/* Kategori ekleme formu */}
      <CategoryForm onAddCategory={handleAddCategory} />
      
      {/* Kategorileri listeleyen tablo ve arama alanı */}
      <TableComponent
        rows={filteredCategories}
        onSearch={handleSearchCategory}
        onDelete={handleDeleteCategory}
        onEdit={handleEditCategory}
      />
      
      {/* Modal mesajları */}
      <ModalComponent
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        message={modalMessage}
        type={modalType}
      />

      {/* Güncelleme Modalı */}
      {selectedCategory && (
        <UpdateModal
          isOpen={updateModalIsOpen}
          onClose={closeUpdateModal}
          category={selectedCategory}
          onUpdateCategory={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default CategoryPage;
