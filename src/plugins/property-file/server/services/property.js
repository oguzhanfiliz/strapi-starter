'use strict';

module.exports = ({strapi}) => ({

   async find(query){
      return await strapi.entityService.findMany("plugin::property-file.property",query);
   },

   async findNibe(query){
      let data = await strapi.entityService.findMany("plugin::property-file.property",query);
      const jsonObject = {};
      data.forEach((item) => {
        jsonObject[item.key] = item.value;
      });
      return JSON.stringify(jsonObject);;
   },


   async delete(id)
   {
      return await strapi.entityService.delete("plugin::property-file.property",id);
   },
   async create(body)
   {
      return await strapi.entityService.create("plugin::property-file.property",body);
   },
   async update(id,body)
   {
      return await strapi.entityService.update("plugin::property-file.property",id,body);
   },
   async toggle(id)
   {
      const result = await strapi.entityService.findOne("plugin::property-file.property",id);
      return await strapi.entityService.update("plugin::property-file.property",id,{value:!result.value});
   },
});