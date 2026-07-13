import { Request, Response } from "express";
import * as requestService from "../services/requestService";

export const createAdoptionRequestHandler = async (req: Request, res: Response) => {
  try {
    const requestData = req.body;
    const result = await requestService.createAdoptionRequest(requestData);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRequestsHandler = async (req: Request, res: Response) => {
  try {
    const { userEmail, petId } = req.query;
    const filters: requestService.RequestsQueryFilters = {};
    if (typeof userEmail === "string") filters.userEmail = userEmail;
    if (typeof petId === "string") filters.petId = petId;

    const result = await requestService.getRequests(filters);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRequestStatusHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["approved", "rejected", "pending"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await requestService.getRequestById(id as string);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const result = await requestService.updateRequestStatus(id as string, status as "approved" | "rejected" | "pending");
    res.send(result);
  } catch (error: any) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await requestService.deleteRequest(id as string);
    res.send(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
