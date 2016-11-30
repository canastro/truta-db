# Goal
Normalize state (using [normlizr](https://github.com/paularmstrong/normalizr)) and store it in a database like structure providing some query helpers to fetch data.

# Why

Imagine the following data:

```
[{
    id: 2,
    stuff: 'cenas',
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
    stuff: 'cenas',
    brand: {
        id: 2,
        name: 'sony'
    },
    connector: [{
        id: 1,
        name: 'hdmi xso'
    }, {
        id: 2,
        spec: 'vga sja'
    }]
}, {
    id: 4,
    stuff: 'coisas',
    brand: {
        id: 3,
        name: 'grundig'
    }
}]
```

In the above example you are storing nested objects with repeated properties, this library aims to convert your object for the following structure.

```
{
   connector:{
      '1': { id:1, name:'hdmi xso' },
      '2':{ id:2, spec:'vga sja' }
   },
   connectorIds:[1, 2],
   brand:{
      '1':{ id:1, name:'grunding' },
      '2':{ id:2, name:'sony' },
      '3':{ id:3, name:'samsung' }
   },
   brandIds:[1, 2, 3],
   tv:{
      '1':{
         id:1,
         cenas:'coisas',
         brand:1,
         connector:[1, 2]
      },
      '2':{
         id:2,
         cenas:'blabla',
         brand:1,
         connector:[1]
      },
      '3':{
         id:3,
         cenas:'blabla',
         brand:2
      },
      '4':{
         id:4,
         cenas:'coisas',
         brand:3
      }
   },
   tvIds:[1, 2, 3, 4]
}
```

This way you remove duplicates from the state and you can quickly replace/update a entry by Id.

# Methods

## trutaDB
#### addModel
#### getDump
#### getModel
#### store
#### load


### Model
#### add
#### find
#### findByIds
#### getAll
#### update
#### where
