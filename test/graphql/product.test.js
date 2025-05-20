const { spec } = require('pactum');
const getProductData = require('./productData'); // Importa a função de dados

const BASE_URL = 'http://lojaebac.ebaconline.art.br/graphql';
const AUTH_TOKEN = 'any'; // Substitua pelo token real se necessário

const productType = 'smartphone'; // Altere para 'smartphone' ou 'clothing' para alternar os dados
let productData = getProductData(productType, AUTH_TOKEN); // Obtém os dados com base no tipo de produto

describe('Products API', () => {

  let productId;

  it('should add a product', async () => {
    const response = await spec()
      .post(`${BASE_URL}/api/addProduct`)
      .withHeaders('authorization', AUTH_TOKEN) // Usando headers para token
      .withJson(productData)
      .expectStatus(201)
      .stores('productId', 'id')
      .expectJsonLike({
        name: productData.name,
        photos: productData.photos
      });

    productId = response.body.id;
  });

  it('should validate contract of addProduct', async () => {
    await spec()
      .get(`${BASE_URL}/api/editProduct/${productId}`)
      .withHeaders('authorization', AUTH_TOKEN)
      .expectStatus(200)
      .expectJsonMatchSnapshot();
  });

  it('should edit a product', async () => {
    const updatedData = {
      ...productData,
      name: productData.name === 'Smartphone' ? 'Smartphone Pro' : 'Camiseta EBAC Premium',
      price: '1099.99',
      specialPrice: '999.99',
    };

    await spec()
      .patch(`${BASE_URL}/api/editProduct/${productId}`)
      .withHeaders('authorization', AUTH_TOKEN)
      .withJson(updatedData)
      .expectStatus(200)
      .expectJsonLike({
        name: updatedData.name,
        photos: updatedData.photos
      });
  });

  it('should delete a product', async () => {
    await spec()
      .delete(`${BASE_URL}/api/deleteProduct/${productId}`)
      .withHeaders('authorization', AUTH_TOKEN)
      .expectStatus(200);
  });

  it('should list products with name and photos', async () => {
    const response = await spec()
      .get(`${BASE_URL}/graphql`)
      .withHeaders('authorization', AUTH_TOKEN)
      .withJson({
        query: `
          {
            Products {
              name
              photos
            }
          }
        `
      })
      .expectStatus(200)
      .expectJsonLike({
        data: {
          Products: [
            { name: 'Teste', photos: ['https://www.zipmaster.com/wp-content/uploads/2022/04/Reusable-Cloth-Shopping-Bags-Rainbow-Pack-200-Case-Reusable-Bags-B26-061-3-1000x1000.jpg.web'] },
            { name: 'Camiseta EBAC', photos: ['https://exemplo.com/camiseta.jpg'] }
          ]
        }
      });
  });

});
