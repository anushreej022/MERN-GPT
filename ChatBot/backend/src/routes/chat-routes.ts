import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

//Chatroutes is a Protected API
const chatRoutes = Router();
chatRoutes.post(
    "/new", 
    validate(chatCompletionValidator),
    verifyToken,
    generateChatCompletion
    ); // we will verify the token of the user and only then move ahead

    //to restore all the chats
    chatRoutes.get(
    "/all-chats", 
    verifyToken,
    sendChatsToUser
    );

    //to delete the chat
    chatRoutes.delete(
        "/delete", 
        verifyToken,
        deleteChats
        );
export default chatRoutes;