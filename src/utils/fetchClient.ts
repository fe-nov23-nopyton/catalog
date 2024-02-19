/* eslint-disable @typescript-eslint/no-explicit-any */

const URL = "https://mate-academy.github.io/react_phone-catalog/api/products.json";

export function getPhones() {
  return fetch(URL).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
