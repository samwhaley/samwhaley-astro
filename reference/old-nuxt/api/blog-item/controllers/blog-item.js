'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

	// async findOne(ctx) {
 //    const { id } = ctx.params;

 //    const entity = await strapi.services["blog-item"].findOne({ id });
 //    const sanitized =  sanitizeEntity(entity, { model: strapi.models["blog-item"] });

 //    const newView = sanitized.likes + 1;
 //    strapi.query('blog-item').update({ id: sanitized.id }, {
 //      likes: newView
 //    });

 //    return sanitized;
	    
	// },

	async update(ctx) {
	    const { id } = ctx.params;

	    let addLikes = ctx.request.body.likes + 1;

	    let entity;
	    if (ctx.is('multipart')) {
	      const { data, files } = parseMultipartData(ctx);
	      entity = await strapi.services["blog-item"].update({ id }, data, {
	        files,
	      });
	    } else {
	        entity = await strapi.services["blog-item"].update({ id }, { likes: addLikes });
	    }

	    return sanitizeEntity(entity, { model: strapi.models["blog-item"] });
	},


};
