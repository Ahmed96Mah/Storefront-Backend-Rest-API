import { Order, Ordered, orderStore } from '../../models/order';

const store = new orderStore();

describe("tests for order's model integration", (): void => {
  let item: Order;
  let product: Ordered;
  let orderID: number;

  describe('tests for create method', (): void => {
    it('expects create method to be defined', (): void => {
      expect(store.create).toBeDefined();
    });

    it('expects the created order to be returned', async (): Promise<void> => {
      item = {
        user_id: 2,
        status: 'active',
      };
      const createdOrder = await store.create(item);
      orderID = createdOrder.id as number;
      expect(createdOrder).toEqual({
        id: orderID,
        user_id: 2,
        status: 'active',
      });
    });
  });

  describe('tests for index method', (): void => {
    it('expects index method to be defined', (): void => {
      expect(store.index).toBeDefined();
    });

    it('expects an array of available orders to be returned', async (): Promise<void> => {
      item = {
        id: 2,
        user_id: 1,
        status: 'active',
      };
      const orders = await store.index();
      expect(orders).toContain(item);
    });
  });

  describe('tests for show method', (): void => {
    it('expects show method to be defined', (): void => {
      expect(store.show).toBeDefined();
    });

    it('expects the selected order to be returned', async (): Promise<void> => {
      item = {
        id: orderID,
        user_id: 2,
        status: 'active',
      };
      const order = await store.show(orderID.toString());
      expect(order).toEqual(item);
    });
  });

  describe('tests for edit method', (): void => {
    it('expects edit method to be defined', (): void => {
      expect(store.edit).toBeDefined();
    });

    it('expects the edited order to be returned', async (): Promise<void> => {
      item = {
        id: orderID,
        user_id: 2,
        status: 'complete',
      };
      const editedOrder = await store.edit(orderID.toString(), item);
      expect(editedOrder).toEqual(item);
    });
  });

  describe('tests for delete method', (): void => {
    it('expects delete method to be defined', (): void => {
      expect(store.delete).toBeDefined();
    });

    it('expects the deleted order to be returned', async (): Promise<void> => {
      const deletedOrder = await store.delete(orderID.toString());
      expect(deletedOrder).toEqual({
        id: orderID,
        user_id: 2,
        status: 'complete',
      });
    });
  });

  describe('tests for orderProduct method', (): void => {
    it('expects orderProduct method to be defined', (): void => {
      expect(store.orderProduct).toBeDefined();
    });

    it('expects the ordered poduct to be returned', async (): Promise<void> => {
      product = {
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 0,
      };
      const orderedProduct = await store.orderProduct(product);
      expect(orderedProduct).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 5,
      });
    });
  });
});
