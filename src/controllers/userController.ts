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
    console.error("Error creating users:", error);
    res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cacheKey = `user:${id}`;

  try {
    // const cachedUser = await redisClient.get(cacheKey);

    // if (cachedUser) {
    //   const responseCache = {
    //     source: "Direct from the Cache",
    //     data: JSON.parse(cachedUser),
    //   };
    //   console.log("Returning cached user:", responseCache);
    //   return res.status(200).send(responseCache);
    // }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // await redisClient.set(cacheKey, JSON.stringify(user), "EX", 3600);

    const response = {
      source: "Direct from the Database",
      data: user,
    };

    console.log("Returning user from database:", response);
    res.status(200).send(response);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: error.message });
  }
};
