import { Product } from "../types/Product";

export const getRecommendModels = (models: Product[], count: number): Product[] => {
  const randomModels = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * models.length);

    randomModels.push(models[randomIndex]);
  }
  return randomModels;
};
