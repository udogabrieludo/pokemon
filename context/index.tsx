import React, {createContext, useReducer} from 'react';


type ContextProps = {
    children:React.ReactNode
}

interface Item {
    name: string;
    url: string;

  }
  interface ItemDetail {
    name: string;
    url: string;
    species:any;
    stats:[];
    types:[];
    weight:number;
    moves:[]
  }

  type initialStateType = {
    item: Item[],
    itemDetail: ItemDetail
  }

    type ItemContextType ={
        state: initialStateType,
        dispatch:React.Dispatch<ActionType>
    }
const initialState = {
    item: [],
    itemDetail:{}
  
}


export type ActionType = {
    type: string,
    payload: any
   }

export const Context = createContext<ItemContextType | null>(null);


 const reducer = (state: initialStateType, action: ActionType)=>{

    switch(action.type){
        case 'GET_POKEMON':
            return {...state, item: action.payload};
        case 'GET_POKENMON_DETAIL':
            return {...state, itemDetail: action.payload};
        default:
          return  state;
    }
}


const Provider = ({children}: ContextProps) => { 

const [state, dispatch ] = useReducer(reducer, initialState)

  return <Context.Provider value={{state, dispatch}} >
                  {children}
        </Context.Provider>;
};

export default Provider;
