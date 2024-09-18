import React, { useState } from 'react';
import TableComponent from './TableComponent'; // TableComponent bileşenini import et
import UpdateModal from './UpdateModal'; // UpdateModal bileşenini import et

const AuthorList = ({ authors, onDeleteAuthor, onUpdateAuthor, onSearchAuthor }) => {
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditAuthor = (id) => {
    const author = authors.find(a => a.id === id);
    if (author) {
      setEditingAuthor(author);
      setIsModalOpen(true);
    } else {
      console.error('Author not found for id:', id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAuthor(null);
  };

  const handleUpdateAuthor = (authorData) => {
    if (!authorData || !authorData.id) {
      console.error('AuthorData or Author ID is missing:', authorData);
      return;
    }

    onUpdateAuthor(authorData); // Parent'tan gelen güncelleme işlevini çağır
    handleModalClose();
  };

  return (
    <div>
      <h2>Yazarlar</h2>
      <TableComponent
        rows={authors}
        onDeleteAuthor={onDeleteAuthor}
        onEditAuthor={handleEditAuthor}
        onSearch={onSearchAuthor} // Search handler'ı AuthorPage'e geçir
      />
      {isModalOpen && (
        <UpdateModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          publisher={editingAuthor} // Yazar verisi
          onUpdatePublisher={handleUpdateAuthor} // Yazar güncelleme işlemi
        />
      )}
    </div>
  );
};

export default AuthorList;
