export function Card(props){
  
  function handleClick() {
    props.onCardClick(props.card);
  } 

  return(
    <article className="element">
      <img src={props.card.link} alt={props.card.name} className="element__foto" onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__rate">
          <button className="element__like" type="button"></button>
          <h3 className="element__counter">{props.card.likes.length}</h3>
        </div>
      </div>
      <button className="element__delete" type="button"></button>
    </article>
  )
}
