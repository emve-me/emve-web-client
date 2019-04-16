module.exports = {
  client: {
    clientSchemaDirectives: ["client"],

    service: {
      includes: ['lib/**/*.tsx', 'lib/**/*.ts'], // array of glob patterns
      tagName: 'gql',
      name: 'emve_api',
      url: 'http://localhost:4000'
    }
  }
}