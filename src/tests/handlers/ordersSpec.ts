import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('tests for orders endpoints', (): void => {
  let index: number;

  describe("tests for order's index endpoints", (): void => {
    it('Expects a status of 200 when an index request is made', async (): Promise<void> => {
      const response = await request.get('/orders');
      expect(response.status).toBe(200);
    });
  });

  describe("tests for order's show endpoints", (): void => {
    it('Expects a status of 200 when a correct show request is made', async (): Promise<void> => {
      const response = await request.get('/orders/1');
      expect(response.status).toBe(200);
    });

    it('Expects a status of 400 when a wrong show request is made', async (): Promise<void> => {
      const response = await request.get('/orders/100');
      expect(response.status).toBe(400);
    });
  });

  describe("tests for order's create endpoints", (): void => {
    it('Expects a status of 200 when a correct create request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        user_id: 2,
        status: 'active',
      };

      const response = await request
        .post('/orders/add')
        .set('Authorization', AuthorizeToken)
        .send(body);
      index = response.body.id;
      expect(response.status).toBe(200);
    });
  });

  describe("tests for order's edit endpoints", (): void => {
    it('Expects a status of 200 when a correct edit request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        user_id: 2,
        status: 'complete',
      };

      const response = await request
        .put(`/orders/edit/${index}`)
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for order's delete endpoints", (): void => {
    it('Expects a status of 200 when a correct delete request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .delete(`/orders/delete/${index}`)
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for order's orderProduct endpoints", (): void => {
    it('Expects a status of 200 when a correct delete request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        order_id: 3,
        product_id: 2,
        quantity: 5,
      };

      const response = await request
        .post('/orders/add/product')
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });
  });
});
