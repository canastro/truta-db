const { Schema } = require('normalizr');
const { addModel } = require('../../../src');

const brandSchema = new Schema('brand');

exports.schema = brandSchema;
exports.model = addModel(brandSchema);
