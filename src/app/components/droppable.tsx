import {useDroppable} from "@dnd-kit/core";
import {FC} from 'react';

interface ICartDroppable {
    items: string ;
}

const CartDroppable: FC<ICartDroppable> = (props) => {
    const {setNodeRef} = useDroppable({
        id: "cart-droppable"
    });
    return(
        <>
        <div ref={setNodeRef}
        style={{
            width: '300px', // Increase the width of the droppable area
            height: '200px', // Increase the height of the droppable area
             border: "1px solid black",
          }}
        >
         <p style={{fontWeight: 'bold', textAlign: 'center'}}>{props.items}</p> 
        </div>
        </>
    );
};

export default CartDroppable;
