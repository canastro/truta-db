const { Schema, arrayOf } = require('normalizr');
const { addModel } = require('../../../src');

const brandSchema = require('./brand').schema;
const connectorSchema = require('./connector').schema;

const tvSchema = new Schema('tv');
tvSchema.define({
    brand: brandSchema,
    connector: arrayOf(connectorSchema)
});

const tvModel = addModel(tvSchema);

exports.model = tvModel;
exports.schema = tvSchema;
