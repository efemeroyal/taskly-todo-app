import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

export default function TodoList({ children }) {
  return (
    <main className={styles.todoItems}>
      <div className={styles.todoList}>{children}</div>
    </main>
  );
}

TodoList.propTypes = {
  children: PropTypes.any.isRequired,
};
