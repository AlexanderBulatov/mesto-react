export function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened': ''}`}> 
    <div className="popup__container">
      <h2 className="popup__title">{props.formTitle}</h2>
      <form className="popup__form" name={props.name} noValidate>
       
        {props.children}

        <button type="submit" className="popup__submit-btn">
          {props.bttnTitle}
        </button>

      </form>
      <button className="popup__close" type="button" onClick={props.onClose}></button>
    </div>
  </div>
  )
}