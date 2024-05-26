import React, { useEffect } from "react";
import { useState } from "react";
import Li from "./components/listItem";

function Todo() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date();

  const [counts, setCounts] = useState({
    pending: 0,
    done: 0,
  });
  const [tasks, setTasks] = useState([]);
  let updatedTasks = tasks;
  let updatedCounts = counts;
  useEffect(() => {
    let todo = localStorage.getItem("tasks");
    let counter = localStorage.getItem("counter");
    if (todo) {
      updatedTasks = JSON.parse(todo);
      setTasks(updatedTasks);
    }
    if (counter) {
      updatedCounts = JSON.parse(counter);
      setCounts(updatedCounts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("counter", JSON.stringify(updatedCounts));
    console.log(updatedTasks);
  }, [updatedTasks, updatedCounts]);

  function handleAdd() {
    const data = document.getElementById("newTask");
    if (data.value === "") {
      return alert("Add a task");
    }
    const newTaskDes = {
      subject: data.value,
      status: false,
    };
    updatedTasks = [...updatedTasks, newTaskDes];
    setTasks(updatedTasks);
    updatedCounts = {
      pending: updatedCounts.pending + 1,
      done: updatedCounts.done,
    };
    setCounts(updatedCounts);
    data.value = "";
  }

  function handleDelete(i) {
    if (tasks[i].status) {
      updatedCounts = {
        pending: updatedCounts.pending,
        done: updatedCounts.done - 1,
      };
      setCounts(updatedCounts);
      updatedTasks = tasks.slice();
      updatedTasks.splice(i, 1);
      setTasks(updatedTasks);
    } else {
      const confirmation = window.confirm(
        "Task isn't completed yet! Do you still want to delete it?"
      );
      if (confirmation) {
        updatedCounts = {
          pending: updatedCounts.pending - 1,
          done: updatedCounts.done,
        };
        setCounts(updatedCounts);
        updatedTasks = tasks.slice();
        updatedTasks.splice(i, 1);
        setTasks(updatedTasks);
      }
    }
  }

  return (
    <div className="container">
      <div className="header">
        <p className="headerText">
          To-Do List!
          <span className="date"> {date.toDateString(undefined, options)}</span>
        </p>
        <div className="countDiv">
          <p className="count">
            {counts.pending}
            <br></br>Pending
          </p>
          <p className="count">
            {counts.done}
            <br></br>Done
          </p>
        </div>
      </div>
      <div className="taskField">
        <input
          className="taskDes"
          id="newTask"
          type="text"
          placeholder="Add Your Task"
          autoComplete="off"
          onKeyDown={(e)=>{if(e.key==="Enter")handleAdd();}}
        ></input>
        <button className="add" id="myBtn" onClick={() => handleAdd()}>
          Add
        </button>
      </div>
      <ul id="taskList">
        {tasks.map((e, i) => {
          return (
            <li key={i}>
              <Li
                index={i}
                status={e.status}
                td={e.subject}
                changeText={(e) => {
                  updatedTasks = tasks.slice();
                  updatedTasks[i] = {
                    subject: e.target.value,
                    status: updatedTasks[i].status,
                  };
                  setTasks(updatedTasks);
                }}
                onDeleteClick={() => handleDelete(i)}
                changeStatus={() => handleStatus(i)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
  function handleStatus(i) {
    updatedTasks = tasks.slice();
    updatedTasks[i] = {
      subject: updatedTasks[i].subject,
      status: !updatedTasks[i].status,
    };
    setTasks(updatedTasks);
    updatedCounts = {
      pending: updatedCounts.pending + (updatedTasks[i].status ? -1 : 1),
      done: updatedCounts.done + (updatedTasks[i].status ? 1 : -1),
    };
    setCounts(updatedCounts);
  }
}
export default Todo;
