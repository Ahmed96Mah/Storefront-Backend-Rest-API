import { User, userStore } from '../../models/user';

const store = new userStore();

describe("tests for user's model integration", (): void => {
  let item: User;
  let userID: number;

  describe('tests for create method', (): void => {
    it('expects create method to be defined', (): void => {
      expect(store.create).toBeDefined();
    });

    it("expects the created user's to be returned", async (): Promise<void> => {
      item = {
        firstName: 'Ahmed',
        lastName: 'Mahmoud',
        password: 'This is my password',
      };

      const createdUser = await store.create(item);

      userID = createdUser.id as number;

      //@ts-ignore
      expect(createdUser.firstname).toEqual(item.firstName);
      //@ts-ignore
      expect(createdUser.lastname).toEqual(item.lastName);
      expect(createdUser.password).not.toEqual(item.password);
    });
  });

  describe('tests for index method', (): void => {
    it('expects index method to be defined', (): void => {
      expect(store.index).toBeDefined();
    });

    it('expects an array of available users to be returned', async (): Promise<void> => {
      item = {
        firstName: 'Ahmed',
        lastName: 'Mahmoud',
        password:
          '$2b$10$Tv5u.Cyd9nQ1mneWvucKXOTf/b6hElHguOnCjuuQ3nv0V12O6VJjy',
      };

      const users = await store.index();

      //@ts-ignore
      expect(users[0].firstname).toEqual(item.firstName);
      //@ts-ignore
      expect(users[0].lastname).toEqual(item.lastName);
      expect(users[0].password).toEqual(item.password);
    });
  });

  describe('tests for show method', (): void => {
    it('expects show method to be defined', (): void => {
      expect(store.show).toBeDefined();
    });

    it('expects the selected user to be returned', async (): Promise<void> => {
      item = {
        id: 1,
        firstName: 'Ahmed',
        lastName: 'Mahmoud',
        password:
          '$2b$10$Tv5u.Cyd9nQ1mneWvucKXOTf/b6hElHguOnCjuuQ3nv0V12O6VJjy',
      };

      const user = await store.show(1);

      //@ts-ignore
      expect(user?.info.firstname).toEqual(item.firstName);
      //@ts-ignore
      expect(user?.info.lastname).toEqual(item.lastName);
      expect(user?.info.password).toEqual(item.password);
    });
  });

  describe('tests for edit method', (): void => {
    it('expects edit method to be defined', (): void => {
      expect(store.edit).toBeDefined();
    });

    it('expects the edited user to be returned', async (): Promise<void> => {
      item = {
        id: userID,
        firstName: 'Ahmed',
        lastName: 'Abdalwahab',
        password: 'This is my password',
      };

      const editedUser = await store.edit(userID, item);

      //@ts-ignore
      expect(editedUser?.firstname).toEqual(item.firstName);
      //@ts-ignore
      expect(editedUser?.lastname).toEqual(item.lastName);
      expect(editedUser?.password).not.toEqual(item.password);
    });
  });

  describe('tests for delete method', (): void => {
    it('expects delete method to be defined', (): void => {
      expect(store.delete).toBeDefined();
    });

    it('expects the deleted user to be returned', async (): Promise<void> => {
      item = {
        id: userID,
        firstName: 'Ahmed',
        lastName: 'Abdalwahab',
        password: 'This is my password',
      };

      const deletedUser = await store.delete(userID);

      //@ts-ignore
      expect(deletedUser?.firstname).toEqual(item.firstName);
      //@ts-ignore
      expect(deletedUser?.lastname).toEqual(item.lastName);
      expect(deletedUser?.password).not.toEqual(item.password);
    });
  });

  describe('tests for authenticate method', (): void => {
    it('expects authenticate method to be defined', (): void => {
      expect(store.authenticate).toBeDefined();
    });

    it('expects the authenticated user to be returned', async (): Promise<void> => {
      item = {
        id: 1,
        firstName: 'Ahmed',
        lastName: 'Mahmoud',
        password: 'password123',
      };

      const authenticatedUser = await store.authenticate(1, 'password123');

      //@ts-ignore
      expect(authenticatedUser?.firstname).toEqual(item.firstName);
      //@ts-ignore
      expect(authenticatedUser?.lastname).toEqual(item.lastName);
      expect(authenticatedUser?.password).not.toEqual(item.password);
    });
  });
});
