import React, { useEffect, useState } from 'react';
import {
  Store,
  Users,
  UserRound,
  Coffee,
  ShoppingCart,
  CreditCard,
  Plus,
  ArrowRight,
  Clock3,
  Leaf,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { StatCard, Card, PageHeader, DataTable, LoadingSpinner } from '../components/Common';
import { apiService } from '../services/api';
import { loadCart, clearCart, getCartTotal, formatReceipt, CartItem, updateCartItemQuantity, removeCartItem } from '../services/cart';
import { Order, MenuItem, Customer, Branch } from '../types';

const itemImageMap: Record<string, string> = {
  Espresso: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
  Latte: 'https://plus.unsplash.com/premium_photo-1661743823829-326b78143b30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Croissant: "https://plus.unsplash.com/premium_photo-1661743823829-326b78143b30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
};

export const DashboardPage = () => {
  const navigate = useNavigate(); // ✅ added

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    branches: 0,
    customers: 0,
    employees: 0,
    menuItems: 0,
    orders: 0,
    payments: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');

  useEffect(() => {
    setCartItems(loadCart());
    const fetchData = async () => {
      try {
        const [branches, customers, employees, menu, orders, payments] =
          await Promise.all([
            apiService.branches.getAll(),
            apiService.customers.getAll(),
            apiService.employees.getAll(),
            apiService.menu.getAll(),
            apiService.orders.getAll(),
            apiService.payments.getAll(),
          ]);

        setStats({
          branches: branches.length,
          customers: customers.length,
          employees: employees.length,
          menuItems: menu.length,
          orders: orders.length,
          payments: payments.length,
        });

        setCustomers(customers);
        setBranches(branches);
        setSelectedCustomerId((prev) => prev || customers[0]?.id || '');
        setSelectedBranchId((prev) => prev || branches[0]?.id || '');

        setRecentOrders(orders.slice(0, 5));
        setPopularItems(menu.slice(0, 4));
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClearCart = () => {
    setCartItems(clearCart());
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(removeCartItem(id));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((entry) => entry.id === id);
    if (!item) return;
    setCartItems(updateCartItemQuantity(id, item.quantity + delta));
  };

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const selectedBranch = branches.find((b) => b.id === selectedBranchId);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="A calm look at today’s cafe activity, orders, and best-selling items."
        action={
          <button
            onClick={() => navigate("/orders")} // ✅ FIXED
            className="app-btn-primary px-7 py-4"
          >
            <Plus size={18} />
            <span>Create New Order</span>
          </button>
        }
      />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_1fr]">

        {/* LEFT SECTION */}
        <div className="app-surface p-6 md:p-7">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                Daily Operations
              </p>
              <h2 className="text-2xl font-semibold">
                Steady day at Brew Haven
              </h2>
              <p className="text-sm text-muted">
                Keep an eye on customer flow, menu performance, and completed orders across branches.
              </p>
            </div>

            <div className="flex items-center gap-2 text-muted">
              <Clock3 size={18} />
              Refreshed just now
            </div>
          </div>

          {/* STATS */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <StatCard title="Total Branches" value={stats.branches} icon={Store} />
            <StatCard title="Total Customers" value={stats.customers} icon={UserRound} />
            <StatCard title="Total Employees" value={stats.employees} icon={Users} />
            <StatCard title="Menu Items" value={stats.menuItems} icon={Coffee} />
            <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} />
            <StatCard title="Payments" value={stats.payments} icon={CreditCard} />
          </div>
        </div>

        {/* RIGHT SECTION - POPULAR ITEMS */}
        <div className="app-surface p-6 md:p-7">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Popular Items</h3>
            <Leaf size={18} />
          </div>

          <p className="text-sm text-muted mt-1">
            Featured menu picks customers are ordering most often.
          </p>

          <div className="mt-5 space-y-4">
            {popularItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={itemImageMap[item.name] || itemImageMap["Espresso"]}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted">{item.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                  <p className="text-xs text-green-600">
                    {item.availability ? "In stock" : "Out of stock"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/menu")} // ✅ FIXED
            className="app-btn-secondary mt-6 w-full justify-center"
          >
            View Full Menu
          </button>
        </div>
      </div>

      <Card
        title="Cart"
        subtitle="Track selected menu items and generate a bill receipt from the dashboard."
        action={
          <button
            type="button"
            onClick={handleClearCart}
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-forest-deep"
          >
            Clear Cart
          </button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Customer</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="app-input w-full"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Branch</label>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="app-input w-full"
            >
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-line bg-card p-6 text-sm text-muted">
            Your cart is empty. Add items from the menu page to build a bill.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl border border-line bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Cart Items</h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted">Rs {item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="app-icon-btn"
                        >
                          -
                        </button>
                        <span className="min-w-[32px] text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="app-icon-btn"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Rs {(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveCartItem(item.id)}
                          className="text-xs text-[#9a5748] underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Receipt</h3>
                <pre className="whitespace-pre-wrap rounded-3xl bg-[#faf8f4] p-4 text-sm leading-6 text-ink">
                  {formatReceipt(cartItems, selectedCustomer?.name, selectedBranch?.name)}
                </pre>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-line bg-card p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted">Total items</p>
                <p className="text-2xl font-semibold">{cartItems.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Bill total</p>
                <p className="text-2xl font-semibold">Rs {getCartTotal(cartItems).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* RECENT ORDERS */}
      <Card
        title="Recent Orders"
        subtitle="Latest transactions across all branches"
        action={
          <button
            onClick={() => navigate("/orders")} // ✅ FIXED
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-forest-deep"
          >
            View All <ArrowRight size={16} />
          </button>
        }
      >
        <DataTable
          columns={[
            { key: "id", label: "Order ID" },
            { key: "orderDate", label: "Date" },
            { key: "totalAmount", label: "Amount" },
            { key: "status", label: "Status" },
          ]}
          data={recentOrders}
        />
      </Card>
    </div>
  );
};