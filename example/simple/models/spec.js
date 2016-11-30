const { Schema } = require('normalizr');
const { addModel } = require('../../../src');

const specSchema = new Schema('spec');

exports.schema = specSchema;
exports.model = addModel(specSchema);
