import styles from '../../styles/components/footer.module.scss';
import { developer } from '../../finacular';

const Footer = props => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__social}>
        {
          developer.social.map(({link, title, icon}, idx) => (
            <a href={link} target="_blank" rel="noreferrer" key={idx}>
              <i className={icon}></i>
              <span>{title}</span>
            </a>
          ))
        }
      </div>
      <p className={styles.footer__dev}>
        Developed with ❤️️ by&nbsp;
        <a href={developer.url} target="_blank" rel="noreferrer">
          {developer.name}
        </a>
        <span className={styles.footer__copyright}>
          &copy; 2021 {developer.name}
        </span>
      </p>
    </footer>
  );
};

export default Footer;
