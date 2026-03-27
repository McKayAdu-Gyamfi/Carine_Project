import { z } from "zod";

export const ValidAmenities = [
  "WIFI",
  "AIR_CONDITIONING",
  "RUNNING_WATER",
  "KITCHEN_ACCESS",
  "PARKING",
  "GYM",
  "LAUNDRY",
  "STUDY_ROOM",
  "TV",
  "FRIDGE",
  "MICROWAVE",
];

export const updateAmenitiesSchema = z.object({
  body: z.object({
    amenities: z.array(z.enum(ValidAmenities)).min(0)
  })
});

export const addAmenitySchema = z.object({
  body: z.object({
    name: z.enum(ValidAmenities)
  })
});
