const { ApolloServer, gql } = require('apollo-server');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const {DB_URI, DB_NAME} = process.env;

const typeDefs = gql`
  type Query {
      myDutyList: [Duty!]!
  } 

  type Mutation {
    createDuty(name: String!): Duty!
    updateDuty(id: ID!, name: String!): Duty!
    deleteDuty(id: ID!): Boolean!
  }

  type Duty {
      id: ID! 
      name: String! 
  }
`;

const resolvers = {
    Query: {
      myDutyList: async(_, __, {db}) => {
        return await db.collection('Dutys').find({}).toArray();
      }    
    },
    Mutation: {
      createDuty: async(_, {name}, {db}) => {
   
        const newDuty = {
          name
        }
        const response = await db.collection('Dutys').insertOne(newDuty);

        // Esta version de MongoDb no permite recibir el documento creado, tengo que buscarlo
        const result = await db.collection('Dutys').findOne({_id: response.insertedId});
        return result;

      },
      updateDuty: async(_, {id, name}, {db}) => {
        
        const result = await db.collection('Dutys')
          .updateOne({
            _id: new ObjectId(id)
          }, {
            $set: {name}
          })
        
        return await db.collection('Dutys').findOne({_id: new ObjectId(id)}); 

      },
      deleteDuty: async(_, {id}, {db}) => {
        await db.collection('Dutys').deleteOne({_id: new ObjectId(id)});
        return true;
      }
    },

    Duty: {
        id: ({_id, id}) =>  _id || id 
    }
};


// MONGO SERVER

(async () => {
    try {
        const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db(DB_NAME);

        const context = {
          db,
        }

        // The ApolloServer constructor requires two parameters: your schema
        // definition and your set of resolvers.
        const server = new ApolloServer({ typeDefs, resolvers, context });

        // The `listen` method launches a web server.
        server.listen().then(({ url }) => {
          console.log(`🚀 Server ready at ${url}`);
        });

    } catch (error) {
        console.log(`🚀 Server error: `, error);
    }
})();