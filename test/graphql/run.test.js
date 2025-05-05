const runCategoryTests = process.argv.includes('--category'); // Usando argumento de linha de comando
const runProductTests = process.argv.includes('--product');

if (runCategoryTests) {
  require('./category.test.js'); // Executa os testes de categorias
} else if (runProductTests) {
  require('./product.test.js'); // Executa os testes de produtos
} else {
  console.log('Please specify which test to run: --category or --product');
}
