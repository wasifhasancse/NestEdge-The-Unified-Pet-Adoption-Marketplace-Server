import { petsCollection, ObjectId } from "../config/db";

export interface PetInput {
  petName: string;
  breed: string;
  species: string;
  age: number | string;
  gender: string;
  adoptionFee: number | string;
  healthStatus: string;
  image: string;
  location: string;
  status: string;
  ownerEmail: string;
  ownerName?: string;
  description?: string;
}

export interface PetsQueryFilters {
  search?: string;
  species?: string;
  age?: string;
  gender?: string;
  page?: string;
  limit?: string;
}

export const createPet = async (petData: PetInput) => {
  return await petsCollection.insertOne(petData);
};

export const getPets = async ({ search, species, age, gender, page, limit }: PetsQueryFilters) => {
  const currentPage = Math.max(1, parseInt(page || "1") || 1);
  const itemsPerPage = Math.max(1, parseInt(limit || "9") || 9);

  let query: any = {};

  // 1. Text search on petName or breed
  if (search) {
    query.$or = [
      { petName: { $regex: search, $options: "i" } },
      { breed: { $regex: search, $options: "i" } },
    ];
  }

  // 2. Species filter
  if (species) {
    query.species = species;
  }

  // 3. Gender filter
  if (gender) {
    query.gender = gender;
  }

  // 4. Age bracket filter
  if (age) {
    if (age === "baby") {
      query.age = { $lte: 1 };
    } else if (age === "young") {
      query.age = { $gte: 2, $lte: 5 };
    } else if (age === "adult") {
      query.age = { $gte: 6, $lte: 15 };
    } else if (age === "senior") {
      query.age = { $gte: 16 };
    }
  }

  const totalItems = await petsCollection.countDocuments(query);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const results = await petsCollection
    .find(query)
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .toArray();

  return {
    pets: results,
    totalPages: totalPages || 1,
    currentPage: currentPage,
    totalItems: totalItems,
  };
};

export const getPetById = async (id: string) => {
  return await petsCollection.findOne({ _id: new ObjectId(id) });
};

export const getFeaturedPets = async () => {
  return await petsCollection.find().limit(6).toArray();
};

export const getListings = async (email: string) => {
  return await petsCollection.find({ ownerEmail: email }).toArray();
};

export const updatePet = async (id: string, updateData: Partial<PetInput>) => {
  return await petsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
};

export const deletePet = async (id: string) => {
  return await petsCollection.deleteOne({ _id: new ObjectId(id) });
};
