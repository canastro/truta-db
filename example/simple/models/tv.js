const { Schema, arrayOf } = require('normalizr');
const { addModel } = require('../../../src');

const brandSchema = require('./brand').schema;
const specSchema = require('./spec').schema;

const tvSchema = new Schema('tv');
tvSchema.define({
    brand: brandSchema,
    spec: arrayOf(specSchema)
});

const tvModel = addModel(tvSchema);

exports.model = tvModel;
exports.schema = tvSchema;
