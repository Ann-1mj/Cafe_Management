import { MenuItem } from '../types';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CART_KEY = 'cafe_management_cart';

export const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (item: MenuItem, quantity = 1): CartItem[] => {
  const cart = loadCart();
  const existing = cart.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
    });
  }

  saveCart(cart);
  return cart;
};

export const updateCartItemQuantity = (id: string, quantity: number): CartItem[] => {
  const cart = loadCart();
  const updated = cart
    .map((entry) =>
      entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry
    )
    .filter((entry) => entry.quantity > 0);

  saveCart(updated);
  return updated;
};

export const removeCartItem = (id: string): CartItem[] => {
  const cart = loadCart().filter((entry) => entry.id !== id);
  saveCart(cart);
  return cart;
};

export const clearCart = (): CartItem[] => {
  saveCart([]);
  return [];
};

export const getCartTotal = (cart: CartItem[]) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const formatReceipt = (
  cart: CartItem[],
  customerName?: string,
  branchName?: string
) => {
  const total = getCartTotal(cart);
  const now = new Date();
  const formattedDate = now.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines = cart.map(
    (item, index) =>
      `${index + 1}. ${item.name} x${item.quantity}  Rs ${item.price.toFixed(2)}  Rs ${(item.price * item.quantity).toFixed(2)}`
  );

  return [
    'BILL RECEIPT',
    `Date: ${formattedDate}`,
    customerName ? `Customer: ${customerName}` : 'Customer: -',
    branchName ? `Branch: ${branchName}` : 'Branch: -',
    '------------------------------',
    ...lines,
    '------------------------------',
    `Total: Rs ${total.toFixed(2)}`,
    'Thank you for shopping at Brew Haven!',
  ].join('\n');
};
