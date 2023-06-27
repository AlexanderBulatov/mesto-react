import React from 'react';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js'



function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  // const [isEditAvatarPopupOpen, setPopupClose] = React.useState(false);

const handleCardClick = (card) => {
  setSelectedCard(card);
}

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  
  return (
    <>
      <div className="page body__content">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} test="test" onCardClick={handleCardClick}/>
        <Footer />
      </div>
      {/* ------------------------------ Add Picture Popap ----------------------------- */}
      <PopupWithForm name="add-picture" formTitle="Новое место" bttnTitle="Создать" isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups}>
        <input
          id="caption" 
          type="text"
          name="picture-caption"
          placeholder="Название"
          className="popup__input popup__input_type_caption"
          required
          minLength="2"
          maxLength ="30"
        />
        <span className="popup__error popup__error_type_caption"></span>

        <input
          id="link"
          type="url"
          name="picture-link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          required
        />
        <span className="popup__error popup__error_type_link"></span>
      </PopupWithForm>

      {/* ------------------------------ Edit Profile Popap ----------------------------- */}
      <PopupWithForm name="profile" formTitle="Редактировать профиль" bttnTitle="Сохранить" isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups}>
        <input
          id="name"
          type="text"
          name="profile-name"
          placeholder="Введите имя"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength ="40"
        />
        <span className="popup__error popup__error_type_name"></span>

        <input
          id="occupation"
          type="text"
          name="profile-occupation"
          placeholder="Введите род занятий"
          className="popup__input popup__input_type_occupation"
          required
          minLength="2"
          maxLength ="200"
        />
        <span className="popup__error popup__error_type_occupation"></span>
      </PopupWithForm>
      {/* ------------------------------ Avatar Popap ----------------------------- */}
      <PopupWithForm name="avatar" formTitle="Обновить аватар" bttnTitle="Сохранить" isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups}>
        <input
          id="avatar"
          type="url"
          name="avatar-link"
          placeholder="Ссылка на аватар"
          className="popup__input popup__input_type_avatar"
          required
        />
        <span className="popup__error popup__error_type_avatar"></span>
      </PopupWithForm>
      {/* ------------------------------ Confirm Popap ----------------------------- */}
      <PopupWithForm name="confirm" formTitle="Вы уверены?" bttnTitle="Да" onClose = {closeAllPopups} />
      {/* ------------------------------ Zoom Popap ----------------------------- */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
    </>
  );
}

export default App;
