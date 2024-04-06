/* eslint-disable @typescript-eslint/no-explicit-any */

export function getProducts(category: string) {
  return Promise.all([fetch(`https://backend-admin-eight.vercel.app/api/categories/${category}`)]).then(
    ([response]) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    }
  );
}

export function getProductData(id: string) {
  return Promise.all([fetch(`https://backend-admin-eight.vercel.app/api/products/${id}`)]).then(([response]) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
