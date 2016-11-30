const Model = require('./model');
const db = require('./db');

exports.schema = (name, schema) => {
    if (!schema) {
        return db.models[name];
    }

    if (db.models[name]) {
        throw 'Model already exists...';
    }

    const newModel = new Model(name, schema);
    db.models[name] = newModel;

    return newModel;
};

exports.store = () => {
    throw 'not implemented';
};

exports.load = () => {
    throw 'not implemented';
};
