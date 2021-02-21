import React from'react';
import { useSelector } from 'react-redux';
import { adoptReducer } from '../store/adoptSlice';
import petListJson from "../pets.json";
function PetList(){
    const address=useSelector((state)=>{
        return state.adoptReducer.address
    })
    const contract=useSelector((state)=>{
        return state.adoptReducer.contract
    })
    return(
        <div>
    list of Items- address ={address};
   { petListJson.map((item)=>(
        <div>
            <div key={item.id} style={{border: "1px solid black", display: "inline-block", padding: "5px", margin: "5px"}}  >
           <h3> {item.name}</h3>
           
           <div>
              <img alt="140x140" src={item.picture} style={{width:"300px"}} />
              <br/><br/>
              <strong>Breed</strong>: <span >Golden Retriever</span><br/>
              <strong>Age</strong>: <span >3</span><br/>
              <strong>Location</strong>: <span >Warren, MI</span><br/>
              <button  type="button"onClick={async()=>{
                  console.log("ids",item.id);
                  const result=await contract.methods.adopt(item.id).send({from:address});
                  console.log("id with address",result);
                  const adopterList=await contract.methods.getAdopters().call();
                  console.log("adopterlist",adopterList);
              }}>Adopt</button>
              </div>
        </div>
        </div>
       
   ))}
   </div>

    
    )}
    export default PetList;