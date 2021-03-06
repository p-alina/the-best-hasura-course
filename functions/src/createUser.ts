import {Request, Response, logger} from "firebase-functions";
import {initializeApp, auth} from "firebase-admin";
initializeApp();

export const createUserHandler = async (
    request: Request,
    response: Response
): Promise<void> => {
  try {
    const {email, password, displayName} = request.body.input.credentials;
    const user = await auth().createUser({
      email,
      password,
      displayName,
    });
    await auth().setCustomUserClaims(user.uid, {
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": user.uid,
      },
    });
    logger.log(request.body);
    response.status(200).send({
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error) {
    response.status(500).send({message: `Message: ${error.message}`});
  }
};
