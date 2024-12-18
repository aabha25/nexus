import {useDroppable} from "@dnd-kit/core";
import {FC, SetStateAction, useEffect} from 'react';
import { DialogProvider, DialogContext } from 'C:/Users/Rashmi Abhyankar/Desktop/web/kanban2/kb/src/app/context/Context';

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


    
   const leng = taskList.tasks.length;
  const len=leng*55;
   let string2;
   string2=len.toString();
   string2=string2+"px";
  
    return(
        <>
        <div  ref={setNodeRef}
        style={{
            width: '190px', // Increase the width of the droppable area
            height: '300px', // Increase the height of the droppable area
             position: 'fixed',
             marginLeft:'22px',            
             
          }}
        >

            <div id="spiral" style={{width:'190px',height:'300px',}}>
            

            {/* progress bar for in progress */}
         <p style={{fontWeight: 'bold', textAlign: 'center', 
            zIndex:4,position:'absolute', top:'45px', left:'0px',  width: '100%',
            backgroundColor: 'rgba(255, 0, 0, 0)',}}>{progTasks}
        </p> 
<p style={{backgroundColor: checkBox2 ? '#5ec5ee' : 'rgba(255, 0, 0, 0)', color: checkBox2 ? '#5ec5ee' : 'rgba(255, 0, 0, 0)',zIndex:2,position:'absolute',
             top:'45px', width: '95%', borderRadius:'5px', marginLeft:'5px',
             }}> hi
        </p> 
        <p style={{backgroundColor: checkBox2 ? 'rgba(3, 90, 252, 0.8)': 'rgba(255, 0, 0, 0)', color: checkBox2 ? 'rgba(3, 90, 252, 0)' : 'rgba(255, 0, 0, 0)',zIndex:3,position:'absolute',
             top:'45px', width: '95%', borderRadius:'5px', marginLeft:'5px', width:prepList? '0%':string1,
             }}> hi
        </p> 
        {checkBox2 && (
        <>
                        
                          <input style={{width:'95%', marginTop:'75px',marginLeft:'5px', backgroundColor:"rgba(65, 138, 195, 0)",  border:'1px solid black', borderRadius:'5px',}} onChange={updateResponse} value={response} onKeyDown={handleKeyPress} placeholder="Type Here" />
                           
                           {/* background of checkboxes */}
                          <div style={{backgroundColor:'#f5f9fa', marginTop:'3px', width:'190px', height:string2, borderRadius:'10px',}}>
{!prepList && (
    <>
    {taskList.tasks.map((task, i) => <li style={{backgroundColor:"rgb(255,255,255,0)", width:'100px', marginLeft:'4px', }} key={i}><Aabha name={task} append={append} remove={remove} lremove={lremove}  check={checkingList.tasks} tasks={taskList.tasks} trial= {task}/></li>
    )}</>

)}</div>
</>
)}



</div>
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
        
        alignItems: 'center',
        
        width: '310px',
        
        
        backgroundColor:"rgba(255,255,255,0)",
        

        }}><button onClick={handlePress} style={{
            
            fontSize:'35px',
            
            
         }}>
            {isChecked && (
    
         <div style={{backgroundColor:"rgba(255,255,255,0)",}}> {filledSquare}</div>             
        
      )}
       {!isChecked && (
    
    <div style={{backgroundColor:"rgba(255,255,255,0)", }}> {emptySquare}</div>             
   
 )}
            </button><div style={{textDecoration: !isChecked ? 'none' : 'line-through', backgroundColor:'rgba(255,255,255,0)',}}>{name}</div>
            <div style={{ display: 'flex',
        justifyContent: 'right',
        
        backgroundColor:"rgba(255,255,255,0)",       
        width: '25px',
        }}><button onClick={handlelPress} >x</button></div>
            </div>
            
            </>
       
    );
};
