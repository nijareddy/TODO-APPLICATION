import { MdDelete } from "react-icons/md";
import './index.css'


const TodoItem = (props) => {
  const { todoItem, delFunc, updateApi } = props


  const {DESCRIPTION, STATUS, ID } = todoItem
  
  const check=STATUS === 1 
  const deleteFunc = () => {
    delFunc(ID)
  }

  const updateFunc = () => {

    const updObj = {
      status: !STATUS
    }
    updateApi(ID, updObj)
  }


  return (

    <li className='todo-item'>
      <div className="todo">
        <input type="checkbox" className="input" onChange={updateFunc} checked={check} />
        <p className="description">{
          DESCRIPTION
        }</p></div>
      <button className='delete-btn' onClick={deleteFunc}><MdDelete className="icon" /></button>
    </li>

  );
};

export default TodoItem;