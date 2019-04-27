import React, { useState, useEffect, useReducer, useRef } from "react";
import uuid from "uuid/v4";

const initialTasksState = {
  tasks: [],
  completedTasks: []
};

const TYPES = {
  ADD_TASK: "ADD_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  DELETE_TASK: "DELETE_TASK"
};

const tasksReducer = (state, action) => {
  console.log("state", state, "action", action);

  switch (action.type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };
    case TYPES.COMPLETE_TASK:
      const { completedTask } = action;
      console.log(action);
      return {
        // ...state, on a les deux partie.
        completedTasks: [...state.completedTasks, completedTask],
        tasks: state.tasks.filter(t => t.id !== completedTask.id)
      };
    case TYPES.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(t => t.id !== action.task.id)
      };
    default:
      return state;
  }
};

//faire key pour nous meme
const TASKS_STORAGE_KEY = "TASKS_STORAGE_KEY";

const storeTasks = taskMap => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(taskMap));
};

const readStoredTasks = () => {
  const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

  return tasksMap ? tasksMap : initialTasksState;
};

//avec local storage snas reducer
// const storeTasks2 = ({ tasks, completedTasks }) => {
//   localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify({ tasks, completedTasks }));
// };
// //au depart l object est null , y a rien d engeristrer , pour pas avoir d erreur , le ternary
// const readStoredTasks2 = () => {
//   const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));

//   return tasksMap ? tasksMap : { tasks: [], completedTasks: [] };
// };

///////////////////////////////////////////////////////////////////////////////////////////////
//App ici
///////////////////////////////////////////////////////////////////////////////////////////////
function Tasks() {
  const [taskText, setTaskText] = useState("");
  const storedTasks = readStoredTasks();
  const inputTask = useRef();
  const [state, dispatch] = useReducer(tasksReducer, storedTasks);
  const { tasks, completedTasks } = state;

  //back up
  useEffect(() => {
    storeTasks({ tasks, completedTasks });
  });

  const updateTaskText = event => {
    setTaskText(event.target.value);
  };

  const addTask = e => {
    e.preventDefault();
    //si c etit useState addTask([...task, tastText])
    dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid() } });
    setTaskText("");
    inputTask.current.focus();
  };

  const completeTask = completedTask => () => {
    dispatch({ type: TYPES.COMPLETE_TASK, completedTask });
  };

  const deleteTask = task => () => {
    dispatch({ type: TYPES.DELETE_TASK, task });
  };

  return (
    <div>
      <h3>Tasks</h3>
      <div className="form">
        <form>
          <input value={taskText} onChange={updateTaskText} ref={inputTask} />
          <button type="submit" onClick={addTask}>
            Add Task
          </button>
        </form>
      </div>
      <div className="task-list">
        {tasks.map(task => {
          const { id, taskText } = task;

          return (
            <div key={id} onClick={completeTask(task)}>
              {taskText}
            </div>
          );
        })}
      </div>
      <div className="completed-list">
        {completedTasks.map(task => {
          const { id, taskText } = task;

          return (
            <div key={id}>
              {taskText}{" "}
              <span onClick={deleteTask(task)} className="delete-task">
                x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tasks;
