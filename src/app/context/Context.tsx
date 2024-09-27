import { createContext, SetStateAction} from 'react';
import { useState } from 'react';

interface DialogContextType {
    openDialog: boolean;
    handleClick: () => void;
    handleCloseDialog: () => void;
    setResponse: (response: string) => void;
    response: string;
    updateResponse: (event: React.ChangeEvent<HTMLInputElement>) => void;
    taskList: { tasks: string[] };
    editTask: (taskList: { tasks: string[] }) => void;

  }
  const defaultDialogContext: DialogContextType = {
    openDialog: false,
    handleClick: () => {},
    handleCloseDialog: () => {},
    setResponse: (response: string) => {},
    response: '',
    updateResponse: (event: React.ChangeEvent<HTMLInputElement>) => {},
    taskList: { tasks: [] },
    editTask: (taskList: { tasks: string[] }) => {}
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
 

  return (
    <DialogContext.Provider value={{ openDialog, handleClick, handleCloseDialog,setResponse, response, updateResponse, taskList, editTask}}>
      {children}
    </DialogContext.Provider>
  );
};

export { DialogProvider, DialogContext };