const trutaDB = require('../../src');
const connectorModel = require('./models/connector').model;
const brandModel = require('./models/brand').model;

// Possible to get the model by calling getModel to trutaDB entry point
require('./models/tv');
const tvModel = trutaDB.getModel('tv');

tvModel.add({
    id: 1,
    cenas: 'coisas',
    brand: {
        id: 1,
        name: 'grunding'
    },
    connector: [{
        id: 1,
        name: 'hdmi xso'
    }, {
        id: 2,
        spec: 'vga sja'
    }]
});

tvModel.add([{
    id: 2,
    cenas: 'cenas',
    brand: {
        id: 1,
        name: 'grunding'
    },
    connector: [{
        id: 1,
        name: 'hdmi xso'
    }]
}, {
    id: 3,
    cenas: 'cenas',
    brand: {
        id: 2,
        name: 'sony'
    }
}, {
    id: 4,
    cenas: 'coisas',
    brand: {
        id: 3,
        name: 'samsung'
    }
}]);

const tvs = tvModel.getAll().execute();
console.log('all: ', tvs);
console.log('################################');

const tv1 = tvModel.find(1).execute();
console.log('tv1: ', tv1);
console.log('################################');

const tvBigger2 = tvModel.where((item) => item.id > 2).execute();
console.log('tvBigger2: ', tvBigger2);
console.log('################################');

const tvCenas = tvModel.where({ cenas: 'cenas' }).execute();
console.log('tvCenas: ', tvCenas);
console.log('################################');

const brands = brandModel.getAll().execute();
console.log('all brands: ', brands);
console.log('################################');

const tvsWithBrand = tvModel.getAll().include(['brand']).execute();
console.log('tvsWithBrand: ', tvsWithBrand);
console.log('################################');

const connectors = connectorModel.getAll().execute();
console.log('connectors: ', connectors);
console.log('################################');

const tvsWithBrandAndSpec = tvModel.getAll().include(['brand', 'connector']).execute();
console.log('tvsWithBrandAndSpec: ', tvsWithBrandAndSpec);
console.log('################################');

const newTvs = tvModel.update({ cenas: 'cenas' }, (item) => Object.assign({}, item, { cenas: 'blabla' }));
console.log('newTvs: ', newTvs);
console.log('################################');

const allNewTvs = tvModel.getAll().execute();
console.log('allNewTvs: ', allNewTvs);
console.log('################################');

console.log('db: ', trutaDB.getDump().tv);
