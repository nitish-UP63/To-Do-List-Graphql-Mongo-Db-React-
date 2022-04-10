import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type ToDo {
    id: ID
    title: String
    status:Boolean
    
  }
  
  type Query {
    welcome: String
    getToDos: [ToDo]
    getToDo(id: ID): ToDo
  }
  type Mutation {
    
    createToDo(title: String ,status:Boolean ): ToDo
    updateStatus(toDoId:ID ,status:Boolean):ToDo
    updateToDo(toDoId: ID, title: String): ToDo
    deleteToDo(toDoId: ID): String
    deleteToDos: [ToDo]
  }
`;

export default typeDefs;

