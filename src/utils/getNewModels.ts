import { Product } from "../types/Product";

export const getNewModels = (phones: Product[]) => [...phones].sort((a, b) => b.year - a.year);
