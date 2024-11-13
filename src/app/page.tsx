'use client'

import Image from "next/image";
import blue from './blue.png';
	import { url } from "inspector";
import { SetStateAction,useState,useEffect } from "react";
import { DialogProvider, DialogContext } from './context/Context';

import { useContext} from 'react';
import { DndContext , DragEndEvent} from "@dnd-kit/core";
import CartDroppable from "./components/droppable";
import FruitDragable from "./components/draggable";
import { after } from "node:test";
import CartDroppable2 from "./components/droppable2";
import TotalPro from "./components/totalpro";
import ColourPick from "./components/colorpick";





export default function Home()
 {
  return (
    <><></><Navbar />
    <DialogProvider>
    <TotalPro />  <ColourPick/>
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
   
    <Todorow/></DialogProvider>
   
    
    
    

    
   
    <></></>
  );
}
function Todorow() {
  const {prepTasks, setPrepTask} = useContext(DialogContext);
   const {taskList,progTasks} = useContext(DialogContext);
   
   const {addPrepItem,addDoneItem} = useContext(DialogContext);
   const {preppedTask,doneTask} = useContext(DialogContext);
   const{afterDrag} = useContext(DialogContext);
   
   
  
   const lengt = Math.max(taskList.tasks.length,preppedTask.length);
   const leng = Math.max(doneTask.length,lengt);
  const len=leng*81;
   let string1;
   string1=len.toString();
   string1=string1+"px";

   

 
  return(
    
    <table className="content">
<tbody>
       <tr className="title2" style={{height:string1}}>
       <DndContext onDragEnd={addPrepItem}> <td id="postit"><Notes/> </td>
        <td><CartDroppable items={prepTasks}/> </td></DndContext>
        <DndContext onDragEnd={addDoneItem}><td><PrepNotes/></td>
        <td><CartDroppable2 items={progTasks}/> </td></DndContext>
        <td><DoneNotes/></td>
    
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
      
      <a href="#"><button className="nav">Tutorial</button></a>
      <a href="#"><button className="nav" id="logout">Logout</button></a>
    </div><></></>
   
  ) ;
 
}

function Addtask(){
  const { openDialog, handleClick,handleClick2, handleCloseDialog, response, updateResponse} = useContext(DialogContext);
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
 
  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      //alert('event triggered');
    handleCloseDialog();
    }};
  return(
    
    <div>
      <button id="add" onClick={handleClick}>+</button>
      {openDialog && (
        <div className="dialog-box">  
         
          <h2 className="elem" id="addtodo">Current Task </h2>
          
         
      
   <h3 className="elem" id="type">Click the note to start typing</h3>
  
   <div className="stickynote">
   
         <input className="eleme" onChange={updateResponse} value={response} placeholder="Type Here"onKeyDown={handleKeyPress} />
   
    </div>
          
          <button id="close" onClick={handleCloseDialog}>Click to Add Task</button>
          <button style={{float:`right`,}} id="close" onClick={handleClick2}>Close</button>
        </div>
      )}
    </div>
  )


}
function Notes(){
  const { taskList} = useContext(DialogContext);
  return(
<div id="postitmain">
   <ul id="bluepostitbg">
    {taskList.tasks.map( (task ,j) => 
  
    <li key={j}><FruitDragable items={task}></FruitDragable></li>
    )}
   </ul></div>
  )
}

function PrepNotes(){
  const { preppedTask} = useContext(DialogContext);
  
  return(
<div id="postitmain">
   <ul id="bluepostitbg">
    {preppedTask.map( (task ,i) => 
  
    <li key={i}><FruitDragable items={task}></FruitDragable></li>
    )}
   </ul></div>
  )
}

function DoneNotes(){
  const { doneTask} = useContext(DialogContext);
  
  return(
<div id="postitmain">
   <ul id="bluepostitbg">
    {doneTask.map( (task ,i) => 
  
    <li key={i}><FruitDragable items={task}></FruitDragable></li>
    )}
   </ul></div>
  )
}

function TotalPro(){
  const { doneTask,taskList,preppedTask,progTasks,prepTasks} = useContext(DialogContext);
  let prog =0;
  if(progTasks!="") prog=1;
  let prep =0;
  if(prepTasks!="") prep=1;
  let total = (doneTask.length)+(taskList.tasks.length)+(preppedTask.length)+prog+prep;
  total = total*10;
  let progress = ((doneTask.length)*10)+((preppedTask.length+prog)*3);
  if(total!=0)progress= (progress/total)*100;
  let string1;
  string1=progress.toString();
   string1=string1+"%";

  useEffect(()=>{
    console.log(doneTask.length);
    console.log(preppedTask.length);
    console.log(taskList.tasks.length);
    console.log(prog);
    console.log(prep);
  
    if(total===0) string1="0%";

  });

  
   

  
  
  return(
    <>
    {/* project progress bar */}
    <div
        style={{
          width: '30%', // Increase the width of the droppable area
          height: '40px', // Increase the height of the droppable area
          
        
          position: 'relative',
          top:"30px",
          left:"35%",
          marginBottom:'20px',  
          marginTop:'20px',        
        }}
      >
        <p style={{
          fontWeight: 'bold', textAlign: 'center',
          zIndex: 4, position: 'absolute', top: '6px', left: '0px', height: "100%", width: '100%',
          backgroundColor: 'rgba(255, 0, 0, 0)',
        }}>Nexus
        </p>
        <p style={{
          backgroundColor: '#5ec5ee', color: 'rgba(255, 0, 0, 0)', height: "100%", zIndex: 2, position: 'absolute',
          top: '0px', width: '100%', borderRadius:'5px',
        }}> hi
        </p>
        <p style={{
          backgroundColor: 'rgba(3, 90, 252, 0.8)', color: 'rgba(255, 0, 0, 0)', height: "100%", zIndex: 3, position: 'absolute',
          top: '0px', width: string1, borderRadius:'5px',
        }}> hi
        </p> </div></>
  )
}



