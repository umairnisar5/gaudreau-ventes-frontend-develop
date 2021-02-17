const { ApolloServer, gql } = require('apollo-server');


const resolvers = {
    Query: {
      books: () => books,
    },
  };

  const books = [
      {
        "id": "1",
          "title ": "love",
          "author" : "amir ali"
       },
       {
        "id" : "2",
        "title ": "andry",
        "author" : "mohsin "
     },
     {
       "id" : "3",
        "title ": "story",
        "author" : "umair"
     },
  ]







const typeDefs = gql`
  type Book {
    id: Int 
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

