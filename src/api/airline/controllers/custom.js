'use strict';
/**
 * airline controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const modelUid = 'api::airline.airline';
module.exports = createCoreController(modelUid , ({ strapi }) => ({
    async property(ctx) {
        return { message: 'Hello World!'}
        console.log('property');
    }
}));
