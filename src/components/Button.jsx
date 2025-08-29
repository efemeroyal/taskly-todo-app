import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button({ type, onClick, children }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
