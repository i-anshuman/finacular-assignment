import Button from '../button';
import { title } from '../../finacular';
import styles from '../../styles/components/header.module.scss';

const Header = props => {
  const changeTheme = () => {
    const body = document.querySelector('body')
    const theme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={styles.header}>
      <div className={ styles.header__inner }>
        <p className={ styles.brand }>{title}</p>
        <Button className={ styles.theme_toggle } onClick={changeTheme}>
          <i className="fa fa-sun"></i>
        </Button>
      </div>
    </header>
  );
};

export default Header;
