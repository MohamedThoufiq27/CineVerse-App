import { useEffect, useState } from "react";



const useFetch = <T>(fetchMovies : ()=> Promise<T>,autoFetch=true) => {
    const [errorMessage, setErrorMessage] = useState<Error | null>(null);
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState(false);

    const fetchData = async () => {
        try{
            setLoading(true);
            setErrorMessage(null);

            const result = await fetchMovies();
            // console.log(result);
            setData(result);
            

        }catch(err){
            setErrorMessage(err instanceof Error ? err : new Error('An error occured'));
        }finally{
            setLoading(false);
        }

    }

    const reset = () => {
        setData(null);
        setErrorMessage(null);
        setLoading(false);
    }

    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[])

    return {data,loading,errorMessage,refetch:fetchData,reset};
}

export default useFetch;