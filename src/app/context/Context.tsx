import { createContext, SetStateAction} from 'react';
import { useState } from 'react';
import { DndContext , DragEndEvent} from "@dnd-kit/core";

interface DialogContextType {
    openDialog: boolean;
    handleClick: () => void;
    handleCloseDialog: () => void;
    setResponse: (response: string) => void;
    response: string;
    updateResponse: (event: React.ChangeEvent<HTMLInputElement>) => void;
    taskList: { tasks: string[] };
    editTask: (taskList: { tasks: string[] }) => void;
    prepTasks: string;
    setPrepTask: (prepTask: string) => void;
    addPrepItem: (event: DragEndEvent) => void;

  }
  const defaultDialogContext: DialogContextType = {
    openDialog: false,
    handleClick: () => { },
    handleCloseDialog: () => { },
    setResponse: (response: string) => { },
    response: '',
    updateResponse: (event: React.ChangeEvent<HTMLInputElement>) => { },
    taskList: { tasks: [] },
    editTask: (taskList: { tasks: string[]; }) => { },
    prepTasks: '',
    setPrepTask: (prepTasks: string) => { },
    addPrepItem: function (event: DragEndEvent): void {
      throw new Error('Function not implemented.');
    }
  };

  const DialogContext = createContext<DialogContextType>(defaultDialogContext);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [openDialog, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    const ntasks = [...taskList.tasks, response];
    editTask(
        {
            tasks: ntasks,
        }
    )
    setResponse("");
    
    setOpen(false); };

    const [response, setResponse] = useState("");
  const updateResponse= (event: { target: { value: SetStateAction<string>; }; }) => {
          setResponse(event.target.value);
      };
      const[taskList, editTask] = useState({
        tasks: [],
    
      });
      const [prepTasks, setPrepTask] = useState("");
      const addPrepItem = (e: DragEndEvent) => {
        const newItem = e.active.data.current?.title;
        if (e.over?.id != "cart-droppable" || !newItem) return;
        setPrepTask(newItem);
        const index = taskList.tasks.findIndex((tab) => tab === newItem);
        let nlist = [...taskList.tasks];
        
        nlist= [...nlist.slice(0, index), ...nlist.slice(index + 1)];
     editTask({
      tasks: nlist,
     }); 
      }
      

  return (
    <DialogContext.Provider value={{ openDialog, handleClick, handleCloseDialog,setResponse, response, updateResponse, taskList,addPrepItem, editTask,prepTasks,setPrepTask}}>
      {children}
    </DialogContext.Provider>
  );
};

export { DialogProvider, DialogContext };