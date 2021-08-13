const seedIndex = require('./services/seedIndex')

const seedCities = () => seedIndex('cities.json', 'cities')

seedCities()
