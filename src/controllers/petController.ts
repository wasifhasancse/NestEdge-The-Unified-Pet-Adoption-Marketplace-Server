import { Request, Response } from "express";
import * as petService from "../services/petService";

export const createPetHandler = async (req: Request, res: Response) => {
  try {
    const pet = req.body;
    const result = await petService.createPet(pet);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPetsHandler = async (req: Request, res: Response) => {
  try {
    const result = await petService.getPets(req.query as petService.PetsQueryFilters);
    res.json(result);
  } catch (error: any) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPetByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id  } = req.params;
    const pet = await petService.getPetById(id as string);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.json(pet);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedPetsHandler = async (req: Request, res: Response) => {
  try {
    const results = await petService.getFeaturedPets();
    res.json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getListingsHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required and must be a string" });
    }
    const result = await petService.getListings(email);
    res.send(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await petService.updatePet(id as string, updateData);
    res.json({
      success: true,
      result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletePetHandler = async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    const result = await petService.deletePet(petId as string);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
