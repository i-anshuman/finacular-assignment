import PropTypes from 'prop-types';
import styles from '../../styles/components/input.module.scss';

const Input = ({label, type, placeholder, ...props}) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...props}
      />
      <label className={styles.label}>{label}</label>
      <div className={styles.fieldset}></div>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  placeholder: " "
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default Input;
