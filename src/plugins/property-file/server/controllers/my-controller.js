'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('property-file')
      .service('myService')
      .getWelcomeMessage();
  },
});
