import Button from '../button';
import { title } from '../../finacular';
import styles from '../../styles/components/header.module.scss';

const Header = props => {
  return (
    <header className={styles.header}>
      <div className={ styles.header__inner }>
        <p className={ styles.brand }>{title}</p>
        <Button className={ styles.theme_toggle }>
          <i className="fa fa-sun"></i>
        </Button>
      </div>
    </header>
  );
};

export default Header;
