"use strict";

module.exports = {
   async find(ctx) {
      try{
          return await strapi.plugin("property-file").service("property").find(ctx.query);
      }catch(err){
        ctx.throw(500, err);
      }
    },  

    async findNibe(ctx) {
      try{
          return await strapi.plugin("property-file").service("property").find(ctx.query);
      }catch(err){
        ctx.throw(500, err);
      }
    },

    async delete(ctx)
    {
      try {
        ctx.body = await strapi.plugin("property-file").service("property").delete(ctx.params.id);
      } catch (err) {
        ctx.throw(500, err);
      }
    },
    async create(ctx)
    {
      try {
        ctx.body = await strapi.plugin("property-file").service("property").create(ctx.request.body);
      } catch (err) {
        ctx.throw(500, err);
      }
    },
    async update(ctx)
    {
      try {
        ctx.body = await strapi.plugin("property-file").service("property").update(ctx.params.id,ctx.request.body);
      } catch (err) {
        ctx.throw(500, err);
      }
    },
    async toggle(ctx){
      try {
        ctx.body = await strapi.plugin("property-file").service("property").toggle(ctx.params.id);
      } catch (err) {
        ctx.throw(500, err);
      }
    }

};
