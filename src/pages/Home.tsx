import { useEffect, useState } from "react"
import customFetch from "../utils/axios"

const Home = () => {
  const [data1, setData] = useState([])
  useEffect(() =>{
    const fetchData = async() =>{
      const resp = await customFetch.get("/user")
      const data = resp.data
      setData(data)
    }
    fetchData()
  },[])
  console.log(data1)
  return (
    <div>Home</div>
  )
}

export default Home