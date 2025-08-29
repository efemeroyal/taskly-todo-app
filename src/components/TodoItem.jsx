// import { FaTrash, FaEdit } from "react-icons/fa";
// import styles from "./TodoItem.module.css";
// import PropTypes from "prop-types";
// import Form from "./Form";
// import Button from "./Button";
// import { useState } from "react";

// export default function TodoItem({ todo, isEditFormActive, dispatch }) {
//   const [editInput, setEditInput] = useState(todo.title);

//   function handleDelete(id) {
//     dispatch({ type: "deleteTodoItem", payload: id });
//   }

//   function handleEdit(id, updates) {
//     dispatch({ type: "editTodo", payload: { id, updates } });
//   }

//   return (
//     <div className={styles.todoItem}>
//       <div className={styles.todoItem__left}>
//         <input type="checkbox" />
//         <div>
//           <h3>{todo.title}</h3>
//           <p>{todo.date}</p>
//         </div>
//       </div>
//       <div className={styles.todoItem__right}>
//         <button
//           onClick={() => {
//             handleDelete(todo.id);
//           }}
//         >
//           <FaTrash />
//         </button>
//         <button
//           onClick={() => {
//             dispatch({ type: "updateEditFormTrue", payload: todo.title });
//           }}
//         >
//           <FaEdit />
//         </button>
//       </div>

//       {isEditFormActive && (
//         <Form dispatch={dispatch}>
//           <div>
//             <h3>Edit Todo</h3>
//             <input
//               type="text"
//               required
//               value={editInput}
//               autoFocus
//               onChange={(e) => setEditInput(() => e.target.value)}
//             />
//           </div>
//           <Button
//             type="accent"
//             onClick={(e) => {
//               e.preventDefault();
//               handleEdit(todo.id, { title: editInput });
//             }}
//           >
//             Save
//           </Button>
//         </Form>
//       )}
//     </div>
//   );
// }

// TodoItem.propTypes = {
//   todo: PropTypes.string.isRequired,
//   date: PropTypes.instanceOf(Date).isRequired,
//   isEditFormActive: PropTypes.bool.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

import { FaTrash, FaEdit } from "react-icons/fa";
import styles from "./TodoItem.module.css";
import PropTypes from "prop-types";
import Form from "./Form";
import { useState } from "react";

export default function TodoItem({ todo, isEditFormActive, dispatch }) {
  const [editInput, setEditInput] = useState(todo.title);

  function handleDelete(id) {
    dispatch({ type: "deleteTodoItem", payload: id });
  }

  function handleEdit(id, updates) {
    dispatch({ type: "editTodo", payload: { id, updates } });
  }

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoItem__left}>
        <input
          type="checkbox"
          checked={todo.status === "completed"}
          onChange={() =>
            dispatch({
              type: "editTodo",
              payload: {
                id: todo.id,
                updates: {
                  status:
                    todo.status === "completed" ? "uncompleted" : "completed",
                },
              },
            })
          }
        />
        <div>
          <h3
            style={{
              textDecoration:
                todo.status === "completed" ? "line-through" : "none",
              color: todo.status === "completed" ? "gray" : "currentcolor",
            }}
          >
            {todo.title}
          </h3>
          <p>{todo.date}</p>
        </div>
      </div>
      <div className={styles.todoItem__right}>
        <button onClick={() => handleDelete(todo.id)}>
          <FaTrash />
        </button>
        <button
          onClick={() => {
            dispatch({ type: "updateEditFormTrue", payload: todo.id });
          }}
        >
          <FaEdit />
        </button>
      </div>

      {
        isEditFormActive === todo.id && (
          <Form
            dispatch={dispatch}
            title="Edit Todo"
            value={editInput}
            onChange={(val) => setEditInput(val)}
            onSubmit={() => handleEdit(todo.id, { title: editInput })}
            buttonLabel="Save"
          />
        )

        /* <Form dispatch={dispatch}>
          <div>
            <h3>Edit Todo</h3>
            <input
              type="text"
              required
              value={editInput}
              autoFocus
              onChange={(e) => setEditInput(e.target.value)}
            />
          </div>
          <Button
            type="accent"
            onClick={(e) => {
              e.preventDefault();
              handleEdit(todo.id, { title: editInput });
            }}
          >
            Save
          </Button>
        </Form> */
        /* <Form 
    dispatch={dispatch}
    title="Edit Todo"
    value={editInput}
    onChange={(val) => setEditInput(val)}
    onSubmit={() => handleEdit(todo.id, { title: editInput })}
    buttonLabel="Save"
/> */
      }
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  isEditFormActive: PropTypes.oneOf([PropTypes.number, PropTypes.bool])
    .isRequired,
  dispatch: PropTypes.func.isRequired,
};
