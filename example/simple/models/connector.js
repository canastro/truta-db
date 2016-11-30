const { Schema } = require('normalizr');
const { addModel } = require('../../../src');

const connectorSchema = new Schema('connector');

exports.schema = connectorSchema;
exports.model = addModel(connectorSchema);
