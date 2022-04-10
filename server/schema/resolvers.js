import Todo from "../database/models/todolistModel.js";

const resolvers = {
  Query: {
    getToDos: async (parent, args) => {
      const todos = await Todo.find();
      
      return todos;
    },
    getToDo: async (parent, args) => {
      const todo = await Todo.findById(args.id);
      return todo;
    },
    welcome: () => {
      return "Welcome to mobile";
    },
  },

  Mutation: {
    updateStatus: async (parent, args) => {
      const { toDoId, status } = args;

      const updateStatus = {};
      if (status != undefined) {
        updateStatus.status =status;
      }
      const todo = await Todo.findByIdAndUpdate(toDoId, updateStatus, {
        new: true,
      });
      return todo;
    },
    createToDo: async (parent, args) => {
      const newTodo = new Todo({
        title: args.title,
        status: false,
      });
      await newTodo.save();
      return newTodo;
    },
    updateToDo: async (parent, args) => {
      const { toDoId, title } = args;

      const updatedToDo = {};
      if (title != undefined) {
        updatedToDo.title = title;
      }
      const todo = await Todo.findByIdAndUpdate(toDoId, updatedToDo, {
        new: true,
      });

      return todo;
    },
    deleteToDo: async (parent, args) => {
      await Todo.findByIdAndDelete(args.toDoId);
      return "This todo deleted successfully";
    },
    deleteToDos: async (parent, args) => {
      return await Todo.remove();
    },
  },
};

export default resolvers;
