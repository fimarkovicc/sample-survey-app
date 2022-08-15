import { useState, useEffect } from 'react'

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {    
      fetch(url, {method})
      .then(res => {
        if (!res.ok) throw Error('Error fetching data.') 
        return res.json()
      })
      .then(data => {
        setIsLoading(false)
        setData(data)
        setError(null)
      })
      .catch(err => {
          setIsLoading(false)
          setError(err.message)        
      })
    
  }, [url])

  return { data, isLoading, error }
}
 
export default useFetch