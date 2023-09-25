import axios from 'axios';

const propertyRequest = {
  getAllData: async () => {
    const response = await axios.get('http://localhost:1337/property-file/find');
    return response.data;
  },
};

export default propertyRequest;