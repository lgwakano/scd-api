import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

// Use Promise<void> to indicate that the function doesn't return a value.
const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const events = await prisma.event.findMany();
      res.json(events);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in getAllEvents:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred');
      }
    }
  };
  
  const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const event = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!event) {
        res.status(404).json({ error: "Event not found" });
        return;
      }
  
      res.json(event);
    } catch (error) {
      // Log the error for debugging purposes
      console.error(`Error in getEventById for id ${id}:`, error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next(`Unknown error occurred for event with id ${id}`);
      }
    }
  };
  
  const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { name, capacity } = req.body;
  
    try {
      const newEvent = await prisma.event.create({
        data: {
          ...req.body,
        },
      });
  
      res.status(201).json(newEvent);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in createEvent:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred while creating event');
      }
    }
  };
  
  const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      const updatedEvent = await prisma.event.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });
  
      res.json(updatedEvent);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in updateEvent:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred while updating event');
      }
    }
  };
  
  const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
  
    try {
      await prisma.event.delete({
        where: {
          id: Number(id),
        },
      });
  
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in deleteEvent:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred while deleting event');
      }
    }
  };
  
  export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
  