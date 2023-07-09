import React from 'react';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js'
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';


function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isDataLoading, setDataLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({name:'', about: '', avatar:''});

  // const [isEditAvatarPopupOpen, setPopupClose] = React.useState(false);
  const handleError = (err) => {
    console.log(err);
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()] )
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        cards.reverse();
        setCards(cards);
      })
      .catch(handleError);
  }, []);
 

  function handleAddPlaceSubmit (place){
    setDataLoading(true);
    api.setCard(place.name, place.link).then((newCard)=>{
      setCards([newCard, ...cards]);
    })
    .catch(handleError)
    .finally(() => closeAllPopups());
  }


  function handleCardLike(card) {
    setDataLoading(true);
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(handleError)
    .finally(() => closeAllPopups());
  }


  //const cardForDelete = React.useRef(null);
 
  function handleCardDelete(card) {
    setDeletedCard(card);
  }

  function handleConfirmDelete (card){
    setDataLoading(true);
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((cardFromState) => cardFromState._id !== card._id));
    })
    .catch(handleError)
    .finally(() => closeAllPopups());
  }

  function handleUpdateUser (userData){
    setDataLoading(true);
    api.setUserInfo(userData.name, userData.about).then((userDatafromApi)=>{
       setCurrentUser(userDatafromApi);
       closeAllPopups();
     })
     .catch(handleError)
     .finally(() => closeAllPopups());
  }

  function handleUpdateAvatar({avatar}){
    setDataLoading(true);
    api.setAvatar(avatar).then((userDatafromApi)=>{
       setCurrentUser(userDatafromApi);
       
     })
     .catch(handleError)
     .finally(() => closeAllPopups());
  }



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
    setConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setDataLoading(false)
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page body__content">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick} 
          onAddPlace={handleAddPlaceClick} 
          cards={cards} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Footer />
      </div>
      {/* ------------------------------ Add Picture Popap ----------------------------- */}
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isDataLoading} /> 
      {/* ------------------------------ Edit Profile Popap ----------------------------- */}
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isDataLoading} /> 
      {/* ------------------------------ Avatar Popap ----------------------------- */}
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isDataLoading} />
      {/* ------------------------------ Confirm Popap ----------------------------- */}
      <ConfirmDeletePopup card={deletedCard} onClose={closeAllPopups} onConfirmDelete={handleConfirmDelete} isLoading={isDataLoading} />
      {/* ------------------------------ Zoom Popap ----------------------------- */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      
    </CurrentUserContext.Provider>
  );
}

export default App;
