const { ApolloServer, gql } = require('apollo-server');


const resolvers = {
    Query: {
      books: () => books,
    },
  };

  const books = [
      {
          "title ": "love",
          "author" : "amir ali"
       },
       {
        "title ": "andry",
        "author" : "mohsin "
     },
     {
        "title ": "story",
        "author" : "umair"
     },
  ]







const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

