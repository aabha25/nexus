import {useDroppable} from "@dnd-kit/core";
import {FC, SetStateAction, useEffect} from 'react';
import { DialogProvider, DialogContext } from 'D:/College/Kanban/workingproject/nexus/src/app/context/Context';

import { useContext} from 'react';
import { useState } from "react";
import { after } from "node:test";
import { SERVER_PROPS_EXPORT_ERROR } from "next/dist/lib/constants";

interface ICartDroppable {
    items: string ;
}

const CartDroppable: FC<ICartDroppable> = (props) => {
    const {setNodeRef} = useDroppable({
        id: "cart-droppable"
    });

   
    const {checkBox} = useContext(DialogContext); 
    const { preppedTask,editpTask,prepTasks,setPrepTask} = useContext(DialogContext);//a thing that lives in context, updated when checkingList length is 0
   //no need to import as context, can live here as
    const [checkingList, setCheckingList] = useState({
        tasks: [],
    });
    const {afterDrag} = useContext(DialogContext);
    
    
     //taking input for checkboxes
    const[taskList, editTask] = useState({
        tasks: [],
    
      });
      const [prepList ,setPrepList] = useState(true);
      const [response, setResponse] = useState("");
    
    const updateResponse= (event: { target: { value: SetStateAction<string>; }; }) => {
        setResponse(event.target.value);
    };
    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            let ntasks = [...taskList.tasks, response];
            editTask({
                tasks: ntasks,
               });
               
       setResponse("");
       setPrepList(false);
       setCheckingList({
        tasks:ntasks,
       });
     
      
        }};
        //convert to checkbox
        const convert = ()=>{
            afterDrag();
            
        };
       

        //append
        const append = (taskname: string) =>{
            const nlist = [...checkingList.tasks,taskname]; // Add the name to the list
                setCheckingList({
                    tasks:nlist,
                });
           }

        //remove
        const remove = (taskname:string) =>{
  
            const index = checkingList.tasks.findIndex((tab) => tab === taskname);
            const nlist = [...checkingList.tasks.slice(0, index), ...checkingList.tasks.slice(index + 1)];
            setCheckingList({
                tasks:nlist,
            });
           }
        //what I used instead of useEffect - skip
        
        //the useEffect
        useEffect(() => {
  
           if((!prepList)&&(checkingList.tasks.length===0)){
            const newlist=[...preppedTask,props.items]
            editpTask(newlist);
            editTask({
                tasks:[],
            })
            setPrepTask("");
            setPrepList(!prepList);
           }
          }, [checkingList.tasks]
          
          );
    return(
        <>
        <div ref={setNodeRef}
        style={{
            width: '300px', // Increase the width of the droppable area
            height: '200px', // Increase the height of the droppable area
             border: "1px solid black",
          }}
        >
         <p style={{fontWeight: 'bold', textAlign: 'center'}}>{prepTasks}
        </p> 
        {checkBox && (
        <div >  
         What do you need to prepare?
         <input onChange={updateResponse} value={response} onKeyDown={handleKeyPress}placeholder="Type Here"/>
     
         
  {!prepList && (
    <><div>
                                {taskList.tasks.map((task,k) => <li key={k}>•{task}</li>
                                )}</div><button onClick={convert}>Convert to checkbox</button></>
        
      )}
        </div>
      )}
       {(!checkBox&&!prepList) && (
    
    <><div>
    {taskList.tasks.map((task,i) => <li key={i}><Aabha name={task} append={append} remove={remove}/></li>
    )}</div></>                      
        
      )}
       
        </div>
       
        </>
    );
};

export default CartDroppable;
interface GreetingProps {
    name: string; // The name prop
    append: (taskname: string) => void;
    remove: (taskname: string) => void;
   
  
    
}

// Create the functional component
const Aabha: React.FC<GreetingProps> = ({ name,append,remove}) => {
    const emptySquare = '\u25A1';
    const filledSquare = '\u25A0';
    const [isChecked,checkMark]=useState(false);
    const { preplist,setpTask} = useContext(DialogContext);
    const {checkBox} = useContext(DialogContext); 
  
    const handlePress = () => {
        // Determine the new checked state
        const newCheckedState = !isChecked;
        checkMark(newCheckedState);
    
        if (!newCheckedState) {
           append(name);
        } else {
          remove(name)
        }
        
    };
    
    return (
      <><div style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        }}><button onClick={handlePress} style={{
            
            fontSize:'35px',
         }}>
            {isChecked && (
    
         <div> {filledSquare}</div>             
        
      )}
       {!isChecked && (
    
    <div> {emptySquare}</div>             
   
 )}
            </button><div style={{textDecoration: !isChecked ? 'none' : 'line-through',}}>{name}</div></div></>
       
    );
};
