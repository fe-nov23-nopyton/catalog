const URL = "./_new/products.json";

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
