// const expect = require('chai').expect;
// const url = 'http://localhost:4000/';
// const { resolvers } = '../src/resolvers'
// const { Link } = '../models/link'
// const request = require('supertest')(url);
// const typeDefs = '../src/schema'
// const EasyGraphQLTester = require('easygraphql-tester');

// describe('GraphQL', () => {
//   it('Returns a list of all Links', (done) => {
//     request.post('/')
//       .send({ query: 'links: [Link]'})
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.body.Link.should.have.property('url')
//         res.body.Link.should.have.property('slug')
//         done()
//       })
//   })
// })

// describe('Test queries', () => {
//   let tester

//   before(() => {
//     tester = new EasyGraphQLTester(typeDefs, resolvers)
//   })

//   it('Should pass if the query is valid', () => {
//     const validQuery = `
//     {
//       links {
//         url
//       }
//     }`
//     tester.test(true, validQuery, {
//       links: links
//     })
//   })

//   it('Should fail if the query is invalid', () => {
//     const invalidQuery = `
//     {
//       links {
//         longUrl
//       }
//     }
//     `
//     tester.test(false, invalidQuery)

//   })
// })