import axios from "axios"


const userWishlist = async () => {

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    const data = await axios.get(`/api/getWishList/${user.userId}`).then(response => response.data)
    // console.log(data);
    return data
}


export default userWishlist

  