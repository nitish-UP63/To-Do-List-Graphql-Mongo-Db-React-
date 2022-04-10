import { ApolloServer } from "apollo-server-express";

import express from "express";
import dotenv from "dotenv";
// const connectDatabase = require("./database/config/database");
import typeDefs from "./schema/type-defs.js";
import resolvers from "./schema/resolvers.js";
import mongoose from "mongoose";
import cors from "cors";

//config

async function initServer() {
  const app = express();
  app.use(cors());
  dotenv.config({ path: "./database/config/config.env" });
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("Server started Successfully");
  });
  try {
    await mongoose.connect(process.env.DB_URI).then((data) => {
      console.log(
        `mongodb database connected with server: ${data.connection.host}`
      );
    });
  } catch (error) {
    console.log(error);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost: ${process.env.PORT}`);
  });
}

initServer();

// const { typeDefs } = require("./schema/type-defs");
// const { resolvers } = require("./schema/resolvers");

// //Connecting to datbase
// connectDatabase();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: () => {
//     return { name: "Babu" };
//   },
// });

// server.listen(process.env.PORT, () => {
//   console.log(`Server started on http://localhost: ${process.env.PORT}`);
// });

// const startApolloServer = async () => {
//   //Connecting to datbase
//   await connectDatabase();

//   const app = express();
//   app.use(cors());

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     subscriptions: { path: "/subscriptions" },
//     context: ({ req }) => {
//       return {
//         models: {
//           Todo: generateTodoModel(),
//         },
//       };
//     },
//   });

//   await server.start();
//   server.applyMiddleware({ app });
//   app.use((req, res) => {
//     res.status(200);
//     res.send("Welcome Todo App");
//     res.end();
//   });
//   console.log(
//     `🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
//   );
//   app.listen(process.env.PORT, () => {
//     console.log(`Server started on http://localhost: ${process.env.PORT}`);
//   });

//   return { server, app };
// };

// startApolloServer();

// const itemsSchema = {
//   name: String,
// };

// const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item({
//   name: "Welcome to your todolist !",
// });
// const item2 = new Item({
//   name: "Hit the + button to add a new item.",
// });
// const item3 = new Item({
//   name: "<-- Hit this to delete an item.",
// });

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//   name: String,
//   items: [itemsSchema],
// };

// const List = mongoose.model("List", listSchema);

// app.get("/", function (req, res) {
//   Item.find({}, function (err, foundItems) {
//     if (foundItems.length === 0) {
//       Item.insertMany(defaultItems, function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Successfully  added default items to database");
//         }
//       });
//       res.redirect("/");
//     } else {
//       res.render("list", { listTitle: "Today", newlistitems: foundItems });
//     }
//   });
// });

// app.get("/:customListName", function (req, res) {
//   const customListName = req.params.customListName;

//   List.findOne(
//     {
//       name: customListName,
//     },
//     function (err, foundList) {
//       if (!err) {
//         if (!foundList) {
//           // Create a new List
//           const list = new List({
//             name: customListName,
//             items: defaultItems,
//           });

//           list.save();
//           res.redirect("/" + customListName);
//         } else {
//           // Show exiting list
//           res.render("list", {
//             listTitle: foundList.name,
//             newlistitems: foundList.items,
//           });
//         }
//       }
//     }
//   );
// });

// app.post("/", function (req, res) {
//   const itemName = req.body.newItem;

//   const item = new Item({
//     name: itemName,
//   });

//   item.save();
//   res.redirect("/");
// });

// app.post("/delete", function (req, res) {
//   const checkedItemId = req.body.checkbox;

//   Item.findByIdAndRemove(checkedItemId, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully deleted the checked item");
//       res.redirect("/");
//     }
//   });
// });

// app.post("/work", function (req, res) {
//   const item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

// require("dotenv").config();
// const { ApolloServer, gql } = require("apollo-server");
// const mongoose = require("mongoose");

// //Connect to database
// mongoose
//   .connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

//   })
//   .then(() => {
//     console.log("Connected to database");
//   })

// //Database Model
// const toDoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   }
// });

// const ToDo = mongoose.model("ToDo", toDoSchema);

// //GraphQL Schemas
// const typeDefs = gql`
//   type ToDo {
//     id: ID!
//     title: String!

//   }
//   input ToDoInput {
//     title: String!

//   }
//   type Query {
//     getToDo(toDoId: ID!): ToDo!
//     getToDos: [ToDo!]!
//   }
//   type Mutation {
//     createToDo(title:String!): ToDo
//     updateToDo(toDoId: ID!, toDoInput: ToDoInput): ToDo
//     deleteToDo(toDoId: ID!): ToDo
//     deleteToDos: [ToDo!]!
//   }
// `;

// const resolvers = {
//   Query: {
//     getToDo: async (parent, args) => {

//         const { toDoId } = args;
//         return await ToDo.findById(toDoId);

//     },
//     getToDos: async (parent, args) => {

//         return await ToDo.find();

//     },
//   },

//   Mutation: {
//     createToDo: async (parent, args) => {

//         const { toDoInput } = args;
//         return await ToDo.create(toDoInput);

//     },
//     updateToDo: async (parent, args) => {

//         const { toDoId, toDoInput } = args;
//         return await ToDo.findOneAndUpdate(toDoId, toDoInput, { new: true });

//     },
//     deleteToDo: async (parent, args) => {

//         const { toDoId } = args;
//         return await ToDo.findByIdAndDelete(toDoId);

//     },
//     deleteToDos: async (parent, args) => {

//         return await ToDo.remove();

//     },
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// // The `listen` method launches a web server.
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
