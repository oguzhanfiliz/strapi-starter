'use strict';

/**
 * auxiliary service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auxiliary.auxiliary');
