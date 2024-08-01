import { Request, Response } from "express";
import { User } from "../models/userModel";
import { redisClient } from "../services/redisService";

export const createUsers = async (req: Request, res: Response) => {
  try {
    const users = [];
    for (let i = 0; i < 1000; i++) {
      users.push({ name: `User${i}`, email: `user${i}@example.com` });
    }
    await User.insertMany(users);
    res.status(201).send({ message: "1000 users created" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cacheKey = `user:${id}`;

  try {
    // const cachedUser = await redisClient.get(cacheKey);
    // if (cachedUser) {
    //   return res.status(200).send(JSON.parse(cachedUser));
    // }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    //await redisClient.set(cacheKey, JSON.stringify(user), "EX", 3600);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
