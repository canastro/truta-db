const Model = require('./model');
const db = require('./db');

exports.getDump = () => db;

exports.getModel = (name) => db.models[name];

/**
 * @name addModel
 * @param {Schema} schema
 * @returns {Model}
 * Given a normalizr schema a trutaDB Model is created
 */
exports.addModel = (schema) => {
    const name = schema._key;

    if (db.models[name]) {
        throw 'Model already exists...';
    }

    const newModel = new Model(name, schema);
    db.models[name] = newModel;

    return newModel;
};

/**
 * @name store
 * Stores the db in the browser's indexeddb
 */
exports.store = () => {
    throw 'not implemented';
};

/**
 * @name load
 * Loads the db from the browser's indexeddb
 */
exports.load = () => {
    throw 'not implemented';
};
