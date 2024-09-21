<h1 align="center">Kitap Yönetim Sistemi - Frontend</h1>
<h4 align="justify"> 
Bu proje, bir Kitap Yönetim Sistemi'nin front-end kısmını oluşturan bir React uygulamasıdır. Kullanıcılar kitapları görüntüleyebilir, güncelleyebilir, yeni kitap ekleyebilir ve kitapları silebilirler. Kitaplar yazar ve yayınevi bilgileriyle birlikte kaydedilir.
</h4>
<p>
<a href="https://kitap-yonetim-sistemi-frontend.vercel.app/">Site Linki</a> <br>
</p>

<h2 id="table-of-contents"> :book: İçerik</h2>

<details open="open">
  <summary>İçerik</summary>
  <ol>
    <li><a href="#proje-ozeti"> ➤ Proje Özeti</a></li>
    <li><a href="#teknolojiler"> ➤ Kullanılan Teknolojiler</a></li>
    <li><a href="#kurulum"> ➤ Kurulum ve Başlatma</a></li>
    <li><a href="#sistem-gorselleri"> ➤ Uygulama Görselleri</a></li>
    <li><a href="#önemli"> ➤ Önemli Dosyalar</a></li>
  </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PROJECT OVERVIEW -->
<h2 id="proje-ozeti"> :mag_right: Proje Özeti</h2>

<p align="justify"> 
Kitap Yönetim Sistemi, kitapların yönetilmesine olanak sağlayan bir web uygulamasıdır. Bu uygulama, kullanıcıların kitapları görüntülemesine, yeni kitaplar eklemesine, mevcut kitapları güncellemesine ve kitapları silebilmesine imkan tanır. Kitaplar yazar ve yayınevi bilgileriyle birlikte kaydedilir, ve bu bilgileri dropdown menülerden seçerek kullanıcı dostu bir arayüzde yönetebilirsiniz.

Projenin front-end kısmı React.js ile geliştirilmiş olup, Material UI bileşenleri kullanılarak modern bir kullanıcı arayüzü oluşturulmuştur. CRUD (Create, Read, Update, Delete) işlemleri gerçekleştirilebilmekte ve API ile entegrasyon sağlanarak veriler güncellenmektedir.

Temel olarak bu proje, bir kütüphane veya kitap envanteri yönetiminde kullanılabilecek bir sistem sağlar.
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- USED TECHNOLOGIES -->
<h2 id="teknolojiler">:computer: Kullanılan Teknolojiler</h2>

<p align="justify"> 
Projede kullanılan teknolojiler:

[![made-with-Vite](https://img.shields.io/badge/Made%20with-Vite-red.svg)](https://vitejs.dev/) <br>
[![made-with-React](https://img.shields.io/badge/Made%20with-React-blueviolet.svg)](https://reactjs.org/) <br>
[![made-with-Material-UI](https://img.shields.io/badge/Made%20with-Material--UI-lightblue.svg)](https://mui.com/) <br>
[![made-with-React-Router](https://img.shields.io/badge/Made%20with-React--Router-red.svg)](https://reactrouter.com/) <br>
[![made-with-Axios](https://img.shields.io/badge/Made%20with-Axios-blue.svg)](https://axios-http.com/) <br>
[![made-with-Slick](https://img.shields.io/badge/Made%20with-Slick-orange.svg)](https://kenwheeler.github.io/slick/) <br>
[![made-with-React-Modal](https://img.shields.io/badge/Made%20with-React--Modal-yellow.svg)](https://reactcommunity.org/react-modal/) <br>
[![made-with-CSS](https://img.shields.io/badge/Made%20with-CSS-green.svg)](https://www.w3.org/Style/CSS/) <br>
[![made-with-IDE](https://img.shields.io/badge/IDE-VS%20Code%20%2F%20WebStorm%20%2F%20Herhangi%20bir%20IDE-blue.svg)](https://code.visualstudio.com/)
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="önemli">Önemli Dosyalar</h2>
<p align="justify"> 
src/components/Book/BookList.js - Kitap listesini gösteren bileşen.<br>
src/components/Book/BookForm.js - Yeni kitap eklemek için form bileşeni.<br>
src/components/Book/UpdateModal.js - Kitap güncelleme işlemi için modal bileşeni.<br>
src/pages/BookPage.js - Kitap işlemleri sayfası.<br>
</p>
<!-- SETUP AND LAUNCH -->

<h2 id="kurulum"> :hammer: Kurulum ve Başlatma</h2>

<p align="justify"> 
Projenin düzgün bir şekilde çalışabilmesi için öncelikle Vite kurulumunun yapılması gerekmektedir. Aşağıdaki komutları kullanarak kurulumları gerçekleştirebilirsiniz.
Node.js ve npm'in kurulu olduğundan emin olun.
Uygulama tarayıcıda http://localhost:5173 adresinde çalışacaktır.

```bash
# Vite projesi oluşturma
npm create vite@latest 

# Proje dizinine geçiş
cd kitap-yonetim-sistemi

# Gerekli bağımlılıkları yükleme
npm install

# Projeyi çalıştırma
npm run dev

```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- PROGRAM SCREENSHOTS -->
<h2 id="sistem-gorselleri"> :camera: Site İçi Görseller</h2>

<p align="justify"> 

![GIF Açıklaması](projeGIF.gif)
 
</p>

<h4> I would like to thank Kerem Yardan for his support. </h4>