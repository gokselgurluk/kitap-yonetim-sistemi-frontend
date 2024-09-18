import React, { useState } from 'react';
import TableComponent from './TableComponent'; // TableComponent bileşenini import et
import UpdateModal from './UpdateModal'; // UpdateModal bileşenini import et

const CategoryList = ({ categories, onDeleteCategory, onUpdateCategory, onSearchCategory }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditCategory = (id) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setEditingCategory(category);
      setIsModalOpen(true);
    } else {
      console.error('Category not found for id:', id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleUpdateCategory = (categoryData) => {
    if (!categoryData || !categoryData.id) {
      console.error('CategoryData or Category ID is missing:', categoryData);
      return;
    }

    onUpdateCategory(categoryData); // Parent'tan gelen güncelleme işlevini çağır
    handleModalClose();
  };

  return (
    <div>
      <h2>Kategoriler</h2>
      <TableComponent
        rows={categories}
        onDelete={onDeleteCategory}
        onEdit={handleEditCategory}
        onSearch={onSearchCategory} // Search handler'ı CategoryPage'e geçir
      />
      {isModalOpen && (
        <UpdateModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          publisher={editingCategory} // Kategori verisi
          onUpdatePublisher={handleUpdateCategory} // Kategori güncelleme işlemi
        />
      )}
    </div>
  );
};

export default CategoryList;
