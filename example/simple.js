const { arrayOf } = require('normalizr');

const { schema } = require('../src');

const specModel = schema('spec', {});
const brandModel = schema('brand', {});
const tvModel = schema('tv', {});

tvModel.schema.define({
    brand: brandModel.schema,
    spec: arrayOf(specModel.schema)
});

tvModel.add({
    id: 1,
    cenas: 'coisas',
    brand: {
        id: 1,
        name: 'grunding'
    },
    spec: [{
        id: 1,
        size: '10"'
    }, {
        id: 2,
        hd: true
    }]
});
tvModel.add([{
    id: 2,
    cenas: 'cenas',
    brand: {
        id: 1,
        name: 'grunding'
    },
    spec: [{
        id: 1,
        size: '10"'
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

const specs = specModel.getAll().execute();
console.log('specs: ', specs);
console.log('################################');

const tvsWithBrandAndSpec = tvModel.getAll().include(['brand', 'spec']).execute();
console.log('tvsWithBrandAndSpec: ', tvsWithBrandAndSpec);
