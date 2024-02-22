const URL = "./new/products.json";

export function getPhones() {
  return fetch(URL).then((response) => {
    console.log(response);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
