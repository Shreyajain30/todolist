import React from "react";

function Li({ status, td, onDeleteClick, changeStatus,changeText }) {

  function calculateRow(text){
    return Math.min(Math.ceil(text.length/70),4);
  }
    return (
      <div className="list" >
        <input
          className="check"
          type="checkbox"
          checked={status}
          onChange={changeStatus}
        ></input>

        <textarea className="taskText" rows={calculateRow(td)} value={td} contentEditable
         onInput={changeText}></textarea>
        <button className="delete" onClick={onDeleteClick}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    );
  }
  export default Li;