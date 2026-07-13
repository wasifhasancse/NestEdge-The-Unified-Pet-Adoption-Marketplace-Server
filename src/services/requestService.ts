import { requestsCollection, ObjectId } from "../config/db";

export interface AdoptionRequestInput {
  petId: string;
  petName: string;
  petImage?: string;
  userEmail: string;
  userName: string;
  phoneNumber: string;
  address: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
}

export interface RequestsQueryFilters {
  userEmail?: string;
  petId?: string;
}

export const createAdoptionRequest = async (requestData: AdoptionRequestInput) => {
  return await requestsCollection.insertOne(requestData);
};

export const getRequests = async ({ userEmail, petId }: RequestsQueryFilters) => {
  const query: any = {};
  if (userEmail) query.userEmail = userEmail;
  if (petId) query.petId = petId;
  return await requestsCollection.find(query).toArray();
};

export const getRequestById = async (id: string) => {
  return await requestsCollection.findOne({ _id: new ObjectId(id) });
};

export const updateRequestStatus = async (id: string, status: "approved" | "rejected" | "pending") => {
  const request = await getRequestById(id);
  if (!request) return null;

  const result = await requestsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );

  if (status === "approved" && request.petId) {
    // Reject other requests for the same pet
    await requestsCollection.updateMany(
      {
        petId: request.petId,
        _id: { $ne: new ObjectId(id) },
      },
      {
        $set: { status: "rejected" },
      }
    );
  }

  return result;
};

export const deleteRequest = async (id: string) => {
  return await requestsCollection.deleteOne({ _id: new ObjectId(id) });
};
