import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

// Use Promise<void> to indicate that the function doesn't return a value.
const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in getAllUsers:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred');
      }
    }
  };
  
  const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const users = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!users) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
      res.json(users);
    } catch (error) {
      // Log the error for debugging purposes
      console.error(`Error in getUserById for id ${id}:`, error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next(`Unknown error occurred for user with id ${id}`);
      }
    }
  };
  
  const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, capacity } = req.body;
  
    try {
      const newUser = await prisma.user.create({
        data: {
          ...req.body,
        },
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in createUser:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred while creating user');
      }
    }
  };
  
  const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });
  
      res.json(updatedUser);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in updateUser:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred while updating user');
      }
    }
  };
  
  const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
  
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in deleteUser:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred while deleting user');
      }
    }
  };
  
  export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
  