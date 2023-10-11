import axios from "axios";

const propertyRequest = {
  getAllData: async (e) => {
    if(e !== undefined) {  

      const response = await axios.get(
        `http://localhost:1337/property-file/find?locale=${e}`
      );
      return response.data;
    }
    const response = await axios.get(
      "http://localhost:1337/property-file/find"
    );
    return response.data;
  },
  addData: async (key, value) => {
    const data = {
      key,
      value,
    };
    const response = await axios.post(
      "http://localhost:1337/property-file/create",
      {
        data,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  },
  updateData: async (id, key, value) => {
    console.log('api.js: ', key, value);
    const data = {
      key,
      value
    };
    const response = await axios.post(
      `http://localhost:1337/property-file/update/${id}`,
      {
        data,
      },
    );
  
    return response.data;
  },
  

  deleteData: async (id) => {
    const response = await axios.delete(
      `http://localhost:1337/property-file/delete/${id}`
    );
    return response.data;
  },

  toogleData: async (id) => {
    const response = await axios.put(
      `http://localhost:1337/property-file/toggle/${id}`
    );
    return response.data;
  },
};

export default propertyRequest;
