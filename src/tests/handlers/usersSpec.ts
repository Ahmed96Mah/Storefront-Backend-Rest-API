import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('tests for users endpoints', (): void => {
  describe("tests for user's index endpoint", (): void => {
    it('Expects a status of 200 when an index request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/users')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for user's show endpoint", (): void => {
    it('Expects a status of 200 when a correct show request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/users/1')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(200);
    });

    it('Expects a status of 400 when a wrong show request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .get('/users/100')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(400);
    });
  });
  describe("tests for user's create endpoint", (): void => {
    it('Expects a status of 200 when a correct create request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        firstName: 'Matt',
        lastName: 'Daemon',
        password: 'password123',
      };

      const response = await request
        .post('/users/add')
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for user's edit endpoint", (): void => {
    it('Expects a status of 200 when a correct edit request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        firstName: 'Jack',
        lastName: 'Reacher',
        password: 'password123',
      };
      const response = await request
        .put('/users/edit/3')
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for user's delete endpoint", (): void => {
    it('Expects a status of 200 when a correct delete request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const response = await request
        .delete('/users/delete/3')
        .set('Authorization', AuthorizeToken);
      expect(response.status).toBe(200);
    });
  });

  describe("tests for user's authenticate endpoint", (): void => {
    it('Expects a status of 200 when a correct authenticate request is made', async (): Promise<void> => {
      const AuthorizeToken =
        'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOm51bGwsImlhdCI6MTY1MTc2MDk1Nn0.ODnaSTtBBbo0vbOJCNreUXuz58VqUkT_dif-Yjzyv6o';

      const body = {
        password: 'password123',
      };
      const response = await request
        .get('/users/auth/1')
        .set('Authorization', AuthorizeToken)
        .send(body);
      expect(response.status).toBe(200);
    });
  });
});
