import express from "express";
import {
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController";

const router = express.Router();

//venues endpoints
router.get("/", getAllVenues);
router.get("/:id", getVenueById);
router.post("/", createVenue);
router.put("/:id", updateVenue);
router.delete("/:id", deleteVenue);

export { router as venueRoutes };
