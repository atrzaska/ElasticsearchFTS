const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const input = fs.readFileSync('countries.csv').toString()
const data = parse(input, {
  columns: true,
  skip_empty_lines: true,
})

const mappedData = data.map((x) => ({
  geonameId: parseInt(x.geoname_id),
  localeCode: x.locale_code,
  continentCode: x.continent_code,
  continentName: x.continent_name,
  countryIsoCode: x.country_iso_code,
  countryName: x.country_name,
  isInEuropeanUnion: x.is_in_european_union === '1',
}))

const esData = mappedData
  .filter((x) => x.countryName !== '')
  .map((x) => ({ id: x.geonameId, value: x.countryName }))

fs.writeFileSync('countries.json', JSON.stringify(esData, null, 2))
