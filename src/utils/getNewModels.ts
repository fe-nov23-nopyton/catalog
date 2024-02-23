import { Phone } from "../types/Phone";

export const getNewModels = (phones: Phone[]) => [...phones].sort((a, b) => b.year - a.year);
