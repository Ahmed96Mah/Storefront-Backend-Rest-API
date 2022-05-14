import { dashboardStore } from '../../services/dashboard';
import { Product } from '../../models/product';
import { Order } from '../../models/order';

const store = new dashboardStore();

describe("tests for dashboard's model integration", (): void => {
  let item: Product;
  let ord: Order;

  describe('tests for showByCateg method', (): void => {
    it('expects showByCateg method to be defined', (): void => {
      expect(store.showByCateg).toBeDefined();
    });

    it('expects a list of products by category to be returned', async (): Promise<void> => {
      item = {
        id: 5,
        name: 'book5',
        price: 80,
        category: 'categ5',
        sold: 0,
      };

      const productsByCateg = await store.showByCateg('categ5');

      expect(productsByCateg).toContain(item);
    });
  });

  describe('tests for orderByUser method', (): void => {
    it('expects orderByUser method to be defined', (): void => {
      expect(store.orderByUser).toBeDefined();
    });

    it('expects a list of orders by user to be returned', async (): Promise<void> => {
      ord = {
        id: 2,
        user_id: 1,
        status: 'active',
      };

      const orders = await store.orderByUser('1', 'active');

      expect(orders).toContain(ord);
    });
  });
});
