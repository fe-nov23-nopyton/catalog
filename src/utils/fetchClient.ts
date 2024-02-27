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

export function getPhoneData(pathname: string) {
  return Promise.all([fetch(`/catalog/new/products/${pathname}.json`), wait(0)]).then(([response]) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
