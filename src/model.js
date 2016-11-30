const db = require('./db');
const Query = require('./query');

const { normalize, arrayOf } = require('normalizr');
const values = require('lodash/values');

/**
 * @name getSchema
 * @param {Array|Object} items
 * @returns {Object} schema
 * If the provided items is a array then return a arrayOf schema
 * otherwise return the single instance of a schema
 */
const getSchema = (items) => {
    if (!Array.isArray(items)) {
        return this.schema;
    }

    return arrayOf(this.schema);
};

class Model {
    constructor (name, schema) {
        this.name = name;
        this.ids = `${name}Ids`;
        this.schema = schema;

        db[this.name] = {};
        db[this.ids] = [];
    }

    /**
     * @name store
     * @param {Object} normalized
     * Iterates the entities on the normalized response and stores it in the database
     * if the entity is not of this model, then calls the appropriate model
     */
    store (normalized) {
        Object.keys(normalized.entities).forEach((key) => {
            if (key === this.name) {
                db[key] = Object.assign(
                    {},
                    db[key],
                    normalized.entities[key]
                );

                return;
            }

            // Call specific model to add its values
            db.models[key].add(values(normalized.entities[key]));
        });

        // Merge ids without duplicates
        const ids = Array.isArray(normalized.result) ? normalized.result : [normalized.result];
        db[this.ids] = [...new Set([...db[this.ids] ,...ids])];
    }

    /**
     * @name add
     * @param {Object|Array} items
     * Normalizes items against the schema and stores it
     */
    add (items) {
        const schema = getSchema(items);

        // Normalize and store all entities
        this.store(normalize(items, schema));
    }

    /**
     * @name getAll
     * @returns {Query}
     * Returns a instance of Query with getAll method
     */
    getAll () {
        const query = new Query(this.schema, this.name, this.ids);
        return query.getAll();
    }

    /**
     * @name findByIds
     * @param {Array} ids
     * @returns {Query}
     * Returns a instance of Query with findByIds method
     */
    findByIds (ids) {
        const query = new Query(this.schema, this.name, this.ids);
        return query.findByIds(ids);
    }

    /**
     * @name find
     * @param {Number|String} id
     * @returns {Query}
     * Returns a instance of Query with find method
     */
    find (id) {
        const query = new Query(this.schema, this.name, this.ids);
        return query.find(id);
    }

    /**
     * @name where
     * @param {Object|String} params
     * Returns a instance of Query with where method
     */
    where (params) {
        const query = new Query(this.schema, this.name, this.ids);
        return query.where(params);
    }
}

module.exports = Model;
