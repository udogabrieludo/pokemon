import React from 'react';
import type { NextPage } from 'next'
import {useContext, useEffect} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import { Context } from '../../context';
import axios from 'axios'

const Detail: NextPage = () => {

  const {query} = useRouter()
  
    const contextDetail = useContext(Context);

    if (!contextDetail) return null;
  
    const {state:{itemDetail}, dispatch} = contextDetail;



    useEffect(() => {
      let pokeId = query.pokeId
      async function getResults() {
        const results = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pokemon/${pokeId}`);
       dispatch({
        type:"GET_POKENMON_DETAIL",
        payload:results?.data
      })
      console.log("DETAILS", results)
      }
      getResults()
    },[])

  return <div className="layout">

     <div>
       <h1>Species</h1>
       <div>
          <p><strong>Name</strong>:{itemDetail?.species?.name}</p>
          <p><strong>Url</strong>: {itemDetail?.species?.url}</p>
       </div>
     </div>
    <div>
      <h1>-Move</h1>
      <div>
        <div>{itemDetail?.moves?.map((move: {move:any}, i:any)=>(
           <div key={i}>
             <p><strong>Name</strong>: {move?.move.name}</p>
              <p><strong>Url</strong> :{move?.move.url}</p>
           </div>
        ))}</div>
      </div>

    </div>
     <div>
       <h1>Stats</h1>
        <div>
           {itemDetail?.stats?.map((stat:{base_stat:number,effort:number,stat:any}, i:any)=>(
             <div className="stats" key={i}>
               <p><strong>Name</strong> : {stat.stat?.name}</p>
               <p><strong>Base Stat</strong> : {stat.base_stat}</p>
               <p><strong>Effort</strong> : {stat.effort}</p>
               
             </div>
           ))}
        </div>
     </div>
     <div>
        <h1>Types</h1>
        <div>{itemDetail?.types?.map((item:{slot:number, type:any}, i:any) =>(
            <div key={i}>
               <p><strong>Name : {item.type.name}</strong></p>
                <p><strong>Slot : {item.slot}</strong></p>
               
            </div>
        ))}</div>
     </div>
   
     <div>
        <h1>Weight</h1>
        <p>{itemDetail?.weight}</p>
     </div>
   


  </div>;
};

export default Detail;
