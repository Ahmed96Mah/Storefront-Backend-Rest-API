import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('tests for dashboards endpoints', (): void => {
  describe("tests for dashboard's showByCateg endpoints", (): void => {
    it('Expects a status of 200 when a correct show request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/dashboard/products/category/categ1')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(200);
    });

    it('Expects a status of 400 when a wrong show request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/dashboard/products/category/categ100')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(400);
    });
  });

  describe("tests for dashboard's orderByUser endpoints", (): void => {
    it('Expects a status of 200 when a correct get request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        status: 'active',
      };

      const response = await request
        .get('/dashboard/orders/users/1')
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });

    it('Expects a status of 400 when a wrong get request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/dashboard/orders/users/100')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(400);
    });
  });

  describe("tests for dashboard's top5Products endpoints", (): void => {
    it('Expects a status of 400 when a correct get request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/dashboard/products/top5')
        .set('Authorization', AuthorizeToken);
      // The correct status is 400 until the first checkout is made.
      expect(response.status).toBe(400);
    });
  });
});
