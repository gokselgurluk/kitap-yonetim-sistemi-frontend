import React from 'react';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Modal'ın kök elementini ayarlama
Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, message, type }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Bilgilendirme Modalı"
      style={{
        content: {
          color: type === 'success' ? 'green' : 'red',
          textAlign: 'center',
          maxWidth: '400px', // Maksimum genişlik
          maxHeight: '150px', // Maksimum yükseklik
          margin: 'auto', // Modal'ı merkezde konumlandırır
          padding: '20px', // İçerik için boşluk
          overflow: 'auto', // İçeriğin taşmasını önler
          borderRadius:'20px',
          fontSize:'14px',
          zIndex: 1200 
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000
        }
      }}
    >
      <h2>{message}</h2>
      <Stack 
        direction="row" 
        spacing={2} 
        style={{ 
          marginTop: '40px', 
          justifyContent: 'center' // Butonları ortalar
        }}
      >
         <Button 
    variant={type === 'success' ? 'contained' : 'outlined'} 
    color={type === 'success' ? 'success' : 'error'} 
    onClick={onRequestClose}
  >
    Kapat
  </Button>
      </Stack>
    </Modal>
  );
};

export default ModalComponent;
