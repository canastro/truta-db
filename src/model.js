const db = require('./db');
const Query = require('./query');

const { normalize, arrayOf } = require('normalizr');
const values = require('lodash/values');

class Model {
    constructor (name, schema) {
        this.name = name;
        this.ids = `${name}Ids`;
        this.schema = schema;

        db[this.name] = {};
        db[this.ids] = [];
    }

    add (items) {
        let schema;
        if (!Array.isArray(items)) {
            schema = this.schema;
        } else {
            schema = arrayOf(this.schema);
        }

        // Normalize and store all entities
        const normalized = normalize(items, schema);
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

    getAll () {
        const query = new Query(this.schema, this.name, this.ids);
        return query.getAll();
    }

    findByIds (ids) {
        const query = new Query(this.schema, this.name, this.ids);
        return query.findByIds(ids);
    }

    find (id) {
        const query = new Query(this.schema, this.name, this.ids);
        return query.find(id);
    }

    where (params) {
        const query = new Query(this.schema, this.name, this.ids);
        return query.where(params);
    }
}

module.exports = Model;
