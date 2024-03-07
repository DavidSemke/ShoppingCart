const productData = (() => {
    const productIndexes = [...Array(20).keys()]
    const baseURL = "https://fakestoreapi.com/products/";
  
    async function fetchProductData(productIndex) {
      const response = await fetch(
        baseURL + (productIndex + 1),
        { mode: "cors" },
      );
  
      try {
        return await response.json();
      } 
      catch (error) {
        return error;
      }
    }
  
    async function allProductData() {
      const data = []
  
      for (const index of productIndexes) {
        const productData = await fetchProductData(index);
  
        if (productData instanceof Error) {
          return productData
        }
  
        data.push(productData)
      }
  
      return data
    }
    
    return { allProductData };
    
})();
    
    
    export { productData };