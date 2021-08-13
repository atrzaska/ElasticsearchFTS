# Elasticsearch FullText Search

Example project with autocomplete for cities and countries using GeoIP database.

## Autocomplete Countries

### Create index with mapping

```
PUT http://localhost:9200/countries

{
  "mappings": {
    "properties": {
      "value": {
        "type": "search_as_you_type"
      }
    }
  }
}
```

### Load documents

```
node src/seedCountries.js
```

### Autocomplete search using elasticsearch

```
POST http://localhost:9200/countries/_search

{
  "query": {
    "multi_match": {
      "query": "jap",
      "type": "bool_prefix",
      "fields": [
        "value",
        "value._2gram",
        "value._3gram"
      ]
    }
  }
}
```

### Autocomplete search using the app

```
node src/app.js
curl http://localhost:4000/autocomplete/countries?q=jap
```

## Autocomplete Cities

### Create index with mapping

```
PUT http://localhost:9200/cities

{
  "mappings": {
    "properties": {
      "value": {
        "type": "search_as_you_type"
      }
    }
  }
}
```

### Load documents

```
node src/seedCities.js
```

### Autocomplete search using elasticsearch

```
POST http://localhost:9200/cities/_search

{
  "query": {
    "multi_match": {
      "query": "ber",
      "type": "bool_prefix",
      "fields": [
        "value",
        "value._2gram",
        "value._3gram"
      ]
    }
  }
}
```

### Autocomplete search using the app

```
node src/app.js
curl http://localhost:4000/autocomplete/cities?q=ber
```
