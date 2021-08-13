const seedIndex = require('./services/seedIndex')

// create index with mapping
// PUT http://localhost:9200/countries
{
  "mappings": {
    "properties": {
      "value": {
        "type": "search_as_you_type"
      }
    }
  }
}

// autocomplete search
// POST http://localhost:9200/countries/_search
// {
//   "query": {
//     "multi_match": {
//       "query": "jap",
//       "type": "bool_prefix",
//       "fields": [
//         "value",
//         "value._2gram",
//         "value._3gram"
//       ]
//     }
//   }
// }

const seedCountries = () => seedIndex('countries.json', 'countries')

seedCountries()
