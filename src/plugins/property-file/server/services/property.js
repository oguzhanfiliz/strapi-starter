'use strict';

module.exports = ({strapi}) => ({
   async find(query){
      let data = await strapi.entityService.findMany("plugin::property-file.property",query);
      let returnData =  [];
      data.map((item) => {
         //array push item to returnData
         returnData.push(item.key + " : " + item.value);
      });
      return returnData;
      return await strapi.entityService.findMany("plugin::property-file.property",query);
   }
    
});

