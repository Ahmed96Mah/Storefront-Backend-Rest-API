import { Product, productStore } from '../../models/product';

const store = new productStore();

describe("tests for product's model integration", (): void => {
  let item: Product;
  let idNumber: number;

  describe('tests for create method', (): void => {
    it('expects create method to be defined', (): void => {
      expect(store.create).toBeDefined();
    });

    it('expects the created product to be returned', async (): Promise<void> => {
      item = {
        name: 'A JavaScript Book',
        price: 60,
        category: 'Programming',
      };

      const createdProduct = await store.create(item);

      idNumber = createdProduct.id as number;

      expect(createdProduct).toEqual({
        id: idNumber,
        name: 'A JavaScript Book',
        price: 60,
        category: 'Programming',
        sold: 0,
      });
    });
  });

  describe('tests for index method', (): void => {
    it('expects index method to be defined', (): void => {
      expect(store.index).toBeDefined();
    });

    it('expects an array of available products to be returned', async (): Promise<void> => {
      const products = await store.index();

      expect(products).toContain({
        id: 5,
        name: 'book5',
        price: 80,
        category: 'categ5',
        sold: 0,
      });
    });
  });

  describe('tests for show method', (): void => {
    it('expects show method to be defined', (): void => {
      expect(store.show).toBeDefined();
    });

    it('expects the selected product to be returned', async (): Promise<void> => {
      item = {
        id: 5,
        name: 'book5',
        price: 80,
        category: 'categ5',
        sold: 0,
      };

      const product = await store.show('5');

      expect(product).toEqual(item);
    });
  });

  describe('tests for edit method', (): void => {
    it('expects edit method to be defined', (): void => {
      expect(store.edit).toBeDefined();
    });

    it('expects the edited product to be returned', async (): Promise<void> => {
      item = {
        id: idNumber,
        name: 'An Edited JavaScript Book',
        price: 150,
        category: 'Programming',
        sold: 0,
      };

      const editedProduct = await store.edit(idNumber.toString(), item);

      expect(editedProduct).toEqual(item);
    });
  });

  describe('tests for delete method', (): void => {
    it('expects delete method to be defined', (): void => {
      expect(store.delete).toBeDefined();
    });

    it('expects the deleted product to be returned', async (): Promise<void> => {
      item = {
        id: idNumber,
        name: 'An Edited JavaScript Book',
        price: 150,
        category: 'Programming',
        sold: 0,
      };

      const deletedProduct = await store.delete(idNumber.toString());

      expect(deletedProduct).toEqual(item);
    });
  });
});
