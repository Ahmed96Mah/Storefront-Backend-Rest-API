import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('tests for products endpoints', (): void => {
  let index: number;

  describe("tests for product's index endpoint", (): void => {
    it('Expects a status of 200 when an index request is made', async (): Promise<void> => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });
  });

  describe("tests for product's show endpoint", (): void => {
    it('Expects a status of 200 when a correct show request is made', async (): Promise<void> => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });

    it('Expects a status of 400 when a wrong show request is made', async (): Promise<void> => {
      const response = await request.get('/products/100');
      expect(response.status).toBe(400);
    });
  });

  describe("tests for product's create endpoint", (): void => {
    it('Expects a status of 200 when a correct create request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        name: 'book10',
        price: 100,
        category: 'categ10',
        sold: 0,
      };

      const response = await request
        .post('/products/add')
        .set('Authorization', AuthorizeToken)
        .send(body);
      index = response.body.id;
      expect(response.status).toBe(200);
    });
  });

  describe("tests for product's edit endpoint", (): void => {
    it('Expects a status of 200 when a correct edit request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        name: 'book1',
        price: 100,
        category: 'categ1',
        sold: 0,
      };

      const response = await request
        .put('/products/edit/1')
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for product's delete endpoint", (): void => {
    it('Expects a status of 200 when a correct edit request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .delete(`/products/delete/${index}`)
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(200);
    });
  });
});
