import axios from "axios";

const siteUrl = (window.location.origin === "http://localhost:8000") ? "http://localhost:1337" : window.location.origin; // for development mode not run 8000 port...
const propertyRequest = {
  getAllData: async (e) => {
    if(e !== undefined) {  

      const response = await axios.get(
        `${siteUrl}/property-file/find?locale=${e}`
      );
      return response.data;
    }
    const response = await axios.get(
      `${siteUrl}/property-file/find`
    );
    return response.data;
  },
  addData: async (key, value) => {
    const data = {
      key,
      value,
    };
    const response = await axios.post(
      `${siteUrl}/property-file/create`,
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
      `${siteUrl}/property-file/update/${id}`,
      {
        data,
      },
    );
  
    return response.data;
  },
  

  deleteData: async (id) => {
    const response = await axios.delete(
      `${siteUrl}/property-file/delete/${id}`
    );
    return response.data;
  },

  toogleData: async (id) => {
    const response = await axios.put(
      `${siteUrl}/property-file/toggle/${id}`
    );
    return response.data;
  },
};

export default propertyRequest;
