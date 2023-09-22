"use strict";

module.exports = {
   async find(ctx) {
      try{
          return await strapi.plugin("property-file").service("property").find(ctx.query);
      }catch(err){
        ctx.throw(500, err);
      }
    }
};
