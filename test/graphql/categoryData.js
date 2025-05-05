// getCategoryData.js
function getCategoryData(categoryType, authToken) {
    switch (categoryType) {
      case 'electronics':
        return {
          authorization: authToken,
          name: 'Electronics',
          description: 'Devices and gadgets',
          visible: 'true',
        };
      case 'clothing':
        return {
          authorization: authToken,
          name: 'Clothing',
          description: 'Fashion and apparel',
          visible: 'true',
        };
      default:
        throw new Error('Unknown category type');
    }
  }
  
  module.exports = getCategoryData;
  