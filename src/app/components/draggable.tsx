import { useDraggable} from "@dnd-kit/core";
import { CSS} from "@dnd-kit/utilities";
import {FC} from "react";
import React from "react";
import Image from "next/image";
import blue from './blue.png';

interface IToDraggable {
    items: string;
}

const FruitDragable: FC<IToDraggable> = (props) => {
    const { attributes, listeners, setNodeRef, transform} = useDraggable({
        id:props.items ,
        data: {title: props.items}
    });

    return(
        <div
        ref={setNodeRef}
        style={{transform: CSS.Translate.toString(transform),
            backgroundColor:`var(--color3)`,
        }}
        {...attributes}
    {...listeners}        >
        <div  id="bluepostit" style={{height: '100px',
  width: '105px',
 
  backgroundColor: `var(--color3)`,
  backgroundPosition: 'center',
  margin: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  paddingLeft: '8px',
  paddingRight: '5px',
  textAlign: 'center',
  fontFamily: `'Times New Roman', Times, serif`,
            backgroundImage: `url(${blue})`,
    backgroundSize: 'cover',
    
   
    }}>{props.items}</div>
    
        </div>
       
    );
};

export default FruitDragable;