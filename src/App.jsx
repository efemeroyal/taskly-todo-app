import "./App.css";
import { useReducer } from "react";
import TodoItem from "./components/TodoItem";
import Button from "./components/Button";
import TodoList from "./components/TodoList";
import Form from "./components/Form";

// TODO: Work on the edit, delete and filter sorting functionalities

const initialState = {
  todos: [],
  filter: "all",
  isFormActive: false,
  input: "",
  isEditFormActive: false,
};

const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(date);
};

let newTodo;

function reducer(state, action) {
  switch (action.type) {
    case "setAddFormTrue":
      return { ...state, isFormActive: true };
    case "setAddFormFalse":
      return { ...state, isFormActive: false };
    case "updateEditFormTrue":
      return { ...state, isEditFormActive: action.payload }; // todo.id
    case "updateEditFormFalse":
      return { ...state, isEditFormActive: null };
    case "updateFormFalse":
      return { ...state, isEditFormActive: null, isFormActive: false };
    case "updateFilter":
      return { ...state, filter: action.payload };
    case "updateInput":
      return { ...state, input: action.payload };
    case "createTodo":
      newTodo = {
        title: state.input,
        date: formatDate(new Date()),
        id: Date.now(),
        status: "uncompleted",
      };
      return {
        ...state,
        input: "",
        isFormActive: false,
        todos: [...state.todos, newTodo],
      };
    case "deleteTodoItem":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "editTodo":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, ...action.payload.updates };
          }
          return todo;
        }),
        isEditFormActive: null, // close edit form after saving
      };
    default:
      return state;
  }
}

export default function App() {
  const [{ todos, filter, input, isFormActive, isEditFormActive }, dispatch] =
    useReducer(reducer, initialState);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  return (
    <div className="app">
      <h1>
        <span>Taskly</span>
        <small>: Your life, organized</small>
      </h1>
      <section className="todo-container">
        <div className="row">
          <Button
            type="accent"
            onClick={() => dispatch({ type: "setAddFormTrue" })}
          >
            Add Task
          </Button>
          <select
            className="filters"
            value={filter}
            onChange={(e) =>
              dispatch({ type: "updateFilter", payload: e.target.value })
            }
            id="filters"
          >
            <option value="all" className="filters-option">
              All
            </option>
            <option value="completed" className="filters-option">
              Completed
            </option>
            <option value="uncompleted" className="filters-option">
              Uncompleted
            </option>
          </select>
        </div>

        <TodoList>
          {/* <TodoItem todo="cook" date="skd" />
          <TodoItem todo="sweep the house" date="skd" />
          <TodoItem todo="eat food" date="skd" />
          <TodoItem todo="read my book" date="skd" /> */}

          {/* {todos.length > 0 ? (
            todos
              .slice()
              .reverse()
              .map((todo) => (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  isEditFormActive={isEditFormActive}
                  dispatch={dispatch}
                />
              ))
          ) : (
            <h2 className="h2-404">No Todos available :(</h2>
          )} */}

          {filteredTodos.length > 0 ? (
            todos
              .filter((todo) => {
                if (filter === "all") return true;
                return todo.status === filter;
              })
              .slice()
              .reverse()
              .map((todo) => (
                <TodoItem
                  todo={todo}
                  key={todo.id}
                  isEditFormActive={isEditFormActive}
                  dispatch={dispatch}
                />
              ))
          ) : todos.length === 0 ? (
            <h2 className="h2-404">No Todos available at all :(</h2>
          ) : (
            <h2 className="h2-404">No {filter} todos found :(</h2>
          )}
        </TodoList>
      </section>

      {isFormActive && (
        <Form
          dispatch={dispatch}
          title="Add a Todo"
          value={input}
          onChange={(val) => dispatch({ type: "updateInput", payload: val })}
          onSubmit={() => dispatch({ type: "createTodo" })}
          buttonLabel="Add"
        />
      )}
    </div>
  );
}
