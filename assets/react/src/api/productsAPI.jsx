import axios from "axios"


const productsData = async () => {
  // return axios.get("https://fakestoreapi.com/products/")
  // const data = await axios.get("http://localhost:8000/api/products/").then(response => response.data)
  const data = await axios.get("/api/products/").then(response => response.data)
  // console.log(data);
  return data
}


export default productsData