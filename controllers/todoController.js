const todoModel = require("../models/todoModel");


const createTodoController = async (req,res) => {

    try{
        const {title , description , createdBy } = req.body;

        if(!title || !description) {
            return res.status(500).send(
                {
                    success : false,
                    message : "pleace provide Title and Description",
                }
            );
        }

        const todo = new todoModel({title , description,
            createdBy : req.user.id,
        });
        const result = await todo.save();
        res.status(201).send({
            success : true,
            message : "Your task has been created",
            result,
        });
    }
    catch (error){
        console.log(error);
        res.status(500).send({
            success: false,
            message : "error in todo api",
            error,
        });       
    }
}

const getTodoController = async (req,res) => {
    try{
        const id = req.user.id;
        console.log(`id : ${id}`);
        if(!id){
            return res.status(404).send({
                success: false,
                message: "No User found with this Id",
            });
        }

        const todos = await todoModel.find({createdBy : id});
        if(!todos){
            return res.status(404).send({
                success: true,
                message: "you have no todos",
            });
        }

        res.status(200).send({
            success: true,
            message: "Your Todos",
            todos,
        });
    } catch (error) {
        console.log(error);
        res.status({
            success: false,
            message: "Error in Get Todo API",
            error,
        });
    }
}

const deleteTodoController = async (req,res) => {
    try{
        const userId = req.user.id;
        const todoId = req.params.id;

        console.log(`deleting : userid = ${userId} todoid = , ${todoId}`);

        if(!todoId || !userId){
            return res.status(404).send({
                success: false,
                message : "No Task or User found with this id",
            });
        }

        const todo = await todoModel.findByIdAndDelete({
            _id : todoId,
            createdBy : userId,
        })  
        if(!todo){
            return res.status(404).send({
                success: false,
                message : "No Task found or unauthorized",
            });
        }

        res.status(200).send({
            success: true,
            message: "You task has been Deleted",
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in todo API ",
        });
    }
};


const updateTodoController = async (req,res)=> {

    try{
        const userId = req.user.id;
        const todoId = req.params.id;

        if(!todoId || !userId){
            return res.status(404).send({
                success: false,
                message: "invalid todo or user id",
            });
        }

        const data = req.body;

        const todo = await todoModel.findByIdAndUpdate(
            {_id : todoId, createdBy : userId},
            { $set : data},
            { returnOriginal : false}
        );

        res.status(200).send({
            success : true,
            message: "your task has been updated",
            todo,
        });

    }catch (error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Update Todo API",
        });
    }

}

module.exports = {
    createTodoController,
    getTodoController,
    deleteTodoController,
    updateTodoController,
}
