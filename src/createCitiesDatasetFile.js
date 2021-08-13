const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const input = fs.readFileSync('cities.csv').toString()
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
  subdivision1IsoCode: x.subdivision_1_iso_code,
  subdivision1Name: x.subdivision_1_name,
  subdivision2IsoCode: x.subdivision_2_iso_code,
  subdivision2Name: x.subdivision_2_name,
  cityName: x.city_name,
  metroCode: x.metro_code,
  timeZone: x.time_zone,
  isInEuropeanUnion: x.is_in_european_union === '1',
}))

const esData = mappedData
  .filter((x) => x.cityName !== '')
  .map((x) => ({ id: x.geonameId, value: x.cityName }))

fs.writeFileSync('cities.json', JSON.stringify(esData, null, 2))
