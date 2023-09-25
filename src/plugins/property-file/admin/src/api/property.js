import axios from 'axios';

const propertyRequest = {
  getAllData: async () => {
    const response = await axios.get('http://localhost:1337/property-file/find');
    return response.data;
  },
  addData : async (key, value) => {
    const temp ={
      "data":{
        "component": {
              key: key,
              value: value
        }
}
    }
    const response = await axios.post('http://localhost:1337/property-file/create', {
      temp
    });
    return response.data;
  },
  deleteData: async (id) => {
    const response = await axios.delete(`http://localhost:1337/property-file/delete/${id}`);
    return response.data;
  },
  updateData: async (id, key, value) => {
    const response = await axios.put(`http://localhost:1337/property-file/update/${id}`, {
      key: key,
      value: value,
    });
    return response.data;
  },
  toogleData: async (id) => {
    const response = await axios.put(`http://localhost:1337/property-file/toggle/${id}`);
    return response.data;
  },

};

export default propertyRequest;