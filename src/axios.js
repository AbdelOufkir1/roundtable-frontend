import axios from 'axios';

const AxiosCalls = {};


AxiosCalls.getPing = () => {
    axios.get('http://localhost:3001/ping')
    .then(response => {
      console.log(response.data);
    })
  }

AxiosCalls.getDebate= () => {
    axios.get('http://localhost:3001/debate/all')
        .then( response => {
            console.log(response.data)
        })
}


export default AxiosCalls;