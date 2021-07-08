import {Request, Response} from "firebase-functions";
import fetch from "node-fetch";

const AUTH_URL =
"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXsOC2226nDtre129IJGafLuIbJepntf4";

export const loginHandler = async (
    request: Request,
    response: Response
): Promise<void> => {
  try {
    const {email, password} = request.body.input.credentials;
    const loginRequest = await fetch(AUTH_URL, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });
    const {idToken} = await loginRequest.json();

    if (!idToken) throw Error("No idToken");

    response.status(200).send({
      accessToken: idToken,
    });
  } catch (error) {
    response.status(500).send({message: `Message: ${error.message}`});
  }
};
