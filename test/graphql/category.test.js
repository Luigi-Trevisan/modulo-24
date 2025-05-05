const { spec } = require('pactum');

const BASE_URL = 'http://lojaebac.ebaconline.art.br/graphql';
const AUTH_TOKEN = 'any'; // Substitua pelo token real se necessário

describe('Categories API', () => {

  let categoryId;
  const categoryType = 'electronics'; // Altere para 'electronics' ou 'clothing' para alternar os dados

  let categoryData;

  // Usando switch para alternar entre dados de categorias
  switch (categoryType) {
    case 'electronics':
      categoryData = {
        authorization: AUTH_TOKEN,
        name: 'Electronics',
        description: 'Devices and gadgets',
        visible: 'true',
      };
      break;

    case 'clothing':
      categoryData = {
        authorization: AUTH_TOKEN,
        name: 'Clothing',
        description: 'Fashion and apparel',
        visible: 'true',
      };
      break;

    default:
      throw new Error('Unknown category type');
  }

  it('should add a category', async () => {
    const response = await spec()
      .post(`${BASE_URL}/api/addCategory`)
      .withHeaders('authorization', AUTH_TOKEN)
      .withJson(categoryData)
      .expectStatus(201)
      .stores('categoryId', 'id')
      .expectJsonLike({
        name: categoryData.name,
        description: categoryData.description
      });

    categoryId = response.body.id;
  });

  it('should validate contract of addCategory', async () => {
    await spec()
      .get(`${BASE_URL}/api/editCategory/${categoryId}`)
      .withHeaders('authorization', AUTH_TOKEN)
      .expectStatus(200)
      .expectJsonMatchSnapshot();
  });

  it('should edit a category', async () => {
    const updatedData = {
      ...categoryData,
      name: categoryData.name === 'Electronics' ? 'Updated Electronics' : 'Updated Clothing',
      description: 'Updated description',
    };

    await spec()
      .patch(`${BASE_URL}/api/editCategory/${categoryId}`)
      .withHeaders('authorization', AUTH_TOKEN)
      .withJson(updatedData)
      .expectStatus(200)
      .expectJsonLike({
        name: updatedData.name,
        description: updatedData.description
      });
  });

  it('should delete a category', async () => {
    await spec()
      .delete(`${BASE_URL}/api/deleteCategory/${categoryId}`)
      .withHeaders('authorization', AUTH_TOKEN)
      .expectStatus(200);
  });

  it('should list categories with name and description', async () => {
    const response = await spec()
      .post(`${BASE_URL}/graphql`)  // Alterado de GET para POST
      .withHeaders('authorization', AUTH_TOKEN)
      .withJson({
        query: `
          {
            Categories {
              name
              description
            }
          }
        `
      })
      .expectStatus(200)
      .expectJsonLike({
        data: {
          Categories: [
            { name: 'Electronics', description: 'Devices and gadgets' },
            { name: 'Clothing', description: 'Fashion and apparel' }
          ]
        }
      });
  });
  

});
