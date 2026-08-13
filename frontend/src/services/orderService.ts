import { getAuthenticatedUser } from "./authService";
import type { Order } from "../types/order";
import { cartService } from "./cartService";
import type { Address } from "../types/address";

const STORAGE_KEY = "niscpr_orders";

function generateOrderId(): string {
  const now = new Date();

  return `NISCPR-${now.getFullYear()}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Date.now()}`;
}

class OrderService {
  /**
   * Get ALL orders directly from localStorage.
   * This is used internally so that updating one user's order
   * does not accidentally delete other users' orders.
   */
  private getAllOrders(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) {
        return [];
      }

      const parsed = JSON.parse(data);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to read orders:", error);
      return [];
    }
  }

  /**
   * Save all orders to localStorage.
   */
  saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  /**
   * Get orders for the currently authenticated user.
   *
   * Admin gets all orders.
   * Customers get only their own orders.
   */
  getOrders(): Order[] {
    const user = getAuthenticatedUser();

    if (!user) {
      return [];
    }

    const orders = this.getAllOrders();

    if (user.role === "admin") {
      return orders;
    }

    return orders.filter(
      (order) => order.customerEmail === user.email
    );
  }

  /**
   * Create and place a new order from the current cart.
   */
  placeOrder(selectedAddress: Address): Order | null {
    const user = getAuthenticatedUser();

    if (!user) {
      return null;
    }

    const summary = cartService.getSummary();

    if (!summary.items || summary.items.length === 0) {
      return null;
    }

    const order: Order = {
      id: generateOrderId(),

      customerEmail: user.email,

      customerName:
        (user as { name?: string }).name ||
        user.email.split("@")[0],

      shippingAddress: selectedAddress,

      items: summary.items.map((item) => ({
        id: Number(item.id),
        publication: item.publication,
        quantity: item.quantity,
        price: Number(item.publication.price),
      })),

      booksTotal: Number(summary.subtotal),

      postalCharges: Number(summary.shipping),

      gst: Number(summary.gst),

      grandTotal: Number(summary.grandTotal),

      invoiceNumber: "",

      invoiceSent: false,

      paymentVerified: false,

      courier: "",

      trackingNumber: "",

      shippedAt: "",

      deliveredAt: "",

      expectedDelivery: "",

      status: "REQUEST_SENT",

      createdAt: new Date().toISOString(),
    };

    /**
     * IMPORTANT:
     * Use ALL orders here, not getOrders().
     *
     * Otherwise, if Customer A places an order, their filtered
     * orders could overwrite Customer B's existing orders.
     */
    const orders = this.getAllOrders();

    orders.unshift(order);

    this.saveOrders(orders);

    // Empty cart after successful order creation
    cartService.clearCart();

    return order;
  }

  /**
   * Get a single order belonging to the authenticated user.
   */
  getOrder(id: string): Order | undefined {
    return this.getOrders().find(
      (order) => order.id === id
    );
  }

  /**
   * Update an existing order.
   */
  updateOrder(updatedOrder: Order): void {
    const orders = this.getAllOrders();

    const index = orders.findIndex(
      (order) => order.id === updatedOrder.id
    );

    if (index === -1) {
      return;
    }

    orders[index] = updatedOrder;

    this.saveOrders(orders);
  }

  /**
   * Update order status.
   */
  updateStatus(
    id: string,
    status: Order["status"]
  ): void {
    const orders = this.getAllOrders();

    const order = orders.find(
      (item) => item.id === id
    );

    if (!order) {
      return;
    }

    order.status = status;

    if (status === "SHIPPED") {
      order.shippedAt = new Date().toISOString();
    }

    if (status === "DELIVERED") {
      order.deliveredAt = new Date().toISOString();
    }

    this.saveOrders(orders);
  }

  /**
   * Add invoice details to an order.
   */
  updateInvoice(
    id: string,
    invoiceNumber: string,
    postalCharges: number
  ): void {
    const orders = this.getAllOrders();

    const order = orders.find(
      (item) => item.id === id
    );

    if (!order) {
      return;
    }

    order.invoiceNumber = invoiceNumber;

    order.invoiceSent = true;

    order.postalCharges = Number(postalCharges);

    order.grandTotal =
      Number(order.booksTotal) +
      Number(order.postalCharges) +
      Number(order.gst);

    order.status = "INVOICE_SENT";

    this.saveOrders(orders);
  }

  /**
   * Verify customer payment.
   */
  verifyPayment(id: string): void {
    const orders = this.getAllOrders();

    const order = orders.find(
      (item) => item.id === id
    );

    if (!order) {
      return;
    }

    order.paymentVerified = true;

    order.status = "PAYMENT_RECEIVED";

    this.saveOrders(orders);
  }

  /**
   * Add shipping/tracking information.
   */
  updateTracking(
    id: string,
    courier: string,
    trackingNumber: string,
    expectedDelivery: string
  ): void {
    const orders = this.getAllOrders();

    const order = orders.find(
      (item) => item.id === id
    );

    if (!order) {
      return;
    }

    order.courier = courier;

    order.trackingNumber = trackingNumber;

    order.expectedDelivery = expectedDelivery;

    order.status = "SHIPPED";

    order.shippedAt = new Date().toISOString();

    this.saveOrders(orders);
  }
}

export const orderService = new OrderService();