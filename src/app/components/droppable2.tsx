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

            let mtasks = [...checkingList.tasks, response];
            setCheckingList({
             tasks:mtasks,
            });

            let ntasks = [...taskList.tasks, response];
            editTask({
                tasks: ntasks,
               });
               
       setResponse("");
       setPrepList(false);
      
     
      
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
    console.log("checkingList index"+index);
    if(index!=-1){
    const nlist = [...checkingList.tasks.slice(0, index), ...checkingList.tasks.slice(index + 1)];
    setCheckingList({
        tasks:nlist,
    });
   }
   };

   const lremove = (taskname:string) =>{
           

    const index = taskList.tasks.findIndex((tab) => tab === taskname);
    console.log("tasklist Index"+index);
 
   const nlist = [...taskList.tasks.slice(0, index), ...taskList.tasks.slice(index + 1)];
    editTask({
        tasks:nlist,
    });

    remove(taskname);
   

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
        afterDrag2();
       }
   }, [checkingList.tasks]
   
   );
   let a=taskList.tasks.length;
   let b=checkingList.tasks.length;
   let c=a-b;
   c=(c/a)*100;
   let string1;
   string1=c.toString();
    string1=string1+"%";
  
    return(
        <>
        <div ref={setNodeRef}
        style={{
            width: '300px', // Increase the width of the droppable area
            height: '200px', // Increase the height of the droppable area
             border: "1px solid black",
             position:'relative',
          }}
        >
         <p style={{fontWeight: 'bold', textAlign: 'center', 
            zIndex:4,position:'absolute', top:'0px', left:'0px',  width: '100%',
            backgroundColor: 'rgba(255, 0, 0, 0)',}}>{progTasks}
        </p> 
<p style={{backgroundColor: checkBox2 ? 'lightblue' : 'rgba(255, 0, 0, 0)', color: checkBox2 ? 'lightblue' : 'rgba(255, 0, 0, 0)',zIndex:2,position:'absolute',
             top:'0px', width: '100%',
             }}> hi
        </p> 
        <p style={{backgroundColor: checkBox2 ? 'rgba(3, 90, 252, 0.8)': 'rgba(255, 0, 0, 0)', color: checkBox2 ? 'rgba(3, 90, 252, 0)' : 'rgba(255, 0, 0, 0)',zIndex:3,position:'absolute',
             top:'0px', width:prepList? '0%':string1,
             }}> hi
        </p> 
        {checkBox2 && (
        <><div>
                        W
                           <div style={{border: "1px solid black",}}> <input style={{width:'100%',}} onChange={updateResponse} value={response} onKeyDown={handleKeyPress} placeholder="Type Here" /></div>


{!prepList && (
    <><div>
    {taskList.tasks.map((task, i) => <li key={i}><Aabha name={task} append={append} remove={remove} lremove={lremove}  check={checkingList.tasks} tasks={taskList.tasks} trial= {task}/></li>
    )}</div></>

)}
</div></>
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
    lremove: (taskname: string) => void;
       check: string[];
    tasks: string[];
    trial: string;
   
  
    
}

const Aabha: React.FC<GreetingProps2> = ({ name,append,remove,lremove, check,tasks,trial}) => {
    const emptySquare = '\u25A1';
    const filledSquare = '\u25A0';
    const [isChecked,checkMark]=useState(false);
    const { preplist,setpTask} = useContext(DialogContext);
    const {checkBox2} = useContext(DialogContext); 
  const [tapState, setTapState]=useState(false);
      useEffect(()=>{
       
        if(!tapState) checkMark(false);  
      
        const something = [...check];
        const index2 = something.findIndex((tab) => tab === name);
        if((index2===-1)) checkMark(true);
        else checkMark(false);
      },[check]);

       
   
       
       
      
    
      
      useEffect(()=>{
        
    
        if (!(trial in check)) checkMark(true);
        const something = [...check];
        const index2 = something.findIndex((tab) => tab === name);
        if((index2===-1)) checkMark(true);
        else checkMark(false);
      },[trial]);

      useEffect(()=>{
       
        if(!tapState) checkMark(false);
        const something = [...check];
        const index2 = something.findIndex((tab) => tab === name);
        if((index2===-1)) checkMark(true);
        else checkMark(false);
        

      },[tasks]);

    const handlePress = () => {
        //if(name in check){ remove(name);
        //checkMark(true);}
    //else {append(name); checkMark(false);}
        // Determine the new checked state
        setTapState(true);
        const newCheckedState = !isChecked;
        checkMark(newCheckedState);
    
        if (!newCheckedState) {
           append(name);
        } else {
          remove(name)
        }
       
        
    };

 

    const handlelPress = () => {
       setTapState(false);
        
        lremove(name);
       
    }
  
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
            </button><div style={{textDecoration: !isChecked ? 'none' : 'line-through',}}>{name}</div>
            <div style={{ display: 'flex',
        justifyContent: 'right',
       
        width: '25px',
        }}><button onClick={handlelPress}>x</button></div>
            </div>
            
            </>
       
    );
};
