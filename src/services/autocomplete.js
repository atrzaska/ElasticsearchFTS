const { Client } = require('@elastic/elasticsearch')

const NODE = 'http://localhost:9200'

const autocomplete = async ({ query, index }) => {
  const client = new Client({ node: NODE })

  try {
    const result = await client.search({
      index,
      body: {
        query: {
          multi_match: {
            query,
            type: 'bool_prefix',
            fields: ['value', 'value._2gram', 'value._3gram'],
          },
        },
      },
    })

    return result.body.hits.hits.map((x) => x._source)
  } catch (err) {
    return []
  }
}

module.exports = autocomplete
