const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

// request.setBaseUrl('http://lojaebac.ebaconline.art.br/graphql');

let token;
beforeEach(async () => {
    await spec()
      .post('http://lojaebac.ebaconline.art.br/graphql')
      .withHeaders('Content-Type', 'application/json')
      .withBody({
        query: `
          mutation AuthUser($email: String, $password: String) {
            authUser(email: $email, password: $password) {
              sucess
              token
            }
          }`,
        variables: {
          email: "admin@admin.com",
          password: "admin123"
        }
      })
      .stores('token', 'data.authUser.token');
  });  

it('should get a response', async () => {
    await spec()
    .post ('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders("Authorization", 'Bearear {{token}}')
    .withGraphQLQuery(`
    query {
        Users {
            id
            profile {
                firstName
            }
        }
    }`)
    .expectStatus(200)
    .expectJsonMatch({
        data: {
            Users: eachLike({
            id: like("67bf9a179ae7a8d92b867782"),
            profile: {
                firstName: like("ebac"),
            },


    })    
}


        })
    })  