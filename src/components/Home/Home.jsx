import React from 'react';
import Slider from 'react-slick';
import { Avatar, IconButton, Stack, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

// Carousel için ayarları tanımlayın
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,               // Otomatik geçişi etkinleştirir
  autoplaySpeed: 3000,          // Her bir slayt arasında geçen süre (ms)
};

// Görüntü dosyasının yolu
import sliderFoto1 from "../../images/book1.png";
import sliderFoto2 from "../../images/book2.png";
import sliderFoto3 from "../../images/book3.png";
const HomePage = () => {
  return (
    <Box
      sx={{
        height: '100vh', // Tam sayfa yüksekliği
        width: '100%',   // Tam sayfa genişliği
        //backgroundImage: 'url(https://via.placeholder.com/1920x1080)', // Arka plan resmi
        backgroundSize: 'cover',       // Resmin tüm alanı kaplaması
        backgroundPosition: 'center',  // Resmi merkeze hizalama
        display: 'flex',               // İçeriği merkezde hizalamak için
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
       
      }}
    >
      {/* Carousel */}
      <Slider {...carouselSettings} style={{ width: '100%', maxWidth: '35vw' }}>
        <div>
          <img src={sliderFoto1} alt="Slide 1" style={{ width: '100%' ,height:'100%', borderRadius: '8px' }} />
        </div>
        <div>
          <img src={sliderFoto2} alt="Slide 2" style={{ width: '100%' ,height:'auto', borderRadius: '8px' }} />
        </div>
        <div>
          <img src={sliderFoto3} alt="Slide 3" style={{ width: '100%' ,height:'auto', borderRadius: '8px' }} />
        </div>
      </Slider>

     
      {/* Sosyal Medya İkonları */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 5 }}
      >
        <IconButton aria-label="Facebook" color="primary" href="https://facebook.com">
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton aria-label="Twitter" color="primary" href="https://twitter.com">
          <Twitter fontSize="large" />
        </IconButton>
        <IconButton aria-label="Instagram" color="primary" href="https://instagram.com">
          <Instagram fontSize="large" />
        </IconButton>
        <IconButton aria-label="LinkedIn" color="primary" href="https://linkedin.com">
          <LinkedIn fontSize="large" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default HomePage;
