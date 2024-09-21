'use client'

import Image from "next/image";
import { SetStateAction,useState } from "react";
import { DialogProvider, DialogContext } from './context/Context';
import { useContext} from 'react';


export default function Home() {
  return (
    <><></><Navbar />
    <DialogProvider>
    <table className="heading">
      <tbody>
      <tr className="title1">
        <td id="todo">To Do <Addtask/></td>
        <td>Preparing</td>
        <td>Prepared</td>
        <td>In Progress</td>
        <td>Done</td>
      </tr>
      </tbody>
    </table>

    <Todorow/>
    </DialogProvider><></></>
  );
}
function Todorow() {
  
  
 
  return(
    <table className="content">
<tbody>
       <tr className="title2">
        <td><Notes/> </td>
        <td>data </td>
        <td>data </td>
        <td>data </td>
        <td>data </td>
    
        </tr> 
        </tbody>
    </table>
   
  ) ;
 
}

function Navbar() {
  
  return(
    <><></><div className="navbar">
      <a href="#"><button className="nav">Home</button></a>
      <a href="#"><button className="nav">Contact Us</button></a>
      <a href="#"><button className="nav">Reviews</button></a>
      <a href="#"><button className="nav">Tutorial</button></a>
      <a href="#"><button className="nav" id="logout">Logout</button></a>
    </div><></></>
   
  ) ;
 
}

function Addtask(){
  const { openDialog, handleClick, handleCloseDialog, response, updateResponse} = useContext(DialogContext);
  /*const [response, setResponse] = useState("");
  const updateResponse = (event: { target: { value: SetStateAction<string>; }; }) => {
    setResponse(event.target.value);
  }
 
  const [openDialog, setOpen] = useState(false);

  const addTask = () => {
   
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };*/
 

  return(
    
    <div>
      <button id="add" onClick={handleClick}>+</button>
      {openDialog && (
        <div className="dialog-box">
         <h2 className="elem" id="addtodo">Current Task</h2>
   <h3 className="elem" id="type">Click the note to start typing</h3>
   
   <div className="stickynote">
   
        <input className="eleme" onChange={updateResponse} value={response} />
      
   
    </div>
          
          <button id="close" onClick={handleCloseDialog}>Click to Add Task</button>
        </div>
      )}
    </div>
  )


}
function Notes(){
  const { taskList} = useContext(DialogContext);
  return(
   <ul>
    {taskList.tasks.map( (task, i ) => 
  
  <li key={i} ><div style={{backgroundColor:"green",border: '1px solid #ddd', }}>{task}</div></li>
    )}
   </ul>
  )
}




