'use client'

import Image from "next/image";
import blue from './blue.png';
<<<<<<< HEAD
import post from './post.png';
import post2 from './post2.jpg';
import { SetStateAction,useState } from "react";
import { DialogProvider, DialogContext } from './context/Context';
import { useContext} from 'react';
import { url } from "inspector";
=======
	import { url } from "inspector";
import { SetStateAction,useState } from "react";
import { DialogProvider, DialogContext } from './context/Context';
import { useContext} from 'react';
import { DndContext , DragEndEvent} from "@dnd-kit/core";
import CartDroppable from "./components/droppable";
import FruitDragable from "./components/draggable";
>>>>>>> 15710bb (dragging elements added)




export default function Home()
 {
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
<<<<<<< HEAD
    </DialogProvider>

  
    
   
    
    <></></>

    
  );
}
function Todorow() {
   const {taskList} = useContext(DialogContext);
   const len=(taskList.tasks.length)*200;
   let string1;
   string1=len.toString();
   string1=string1+"px";

=======
   
    </DialogProvider><></></>
  );
}
function Todorow() {
  const {prepTasks, setPrepTask} = useContext(DialogContext);
   const {taskList} = useContext(DialogContext);
   const {addPrepItem} = useContext(DialogContext);
>>>>>>> 15710bb (dragging elements added)
  
   
   const len=(taskList.tasks.length)*81;
   let string1;
   string1=len.toString();
   string1=string1+"px";

   

 
  return(
    <DndContext onDragEnd={addPrepItem}>
    <table className="content">
<tbody>
       <tr className="title2" style={{height:string1}}>
        <td id="postit"><Notes/> </td>
<<<<<<< HEAD
        <td>data </td>
        <td>data </td>
=======
        <td><CartDroppable items={prepTasks}/> </td>
        <td>change</td>
>>>>>>> 15710bb (dragging elements added)
        <td>data </td>
        <td>data </td>
    
        </tr> 
        </tbody>
    </table>
    </DndContext>
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
<<<<<<< HEAD
   <ul id="bluepostitbg">
    {taskList.tasks.map( (task, i ) => 
  
  <li key={i} ><div  id="bluepostit" style={{backgroundImage: `url(${blue})`,
  backgroundSize: 'cover',
  
 
  }}>{task}</div></li>
=======
<div id="postitmain">
   <ul id="bluepostitbg">
    {taskList.tasks.map( (task ) => 
  
    <li><FruitDragable items={task}></FruitDragable></li>
>>>>>>> 15710bb (dragging elements added)
    )}
   </ul></div>
  )
}



