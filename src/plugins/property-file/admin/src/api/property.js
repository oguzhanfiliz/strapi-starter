import axios from 'axios';
import { request } from 'strapi-helper-plugin';


const propertyRequest = {
  getAllData: async () => {
    const response = await axios.get('/property-file/find');
    return response.data;
  },
};

export default propertyRequest;