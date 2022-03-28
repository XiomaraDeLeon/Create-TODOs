import React from "react";

function useLocalStorage(itemName, inicialValue){
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [item, setItem] = React.useState(inicialValue);

    React.useEffect(() => {
      setTimeout(() => {
        try{
          const localStorageItem = localStorage.getItem(itemName)
          let parsedItem;
          // throw "Error"
          if(!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(inicialValue));
            parsedItem = inicialValue;
          }
          else{
            parsedItem = JSON.parse(localStorageItem)
          }
          setItem(parsedItem);
          setLoading(false);
        }

        catch(error) {
          setError(error)
          setLoading(false)
        }

      },2000)
    })

    const saveItem = (newTodos) => {
      try{
        const stringifiedItem = JSON.stringify(newTodos);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newTodos);
      }
      catch(error){
        setError(error)
      }
    }

    return{
      item,
      saveItem,
      loading,
      error,
    }
}

export {useLocalStorage}