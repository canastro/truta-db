const filter = require('lodash/filter');
const values = require('lodash/values');

const db = require('./db');

class Query {
    constructor(schema, name, ids) {
        this.modelName = name;
        this.modelIds = ids;
        this.results = null;

        this.schema = schema;
    }

    include (includes) {
        this.results = this.results.map((item) => {
            const newItem = Object.assign({}, item);

            includes.forEach((include) => {
                const includeModel = db.models[include];

                if (Array.isArray(item[include])) {
                    newItem[include] = includeModel.findByIds(item[include]).execute();
                } else {
                    newItem[include] = includeModel.find(item[include]).execute();
                }
            });

            return newItem;
        });

        return this;
    }

    getAll () {
        this.results = db[this.modelIds].map((id) => db[this.modelName][id]);
        return this;
    }

    find (id) {
        this.results = db[this.modelName][id];
        return this;
    }

    findByIds (ids) {
        this.results = ids.map(id => db[this.modelName][id]);
        return this;
    }

    where (query) {
        const array = values(db[this.modelName]);
        this.results = filter(array, query);
        return this;
    }

    execute() {
        return this.results;
    }
}

module.exports = Query;
