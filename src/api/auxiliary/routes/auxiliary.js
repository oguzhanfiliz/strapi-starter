'use strict';

/**
 * auxiliary router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::auxiliary.auxiliary');
