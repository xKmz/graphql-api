const EasyGraphQLTester = require('easygraphql-tester');
const gql = require('graphql-tag');
const { expect } = require('chai');

const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(
  path.join(__dirname, '../', 'schema.graphql'),
  'utf8',
);

const fakeUserResolver = require('../resolvers/fakes/FakeUserResolver');

let tester;

describe('Test Resolvers', () => {
  beforeEach(() => {
    tester = new EasyGraphQLTester(schema, fakeUserResolver);
  });

  it('Should be result a new users', async () => {
    const mutation = gql`
      mutation {
        createUser(name: "test", email: "test@example.com") {
          _id
          name
          email
        }
      }
    `;

    const { data } = await tester.graphql(mutation);
    expect(data.createUser.name).to.be.eq('test');
  });

  it('Should be result a list of users', async () => {
    const query = gql`
      query {
        users {
          _id
          name
          email
        }
      }
    `;

    const { data } = await tester.graphql(query);
    expect(data.users).to.be.an('array');
  });
});
