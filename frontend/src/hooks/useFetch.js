import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useFetch = async (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useAuthContext();
  
  const Fetch = async () => {
     if (!user) 
      {
          setError("Request not authenticated");
          return;
      }
      
    const abortCont = new AbortController();

    fetch(url ,{ signal: abortCont.signal , headers: {'Authorization': `Bearer ${user.json.token}`}})
    .then(res => {
    if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
    } 
    return res.json();
    })
    .then(data => {
    setIsPending(false);
    setData(data);
    setError(null);
    })
    .catch(err => {
    if (err.name === 'AbortError') {
        console.log('fetch aborted')
    } else {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
    }
    });

    // abort the fetch
    return () => abortCont.abort();
  }

  return { data, isPending, error, Fetch };
}
 
export default useFetch;