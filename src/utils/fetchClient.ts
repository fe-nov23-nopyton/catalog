/* eslint-disable @typescript-eslint/no-explicit-any */
const URL = "./new/products.json";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function getPhones() {
  return Promise.all([fetch(URL), wait(500)]).then(([response]) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const fetchPhoneData = async (
  pathname: string,
  setPhoneData: (value: any) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(`/catalog/new/products/${pathname}.json`);
    console.log(response);
    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    setPhoneData(data);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};
