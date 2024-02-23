import { Phone } from "../types/Phone";

export const getRecommendModels = (models: Phone[], count: number): Phone[] => {
  const randomModels = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * models.length);

    randomModels.push(models[randomIndex]);
  }
  return randomModels;
};
