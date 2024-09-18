import React, { useState } from 'react';
import TableComponent from './TableComponent'; // Import your TableComponent
import UpdateModal from './UpdateModal'; // Import UpdateModal

const PublisherList = ({ publishers, onDeletePublisher, onUpdatePublisher, onSearchPublisher }) => {
  const [editingPublisher, setEditingPublisher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditPublisher = (id) => {
    const publisher = publishers.find(p => p.id === id);
    if (publisher) {
      setEditingPublisher(publisher);
      setIsModalOpen(true);
    } else {
      console.error('Publisher not found for id:', id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPublisher(null);
  };

  const handleUpdatePublisher = (publisherData) => {
    if (!publisherData || !publisherData.id) {
      console.error('PublisherData or Publisher ID is missing:', publisherData);
      return;
    }
  
    onUpdatePublisher(publisherData); // Parent'tan gelen güncelleme işlevini çağır
    handleModalClose();
  };

  return (
    <div>
      <h2>Yayınevleri</h2>
      <TableComponent
        rows={publishers}
        onDeletePublisher={onDeletePublisher}
        onEditPublisher={handleEditPublisher}
        onSearch={onSearchPublisher} // Search handler'ı PublisherPage'e geçir
      />
      {isModalOpen && (
        <UpdateModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          publisher={editingPublisher}
          onUpdatePublisher={handleUpdatePublisher}
        />
      )}
    </div>
  );
};

export default PublisherList;
