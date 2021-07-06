import * as functions from "firebase-functions";
import {notifyAboutComment01Handler} from "./notifyAboutComment01";
import {createUserHandler} from "./createUser";

export const notifyAboutComment01 = functions.https.onRequest(
    notifyAboutComment01Handler
);

export const createUser = functions.https.onRequest(createUserHandler);
