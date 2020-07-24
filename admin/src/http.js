import axios from 'axios'

let http=axios.create({
  baseURL:"http://localhost:3000/admin/api/rest"
})

export default http