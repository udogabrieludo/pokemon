import type { NextPage } from 'next'
import {useContext, useEffect, useState} from 'react';
import Head from 'next/head';
import { Context } from '../context';
import Link from 'next/link';  
import axios from 'axios';
import ReactPaginate from 'react-paginate'

const Home: NextPage = () => {

  const [count,setCount] = useState<number>(0)
  const [offset, setOffset] = useState<number>(0)

  const context = useContext(Context);

  if (!context) return null;

  const {state:{item}, dispatch} = context;
  const  Paginate = ({selected}:any) => {
    const page:number = selected * limit
    setOffset(page)
  
  }
 
 const limit:number = 16

 

  useEffect(() => {
    async function getResults() {
      const results = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pokemon?limit=${limit}&offset=${offset}`);
     dispatch({
      type:"GET_POKEMON",
      payload:results?.data?.results
    });
 
    setCount(results?.data.count)
    }
    
    getResults();
  },[offset])


const pageNum:any = Math.ceil(count/20)


  
  return (
    <div className="layout">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div>
           {item.map((item:{name:string, url:string}, i:any)=>(
              <div key={i} className='pokemon_list'>
                <Link href={`/detail/${i+1}`}>
                     <div>
                     <h1 >{item?.name}</h1>
                       <p>{item?.url}</p>
                     </div>
                </Link>
             
              </div>

           ))}
        </div>
        <div>
          <ReactPaginate onPageChange={Paginate}
              pageCount={pageNum} 
              containerClassName={"paginationBttns"}
             previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"} 
           />
        </div>
    </div>
  )
}



export default Home
