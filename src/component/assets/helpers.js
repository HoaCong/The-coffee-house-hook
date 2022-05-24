export const mergeData = (category, product) => {
  category.map((itemcat) => {
    let arr = [];
    product.map((itempro) => {
      if (itempro.categ_id.includes(itemcat.id)) {
        arr.push(itempro);
      }
      return 0;
    });
    itemcat.ListProduct = arr;
    return 0;
  });
  return category;
};

export const compareArr = (arr1, arr2) =>
  JSON.stringify(arr1.sort((a, b) => a.localeCompare(b))) ===
  JSON.stringify(arr2.sort((a, b) => a.localeCompare(b)));
