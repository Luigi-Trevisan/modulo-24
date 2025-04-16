const { spec } = require('pactum');

it('should authenticate users correctly', async () => {
  await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withHeaders('Content-Type', 'application/json')
    .withBody({
      query: `
        mutation AuthUser($email: String, $password: String) {
          authUser(email: $email, password: $password) {
            success
            token
          }
        }`,
      variables: {
        email: "admin@admin.com",
        password: "admin123"
      }
    })
    .expectStatus(200)
    .expectJson('data.authUser.sucess', true);
});
