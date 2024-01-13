import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma";

// Use Promise<void> to indicate that the function doesn't return a value.
const getAllVenues = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const venues = await prisma.venue.findMany();
      res.json(venues);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in getAllVenues:', error);
  
      // Handle specific error types
      if (error instanceof Error) {
        next(error.message);
      } else {
        // Handle unknown errors in a generic way
        next('Unknown error occurred');
      }
    }
  };

const getVenueById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const venue = await prisma.venue.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!venue) {
      res.status(404).json({ error: "Venue not found" });
      return;
    }

    res.json(venue);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(`Error in getVenueById for id ${id}:`, error);

    // Handle specific error types
    if (error instanceof Error) {
      next(error.message);
    } else {
      // Handle unknown errors in a generic way
      next(`Unknown error occurred for venue with id ${id}`);
    }
  }
};

const createVenue = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
  const { name, capacity } = req.body;

  try {
    const newVenue = await prisma.venue.create({
      data: {
        ...req.body,
      },
    });

    res.status(201).json(newVenue);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in createVenue:', error);

    // Handle specific error types
    if (error instanceof Error) {
      next(error.message);
    } else {
      // Handle unknown errors in a generic way
      next('Unknown error occurred while creating venue');
    }
  }
};

const updateVenue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedVenue = await prisma.venue.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    res.json(updatedVenue);
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in updateVenue:', error);

    // Handle specific error types
    if (error instanceof Error) {
      next(error.message);
    } else {
      // Handle unknown errors in a generic way
      next('Unknown error occurred while updating venue');
    }
  }
};

const deleteVenue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.venue.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "Venue deleted successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in deleteVenue:', error);

    // Handle specific error types
    if (error instanceof Error) {
      next(error.message);
    } else {
      // Handle unknown errors in a generic way
      next('Unknown error occurred while deleting venue');
    }
  }
};

export { getAllVenues, getVenueById, createVenue, updateVenue, deleteVenue };
