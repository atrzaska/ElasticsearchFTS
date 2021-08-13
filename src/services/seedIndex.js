const fs = require('fs')
const { Client } = require('@elastic/elasticsearch')

const seedIndex = async (file, index) => {
  const data = JSON.parse(fs.readFileSync(file).toString())
  const client = new Client({ node: 'http://localhost:9200' })
  const body = data.flatMap((x) => [{ index: { _index: index, _id: x.id } }, x])
  const { body: bulkResponse } = await client.bulk({ refresh: true, body })
  console.log(bulkResponse)
}

module.exports = seedIndex
