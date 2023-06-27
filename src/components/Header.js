import logo from '../images/logo.svg';

export function Header() {
  return (
    <header className="header page__header">
          <img
            src={logo}
            alt="Слово МЕСТО написано латинскими буквами"
            className="logo header__logo"
          />
    </header>
  )
}