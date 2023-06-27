import React from 'react';
import { api } from '../utils/Api.js'
import { Card } from './Card.js'

export function Main(props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);
  
  const handleError = (err) => {
    console.log(err);
  }

  React.useEffect(() => {
    api.getUserInfo().then();

    Promise.all([api.getUserInfo(), api.getInitialCards()] )
      .then(([userData, cards]) => {
        // userId = userData._id;
        cards.reverse();
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch(handleError);
  }, []);




  return (
    <main className="page__main">
          <section className="profile">
            <div className="profile__foto-wrapper" onClick={props.onEditAvatar}>
              {/* <%=require('./images/JIKusto.jpg')%> */}
              <img src={userAvatar} alt="фотография-аватар" className="profile__foto"/>
            </div>
            <div className="profile__info">
              <div className="profile__name-area">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit" type="button" onClick={props.onEditProfile} ></button>
              </div>
              <p className="profile__occupation">{userDescription}</p>
            </div>
            <button className="profile__add-place" type="button" onClick={props.onAddPlace}></button>
          </section>
          <section className="elements">
            {cards.map((card)=>(
              <Card key={card._id} card={card} onCardClick={props.onCardClick} />
            ))}
          </section>
    </main>
  )
}