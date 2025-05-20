const getProductData = (productType, authToken) => {
    switch (productType) {
      case 'smartphone':
        return {
          authorization: authToken,
          name: 'Smartphone',
          price: '999.99',
          quantity: '10',
          categories: 'Electronics',
          description: 'High-end smartphone',
          photos: ['https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-Rainbow-Pack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.web'],
          popular: 'true',
          visible: 'true',
          location: 'Warehouse A',
          additionalDetails: 'New model with AI features',
          specialPrice: '899.99'
        };
  
      case 'clothing':
        return {
          authorization: authToken,
          name: 'Camiseta EBAC',
          price: '29.99',
          quantity: '50',
          categories: 'Clothing',
          description: 'EBAC branded T-shirt',
          photos: ['https://exemplo.com/camiseta.jpg'],
          popular: 'false',
          visible: 'true',
          location: 'Warehouse C',
          additionalDetails: 'Cotton material, unisex',
          specialPrice: '24.99'
        };
  
      default:
        throw new Error('Unknown product type');
    }
  };
  
  module.exports = getProductData;
  