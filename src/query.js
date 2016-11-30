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

    /**
     * @name include
     * @param {Array} includes
     * @returns {Query}
     * Load related models
     */
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

    /**
     * @name getAll
     * @returns {Query}
     * Gets all items for the selected model
     */
    getAll () {
        this.results = db[this.modelIds].map((id) => db[this.modelName][id]);
        return this;
    }

    /**
     * @name find
     * @param {Number|String} id
     * @returns {Query}
     * Finds a element by id
     */
    find (id) {
        this.results = db[this.modelName][id];
        return this;
    }

    /**
     * @name find
     * @param {Array} ids
     * @returns {Query}
     * Finds elements by a list of ids
     */
    findByIds (ids) {
        this.results = ids.map(id => db[this.modelName][id]);
        return this;
    }

    /**
     * @name where
     * @param {Object|Function} query
     * @returns {Query}
     * Wrapper around lodash's filter function
     */
    where (query) {
        const array = values(db[this.modelName]);
        this.results = filter(array, query);
        return this;
    }

    /**
     * @name execute
     * @returns {Array|Object}
     * Returns results
     */
    execute() {
        return this.results;
    }
}

module.exports = Query;
