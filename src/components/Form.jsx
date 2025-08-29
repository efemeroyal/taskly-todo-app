// import styles from "./Form.module.css";
// import PropTypes from "prop-types";

// export default function Form({ dispatch, children }) {
//   return (
//     <>
//       <form className={styles.form}>{children}</form>
//       <div
//         className={styles.overlay}
//         onClick={() => dispatch({ type: "updateFormFalse" })}
//       ></div>
//     </>
//   );
// }

// Form.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   children: PropTypes.any.isRequired,
// };

import styles from "./Form.module.css";
import PropTypes from "prop-types";
import Button from "./Button";

export default function Form({
  dispatch,
  title,
  value,
  onChange,
  onSubmit,
  buttonLabel,
}) {
  return (
    <>
      <form className={styles.form}>
        <h3>{title}</h3>
        <input
          type="text"
          required
          value={value}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="accent"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {buttonLabel}
        </Button>
      </form>
      <div
        className={styles.overlay}
        onClick={() => dispatch({ type: "updateFormFalse" })}
      ></div>
    </>
  );
}

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
