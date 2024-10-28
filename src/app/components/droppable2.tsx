import {useDroppable} from "@dnd-kit/core";
import {FC, SetStateAction, useEffect} from 'react';
import { DialogProvider, DialogContext } from 'D:/College/Kanban/workingproject/nexus/src/app/context/Context';

import { useContext} from 'react';
import { useState } from "react";



interface ICartDroppable2 {
    items: string ;
}

const CartDroppable2: FC<ICartDroppable2> = (props) => {
    const {setNodeRef} = useDroppable({
        id: "cart-droppable2"
    });

   
    const {progTasks,setProgTasks} = useContext(DialogContext);
    const{checkBox2,afterDrag2,doneTask,editdTask}=useContext(DialogContext);
    const [checkingList, setCheckingList] = useState({
        tasks: [],
    });
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
        const convert = ()=>{
            afterDrag2();
            
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
   };

   useEffect(() => {
  
    
    if((!prepList)&&(checkingList.tasks.length===0)){
        const newlist=[...doneTask,props.items]
        editdTask(newlist);
        editTask({
            tasks:[],
        })
        setProgTasks("");
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
         <p style={{fontWeight: 'bold', textAlign: 'center'}}>{progTasks}
        </p> 
        {checkBox2 && (
        <div >  
         What do you need to do?
         <input onChange={updateResponse} value={response} onKeyDown={handleKeyPress}placeholder="Type Here"/>
     
         
  {!prepList && (
    <><div>
                                {taskList.tasks.map((task,k) => <li key={k}>•{task}</li>
                                )}</div><button onClick={convert}>Convert to checkbox</button></>
        
      )}
     
         
 
        </div>
      )}
       {(!checkBox2&&!prepList) && (
    
    <><div>
    {taskList.tasks.map((task,i) => <li key={i}><Aabha name={task} append={append} remove={remove}/></li>
    )}</div></>                      
        
      )}
       </div>
        </>
    );
};

export default CartDroppable2;

interface GreetingProps2 {
    name: string; // The name prop
    append: (taskname: string) => void;
    remove: (taskname: string) => void;
   
  
    
}

const Aabha: React.FC<GreetingProps2> = ({ name,append,remove}) => {
    const emptySquare = '\u25A1';
    const filledSquare = '\u25A0';
    const [isChecked,checkMark]=useState(false);
    const { preplist,setpTask} = useContext(DialogContext);
    const {checkBox2} = useContext(DialogContext); 
  
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
