import Image from "next/image";

export default function Home() {
  return (
    <table>
      <tr>
        <td>To Do<button>+</button></td>
        <td>Preparing</td>
        <td>Prepared</td>
        <td>In Progress</td>
        <td>Done</td>
      </tr>
       <Todorow/>
      

    </table>
  );
}
function Todorow() {
  
  
 
  return(
   <tr>
    <td>data </td>
    <td>data </td>
    <td>data </td>
    <td>data </td>
    <td>data </td>
  
    
   </tr> 
   
  ) ;
 
}
