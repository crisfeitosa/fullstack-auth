import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const fakeUser = {
      id: "1",
      username: "cristiano",
      password: "123456"
    };

    if(username !== fakeUser.username || password !== fakeUser.password) {
      throw new AppError("Username or password incorrect", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      expiresIn,
      subject: fakeUser.id,
    })

    return response.json({ token })
  }
}

export { SessionsController }
