'use client'

import Image from "next/image";
import { SetStateAction,useState } from "react";

export default function Home() {
  return (
    <><></><Navbar />
    
    <table className="table1">
      <tr className="title1">
        <td>To Do <Addtask/></td>
        <td>Preparing</td>
        <td>Prepared</td>
        <td>In Progress</td>
        <td>Done</td>
      </tr>
   
    </table>

    <Todorow/><></></>
  );
}
function Todorow() {
  
  
 
  return(
    <table className="table2">
       <tr className="title2">
        <td>data </td>
        <td>data </td>
        <td>data </td>
        <td>data </td>
        <td>data </td>
    
        </tr> 
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
  const [response, setResponse] = useState("");
  const updateResponse = (event: { target: { value: SetStateAction<string>; }; }) => {
    setResponse(event.target.value);
  }
 
  const [openDialog, setOpen] = useState(false);

  const addTask = () => {
   
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
 

  return(
    
    <div>
      <button id="add" onClick={addTask}>+</button>
      {openDialog && (
        <div className="dialog-box">
         <h2 className="elem">Current Task</h2>
   <h3 className="elem">Click the note to start typing</h3>
   
   <div className="stickynote">
   
        <input className="eleme" onChange={updateResponse} value={response} />
      
   
    </div>
          
          <button onClick={handleCloseDialog}>Close</button>
        </div>
      )}
    </div>
  )


}





