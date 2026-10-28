import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  Eye,
  Filter,
  Mail,
  MoreVertical,
  Package,
  Plus,
  Printer,
  Search,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Truck,
  Upload,
  X,
} from "lucide-react";
import { DemoPage, DemoSection, fieldClass, labelClass } from "../../../shared/components/layout/DemoPage";

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm text-white transition-opacity hover:opacity-90";
const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-app-hover";
const iconBtn =
  "rounded-md p-1.5 text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary";

const statusTone: Record<string, string> = {
  Paid: "border-green-500/30 bg-green-500/10 text-green-500",
  Completed: "border-green-500/30 bg-green-500/10 text-green-500",
  Captured: "border-green-500/30 bg-green-500/10 text-green-500",
  Settled: "border-green-500/30 bg-green-500/10 text-green-500",
  Published: "border-green-500/30 bg-green-500/10 text-green-500",
  "In stock": "border-green-500/30 bg-green-500/10 text-green-500",
  Pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  Processing: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  "Low stock": "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  Overdue: "border-red-500/30 bg-red-500/10 text-red-500",
  Failed: "border-red-500/30 bg-red-500/10 text-red-500",
  "Out of stock": "border-red-500/30 bg-red-500/10 text-red-500",
  Refunded: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  Draft: "border-app-border bg-app-hover text-text-muted",
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
        statusTone[status] ?? "border-app-border bg-app-hover text-text-muted"
      }`}
    >
      {status}
    </span>
  );
}

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  tone: string;
}

function StatsCard({ label, value, change, icon: Icon, tone }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-app-border bg-app-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-text-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">{value}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>
          <Icon size={18} />
        </span>
      </div>
      {change && (
        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-text-muted">
          <span className="inline-flex items-center gap-1 font-medium text-green-500">
            <TrendingUp size={12} />
            {change}
          </span>
          vs last month
        </p>
      )}
    </div>
  );
}

function Pagination({ total }: { total: number }) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(total / 8));
  const from = (page - 1) * 8 + 1;
  const to = Math.min(page * 8, total);

  return (
    <div className="flex flex-col gap-3 border-t border-app-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-text-muted">
        Showing <span className="text-text-secondary">{from}</span> to{" "}
        <span className="text-text-secondary">{to}</span> of{" "}
        <span className="text-text-secondary">{total.toLocaleString()}</span> results
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>
        {Array.from({ length: Math.min(pages, 3) }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-8 min-w-8 rounded-md px-2 text-xs transition-colors ${
              page === p ? "bg-accent text-white" : "text-text-secondary hover:bg-app-hover"
            }`}
          >
            {p}
          </button>
        ))}
        {pages > 4 && <span className="px-1 text-xs text-text-muted">…</span>}
        {pages > 3 && (
          <button
            onClick={() => setPage(pages)}
            className={`h-8 min-w-8 rounded-md px-2 text-xs transition-colors ${
              page === pages ? "bg-accent text-white" : "text-text-secondary hover:bg-app-hover"
            }`}
          >
            {pages}
          </button>
        )}
        <button
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-app-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "Published" | "Draft";
  gradient: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Wireless Headphones", sku: "WH-1000", category: "Audio", price: 299, stock: 42, status: "Published", gradient: "from-accent/40 to-purple-500/30" },
  { id: 2, name: "Smart Watch Pro", sku: "SW-204", category: "Wearables", price: 389, stock: 18, status: "Published", gradient: "from-blue-500/40 to-accent/30" },
  { id: 3, name: "Mechanical Keyboard", sku: "MK-880", category: "Accessories", price: 149, stock: 7, status: "Published", gradient: "from-green-500/30 to-accent/20" },
  { id: 4, name: "4K Action Camera", sku: "AC-512", category: "Cameras", price: 429, stock: 0, status: "Published", gradient: "from-yellow-500/30 to-accent/20" },
  { id: 5, name: "USB-C Docking Station", sku: "DS-330", category: "Accessories", price: 189, stock: 24, status: "Published", gradient: "from-purple-500/40 to-accent/30" },
  { id: 6, name: "Noise Cancelling Earbuds", sku: "EB-119", category: "Audio", price: 199, stock: 5, status: "Published", gradient: "from-red-500/30 to-accent/20" },
  { id: 7, name: "Portable SSD 2TB", sku: "SS-2048", category: "Storage", price: 259, stock: 63, status: "Published", gradient: "from-accent/40 to-blue-500/30" },
  { id: 8, name: "Studio Microphone", sku: "MC-777", category: "Audio", price: 179, stock: 0, status: "Draft", gradient: "from-accent/30 to-purple-500/20" },
];

function stockStatus(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock <= 10) return "Low stock";
  return "In stock";
}

export function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");

  const filtered = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.sku}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All categories" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const removeProduct = (id: number) =>
    setProducts((current) => current.filter((product) => product.id !== id));

  return (
    <DemoPage title="Products" description="Manage your catalogue, stock levels and product visibility.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total products" value="248" change="+12.4%" icon={Package} tone="bg-accent/10 text-accent-light" />
        <StatsCard label="Active listings" value="196" change="+4.2%" icon={ShoppingCart} tone="bg-green-500/10 text-green-500" />
        <StatsCard label="Low stock" value="12" icon={Truck} tone="bg-yellow-500/10 text-yellow-500" />
        <StatsCard label="Inventory value" value="$184,250" change="+8.7%" icon={DollarSign} tone="bg-blue-500/10 text-blue-500" />
      </div>

      <div className="rounded-lg border border-app-border bg-app-surface">
        <div className="flex flex-col gap-3 border-b border-app-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products or SKU..."
                className={`${fieldClass} pl-9`}
              />
            </div>
            <div className="w-full sm:w-44">
              <select value={category} onChange={(event) => setCategory(event.target.value)} className={fieldClass}>
                <option>All categories</option>
                <option>Audio</option>
                <option>Wearables</option>
                <option>Accessories</option>
                <option>Cameras</option>
                <option>Storage</option>
              </select>
            </div>
            <button className={secondaryBtn}>
              <Filter size={15} />
              Filters
            </button>
          </div>
          <button className={primaryBtn}>
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {filtered.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-app-hover/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${product.gradient}`}>
                        <Package size={17} className="text-text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-text-primary">{product.name}</p>
                        <p className="text-[11px] text-text-muted">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={stockStatus(product.stock)} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={product.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className={iconBtn} aria-label={`View ${product.name}`}>
                        <Eye size={15} />
                      </button>
                      <button className={iconBtn} aria-label={`Edit ${product.name}`}>
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className={`${iconBtn} hover:bg-red-500/10 hover:text-red-500`}
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <Package size={28} className="mx-auto text-text-dim" />
            <p className="mt-3 text-sm text-text-secondary">No products match your filters.</p>
            <p className="mt-1 text-xs text-text-muted">Try a different search term or category.</p>
          </div>
        ) : (
          <Pagination total={248} />
        )}
      </div>
    </DemoPage>
  );
}

export function AddProductPage() {
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [featured, setFeatured] = useState(true);
  const [images, setImages] = useState([
    "from-accent/40 to-purple-500/30",
    "from-blue-500/40 to-accent/30",
    "from-green-500/30 to-accent/20",
  ]);

  return (
    <DemoPage title="Add Product" description="Create a new listing and configure how it appears in your store.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <DemoSection title="Product Information" description="Basic details shown on the product page.">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className={labelClass}>Product name</span>
                <input defaultValue="Wireless Headphones" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>SKU</span>
                <input defaultValue="WH-1000" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Category</span>
                <select defaultValue="Audio" className={fieldClass}>
                  <option>Audio</option>
                  <option>Wearables</option>
                  <option>Accessories</option>
                  <option>Cameras</option>
                  <option>Storage</option>
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Regular price</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">$</span>
                  <input type="number" defaultValue={299} className={`${fieldClass} pl-7`} />
                </div>
              </label>
              <label className="block">
                <span className={labelClass}>Sale price</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">$</span>
                  <input type="number" defaultValue={249} className={`${fieldClass} pl-7`} />
                </div>
              </label>
              <label className="block">
                <span className={labelClass}>Stock quantity</span>
                <input type="number" defaultValue={42} className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Barcode</span>
                <input defaultValue="5061234567890" className={fieldClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>Description</span>
                <textarea
                  rows={5}
                  defaultValue="Premium over-ear headphones with adaptive noise cancellation, 40-hour battery life and a lightweight memory foam headband."
                  className={fieldClass}
                />
              </label>
            </div>
          </DemoSection>

          <DemoSection title="Product Images" description="Upload up to 6 images. The first image is used as the cover.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((gradient, index) => (
                <div key={`${gradient}-${index}`} className="group relative">
                  <div className={`flex aspect-square items-center justify-center rounded-lg border border-app-border bg-gradient-to-br ${gradient}`}>
                    <Package size={24} className="text-text-primary" />
                  </div>
                  {index === 0 && (
                    <span className="absolute left-1.5 top-1.5 rounded bg-app-surface/90 px-1.5 py-0.5 text-[10px] font-medium text-text-primary">
                      Cover
                    </span>
                  )}
                  <button
                    onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
                    aria-label="Remove image"
                    className="absolute right-1.5 top-1.5 rounded-md bg-app-surface/90 p-1 text-text-muted opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-app-border bg-app-bg text-center transition-colors hover:bg-app-hover">
                <Upload size={20} className="text-text-muted" />
                <span className="mt-2 text-[11px] text-text-muted">Drop or browse</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(event) => {
                    if (event.target.files?.length) {
                      setImages((current) => [...current, "from-purple-500/40 to-accent/30"]);
                    }
                  }}
                />
              </label>
            </div>
            <p className="mt-3 text-[11px] text-text-muted">PNG, JPG or WebP up to 5 MB each. 1200 × 1200 px recommended.</p>
          </DemoSection>
        </div>

        <div className="space-y-5">
          <DemoSection title="Organization">
            <div className="space-y-3">
              <span className={labelClass}>Product status</span>
              {(["Published", "Draft"] as const).map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
                    status === option ? "border-accent/40 bg-accent/10" : "border-app-border bg-app-bg hover:bg-app-hover"
                  }`}
                >
                  <span>
                    <span className="block text-sm text-text-primary">{option}</span>
                    <span className="block text-[11px] text-text-muted">
                      {option === "Published" ? "Visible in your storefront" : "Hidden until you publish"}
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="product-status"
                    checked={status === option}
                    onChange={() => setStatus(option)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      status === option ? "border-accent bg-accent" : "border-app-border"
                    }`}
                  >
                    {status === option && <Check size={10} className="text-white" />}
                  </span>
                </label>
              ))}

              <label className="block pt-2">
                <span className={labelClass}>Tags</span>
                <input defaultValue="wireless, audio, bluetooth" className={fieldClass} />
              </label>

              <div className="flex items-center justify-between gap-3 rounded-lg border border-app-border bg-app-bg p-3">
                <span className="flex items-center gap-2 text-sm text-text-primary">
                  <Star size={15} className="text-yellow-500" />
                  Featured product
                </span>
                <button
                  onClick={() => setFeatured(!featured)}
                  aria-label="Toggle featured product"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    featured ? "bg-accent" : "border border-app-border bg-app-hover"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-app-bg transition-transform ${
                      featured ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-app-border pt-4">
              <button className={`${secondaryBtn} flex-1`}>Cancel</button>
              <button className={`${primaryBtn} flex-1`}>
                <Check size={15} />
                Save
              </button>
            </div>
          </DemoSection>

          <DemoSection title="Storefront Preview" className="p-5">
            <div className="flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-accent/40 to-purple-500/30">
              <Package size={30} className="text-text-primary" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-text-primary">Wireless Headphones</p>
                <p className="text-[11px] text-text-muted">Audio · WH-1000</p>
              </div>
              <p className="text-sm font-semibold text-text-primary">$299</p>
            </div>
            <p className="mt-2 text-[11px] text-text-muted">Adaptive noise cancellation · 40-hour battery</p>
          </DemoSection>
        </div>
      </div>
    </DemoPage>
  );
}

const paymentMethods = [
  { id: "card", mark: "VISA", label: "Credit card", detail: "Visa, Mastercard, Amex" },
  { id: "paypal", mark: "PP", label: "PayPal", detail: "Pay with your balance" },
  { id: "bank", mark: "BANK", label: "Bank transfer", detail: "Direct transfer" },
] as const;

const orderItems = [
  { name: "Wireless Headphones", variant: "Matte black", qty: 1, price: "$299.00", gradient: "from-accent/40 to-purple-500/30" },
  { name: "Mechanical Keyboard", variant: "Tactile switches", qty: 2, price: "$298.00", gradient: "from-blue-500/40 to-accent/30" },
  { name: "USB-C Docking Station", variant: "12-in-1 hub", qty: 1, price: "$189.00", gradient: "from-green-500/30 to-accent/20" },
];

export function BillingPage() {
  const [method, setMethod] = useState<"card" | "paypal" | "bank">("card");

  return (
    <DemoPage title="Billing" description="Complete your billing details and review your order before payment.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <DemoSection title="Billing Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>First name</span>
                <input defaultValue="Olivia" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Last name</span>
                <input defaultValue="Bennett" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Email address</span>
                <input type="email" defaultValue="olivia@northwind.co" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Phone number</span>
                <input type="tel" defaultValue="+1 (555) 014-2890" className={fieldClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>Street address</span>
                <input defaultValue="2148 Northwind Avenue, Suite 400" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>City</span>
                <input defaultValue="San Francisco" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Postcode</span>
                <input defaultValue="94107" className={fieldClass} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelClass}>Country</span>
                <select defaultValue="United States" className={fieldClass}>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Germany</option>
                  <option>Australia</option>
                </select>
              </label>
            </div>
          </DemoSection>

          <DemoSection title="Payment Method" description="Choose how you would like to pay for this order.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {paymentMethods.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    method === option.id
                      ? "border-accent/40 bg-accent/10"
                      : "border-app-border bg-app-bg hover:bg-app-hover"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={method === option.id}
                    onChange={() => setMethod(option.id)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold ${
                      method === option.id ? "bg-accent/20 text-accent-light" : "bg-app-hover text-text-muted"
                    }`}
                  >
                    {option.mark}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-text-primary">{option.label}</span>
                    <span className="block truncate text-[11px] text-text-muted">{option.detail}</span>
                  </span>
                </label>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className={labelClass}>Card number</span>
                  <div className="relative">
                    <CreditCard size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input defaultValue="4242 4242 4242 4242" inputMode="numeric" className={`${fieldClass} pl-9`} />
                  </div>
                </label>
                <label className="block">
                  <span className={labelClass}>Expiry date</span>
                  <input defaultValue="09 / 28" className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>CVC</span>
                  <input defaultValue="•••" inputMode="numeric" className={fieldClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelClass}>Name on card</span>
                  <input defaultValue="Olivia Bennett" className={fieldClass} />
                </label>
              </div>
            )}

            {method === "paypal" && (
              <div className="mt-5 rounded-lg border border-app-border bg-app-bg p-4 text-xs text-text-muted">
                You will be redirected to PayPal to approve the payment after reviewing your order.
              </div>
            )}

            {method === "bank" && (
              <div className="mt-5 rounded-lg border border-app-border bg-app-bg p-4">
                <p className="text-xs font-medium text-text-primary">Bank transfer details</p>
                <dl className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-text-muted sm:grid-cols-2">
                  <div><dt className="inline text-text-dim">Account name: </dt><dd className="inline text-text-secondary">TailAdmin Supply Co.</dd></div>
                  <div><dt className="inline text-text-dim">IBAN: </dt><dd className="inline text-text-secondary">GB29 NWBK 6016 1331 9268 19</dd></div>
                  <div><dt className="inline text-text-dim">Reference: </dt><dd className="inline text-text-secondary">ORD-88214</dd></div>
                  <div><dt className="inline text-text-dim">Processing: </dt><dd className="inline text-text-secondary">1-2 business days</dd></div>
                </dl>
              </div>
            )}
          </DemoSection>

          <label className="block">
            <span className={labelClass}>Order notes (optional)</span>
            <textarea rows={3} placeholder="Delivery instructions or a note for our team..." className={fieldClass} />
          </label>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-app-border bg-app-surface">
            <div className="flex items-center justify-between border-b border-app-border p-5">
              <div>
                <h2 className="text-base font-semibold text-text-primary">Order Summary</h2>
                <p className="text-[11px] text-text-muted">Order #ORD-88214</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-light">
                <ShoppingCart size={12} />
                4 items
              </span>
            </div>

            <div className="space-y-4 p-5">
              {orderItems.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient}`}>
                    <Package size={16} className="text-text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-text-primary">{item.name}</p>
                    <p className="text-[11px] text-text-muted">
                      {item.variant} · Qty {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-text-primary">{item.price}</p>
                </div>
              ))}

              <div className="space-y-1.5 border-t border-app-border pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="text-text-primary">$786.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Tax (8%)</span>
                  <span className="text-text-primary">$62.88</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-text-muted">
                    <Truck size={13} />
                    Shipping
                  </span>
                  <span className="text-text-primary">$12.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-app-border pt-4">
                <span className="text-sm font-medium text-text-primary">Total due</span>
                <span className="text-xl font-semibold text-text-primary">$860.88</span>
              </div>

              <div className="flex gap-2">
                <input placeholder="Promo code" className={fieldClass} />
                <button className={secondaryBtn}>Apply</button>
              </div>

              <button className={`${primaryBtn} w-full py-3`}>
                <CreditCard size={16} />
                Pay $860.88
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
                <Check size={12} className="text-green-500" />
                Payments are encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </DemoPage>
  );
}

interface Invoice {
  id: string;
  customer: string;
  email: string;
  date: string;
  due: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
}

const invoices: Invoice[] = [
  { id: "INV-2024-0184", customer: "Olivia Bennett", email: "olivia@northwind.co", date: "Oct 24, 2025", due: "Nov 07, 2025", amount: "$1,240.00", status: "Paid" },
  { id: "INV-2024-0183", customer: "Marcus Chen", email: "marcus@luminary.io", date: "Oct 22, 2025", due: "Nov 05, 2025", amount: "$3,180.00", status: "Pending" },
  { id: "INV-2024-0182", customer: "Bluebird Labs", email: "billing@bluebird.dev", date: "Oct 19, 2025", due: "Nov 02, 2025", amount: "$875.50", status: "Paid" },
  { id: "INV-2024-0181", customer: "Sofia Ramirez", email: "sofia@atlasdesign.co", date: "Oct 15, 2025", due: "Oct 29, 2025", amount: "$2,460.00", status: "Overdue" },
  { id: "INV-2024-0180", customer: "Acme Studio", email: "accounts@acmestudio.com", date: "Oct 12, 2025", due: "Oct 26, 2025", amount: "$640.00", status: "Paid" },
  { id: "INV-2024-0179", customer: "Daniel Okafor", email: "daniel@vertexhq.io", date: "Oct 08, 2025", due: "Oct 22, 2025", amount: "$1,920.00", status: "Pending" },
  { id: "INV-2024-0178", customer: "Harbor & Co.", email: "finance@harborco.com", date: "Oct 04, 2025", due: "Oct 18, 2025", amount: "$4,580.00", status: "Draft" },
];

const invoiceTabs = ["All", "Paid", "Pending", "Overdue"] as const;

export function InvoicesPage() {
  const [tab, setTab] = useState<(typeof invoiceTabs)[number]>("All");
  const [search, setSearch] = useState("");

  const filtered = invoices.filter((invoice) => {
    const matchesTab = tab === "All" || invoice.status === tab;
    const matchesSearch = `${invoice.id} ${invoice.customer}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DemoPage title="Invoices" description="Track issued invoices, payment status and outstanding balances.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total invoices" value="248" change="+18 this month" icon={Package} tone="bg-accent/10 text-accent-light" />
        <StatsCard label="Paid" value="$48,920" change="+8.1%" icon={Check} tone="bg-green-500/10 text-green-500" />
        <StatsCard label="Pending" value="$12,340" icon={CreditCard} tone="bg-yellow-500/10 text-yellow-500" />
        <StatsCard label="Overdue" value="$3,120" icon={X} tone="bg-red-500/10 text-red-500" />
      </div>

      <div className="rounded-lg border border-app-border bg-app-surface">
        <div className="flex flex-col gap-3 border-b border-app-border p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-app-bg p-1">
            {invoiceTabs.map((option) => (
              <button
                key={option}
                onClick={() => setTab(option)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === option ? "bg-app-active text-text-primary" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {option}
                {option !== "All" && (
                  <span className="ml-1.5 text-[10px] text-text-dim">
                    {invoices.filter((invoice) => invoice.status === option).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-56">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search invoices..."
                className={`${fieldClass} pl-9`}
              />
            </div>
            <button className={secondaryBtn}>
              <Filter size={15} />
              Filters
            </button>
            <button className={primaryBtn}>
              <Plus size={16} />
              Create Invoice
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Invoice #</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Due date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {filtered.map((invoice) => (
                <tr key={invoice.id} className="transition-colors hover:bg-app-hover/50">
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{invoice.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-text-primary">{invoice.customer}</p>
                    <p className="text-[11px] text-text-muted">{invoice.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{invoice.date}</td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{invoice.due}</td>
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={invoice.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className={iconBtn} aria-label={`View ${invoice.id}`}>
                        <Eye size={15} />
                      </button>
                      <button className={iconBtn} aria-label={`Download ${invoice.id}`}>
                        <Download size={15} />
                      </button>
                      <button className={iconBtn} aria-label={`More options for ${invoice.id}`}>
                        <MoreVertical size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-text-secondary">No invoices found.</p>
            <p className="mt-1 text-xs text-text-muted">Adjust the status filter or search term.</p>
          </div>
        ) : (
          <Pagination total={248} />
        )}
      </div>
    </DemoPage>
  );
}

export function SingleInvoicePage() {
  return (
    <DemoPage title="Invoice Details" description="Review the invoice, download a copy or send it to your customer.">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className={`${secondaryBtn} w-fit`}>
          <ArrowLeft size={15} />
          Back to invoices
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <button className={secondaryBtn}>
            <Printer size={15} />
            Print
          </button>
          <button className={secondaryBtn}>
            <Download size={15} />
            Download
          </button>
          <button className={primaryBtn}>
            <Mail size={15} />
            Email invoice
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-app-border bg-app-surface p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple-500/60">
              <Package size={22} className="text-white" />
            </div>
            <div>
              <p className="text-base font-semibold text-text-primary">TailAdmin Supply Co.</p>
              <p className="mt-1 text-xs leading-5 text-text-muted">
                2148 Northwind Avenue, Suite 400
                <br />
                San Francisco, CA 94107
                <br />
                billing@tailadmin.co
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">Invoice</p>
            <p className="mt-1 text-lg font-semibold text-text-primary">INV-2024-0184</p>
            <div className="mt-2 space-y-1 text-xs text-text-muted">
              <p>Issued Oct 24, 2025</p>
              <p>Due Nov 07, 2025</p>
            </div>
            <div className="mt-3 sm:flex sm:justify-end">
              <StatusPill status="Paid" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-app-border bg-app-bg p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Bill from</p>
            <p className="mt-2 text-sm font-medium text-text-primary">TailAdmin Supply Co.</p>
            <p className="mt-1 text-xs leading-5 text-text-secondary">
              Accounts Receivable
              <br />
              2148 Northwind Avenue
              <br />
              San Francisco, CA 94107
              <br />
              VAT GB 123 4567 89
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-bg p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Bill to</p>
            <p className="mt-2 text-sm font-medium text-text-primary">Olivia Bennett</p>
            <p className="mt-1 text-xs leading-5 text-text-secondary">
              Northwind Traders
              <br />
              88 Harbor Street, Floor 6
              <br />
              Seattle, WA 98101
              <br />
              olivia@northwind.co
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-text-muted">
                <th className="py-3 pr-4 font-medium">Item</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="py-3 pl-4 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              <tr>
                <td className="py-4 pr-4">
                  <p className="text-sm text-text-primary">Brand identity design</p>
                  <p className="text-[11px] text-text-muted">Logo suite, type system and brand guidelines</p>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">1</td>
                <td className="px-4 py-4 text-sm text-text-secondary">$1,800.00</td>
                <td className="py-4 pl-4 text-right text-sm font-medium text-text-primary">$1,800.00</td>
              </tr>
              <tr>
                <td className="py-4 pr-4">
                  <p className="text-sm text-text-primary">Landing page development</p>
                  <p className="text-[11px] text-text-muted">Responsive build with CMS integration</p>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">1</td>
                <td className="px-4 py-4 text-sm text-text-secondary">$1,200.00</td>
                <td className="py-4 pl-4 text-right text-sm font-medium text-text-primary">$1,200.00</td>
              </tr>
              <tr>
                <td className="py-4 pr-4">
                  <p className="text-sm text-text-primary">UX audit & report</p>
                  <p className="text-[11px] text-text-muted">Heuristic review across 12 core flows</p>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">1</td>
                <td className="px-4 py-4 text-sm text-text-secondary">$420.00</td>
                <td className="py-4 pl-4 text-right text-sm font-medium text-text-primary">$420.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Payment details</p>
            <p className="mt-2 text-xs leading-5 text-text-secondary">
              Payment is due within 14 days. Please transfer to TailAdmin Supply Co., IBAN
              GB29 NWBK 6016 1331 9268 19, using INV-2024-0184 as the reference. A 2% late fee applies
              after the due date.
            </p>
          </div>

          <div className="w-full space-y-2 sm:max-w-xs">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Subtotal</span>
              <span className="text-text-primary">$3,420.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Discount</span>
              <span className="text-green-500">-$120.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Tax (8%)</span>
              <span className="text-text-primary">$264.00</span>
            </div>
            <div className="flex items-center justify-between border-t border-app-border pt-3">
              <span className="text-sm font-medium text-text-primary">Total</span>
              <span className="text-lg font-semibold text-text-primary">$3,564.00</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-app-border pt-5 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-1.5">
            <Check size={12} className="text-green-500" />
            Paid on Oct 28, 2025 via bank transfer
          </p>
          <p>Thank you for your business.</p>
        </div>
      </div>
    </DemoPage>
  );
}

interface LineItem {
  id: number;
  description: string;
  qty: number;
  price: number;
}

const currencySymbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };

export function CreateInvoicePage() {
  const [currency, setCurrency] = useState("USD");
  const [lines, setLines] = useState<LineItem[]>([
    { id: 1, description: "Brand identity design", qty: 1, price: 1800 },
    { id: 2, description: "Landing page development", qty: 1, price: 1200 },
    { id: 3, description: "UX audit & report", qty: 1, price: 420 },
  ]);

  const symbol = currencySymbols[currency] ?? "$";
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const money = (value: number) => `${symbol}${value.toFixed(2)}`;

  const updateLine = (id: number, patch: Partial<LineItem>) =>
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));

  const addLine = () =>
    setLines((current) => [...current, { id: Date.now(), description: "", qty: 1, price: 0 }]);

  const removeLine = (id: number) =>
    setLines((current) => current.filter((line) => line.id !== id));

  return (
    <DemoPage title="Create Invoice" description="Draft a new invoice, add line items and send it to your customer.">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <DemoSection title="Invoice Details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Invoice number</span>
                <input defaultValue="INV-2025-0192" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Customer</span>
                <select defaultValue="Northwind Traders" className={fieldClass}>
                  <option>Northwind Traders</option>
                  <option>Luminary Studio</option>
                  <option>Bluebird Labs</option>
                  <option>Acme Studio</option>
                  <option>Harbor & Co.</option>
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Issue date</span>
                <input type="date" defaultValue="2025-10-28" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Due date</span>
                <input type="date" defaultValue="2025-11-11" className={fieldClass} />
              </label>
              <label className="block">
                <span className={labelClass}>Currency</span>
                <select value={currency} onChange={(event) => setCurrency(event.target.value)} className={fieldClass}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Payment terms</span>
                <select defaultValue="Net 14" className={fieldClass}>
                  <option>Due on receipt</option>
                  <option>Net 7</option>
                  <option>Net 14</option>
                  <option>Net 30</option>
                </select>
              </label>
            </div>
          </DemoSection>

          <DemoSection title="Line Items" description="Add the products or services included in this invoice.">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-text-muted">
                    <th className="pb-2 pr-3 font-medium">Item</th>
                    <th className="px-3 pb-2 font-medium">Qty</th>
                    <th className="px-3 pb-2 font-medium">Price</th>
                    <th className="px-3 pb-2 text-right font-medium">Total</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border">
                  {lines.map((line) => (
                    <tr key={line.id}>
                      <td className="py-3 pr-3">
                        <input
                          value={line.description}
                          onChange={(event) => updateLine(line.id, { description: event.target.value })}
                          placeholder="Item description"
                          className={`${fieldClass} py-1.5`}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="w-20">
                          <input
                            type="number"
                            min={1}
                            value={line.qty}
                            onChange={(event) => updateLine(line.id, { qty: Number(event.target.value) || 0 })}
                            className={`${fieldClass} py-1.5`}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="w-28">
                          <input
                            type="number"
                            min={0}
                            step="0.01"
                            value={line.price}
                            onChange={(event) => updateLine(line.id, { price: Number(event.target.value) || 0 })}
                            className={`${fieldClass} py-1.5`}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right text-sm font-medium text-text-primary">
                        {money(line.qty * line.price)}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => removeLine(line.id)}
                          disabled={lines.length === 1}
                          aria-label="Remove line item"
                          className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <X size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={addLine} className={`${secondaryBtn} mt-4`}>
              <Plus size={15} />
              Add item
            </button>
          </DemoSection>

          <DemoSection title="Notes">
            <label className="block">
              <span className={labelClass}>Notes for your customer</span>
              <textarea
                rows={4}
                defaultValue="Thank you for your business. Payment is due within 14 days. Please include the invoice number as a reference with your transfer."
                className={fieldClass}
              />
            </label>
            <p className="mt-2 text-[11px] text-text-muted">These notes appear at the bottom of the invoice PDF.</p>
          </DemoSection>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg border border-app-border bg-app-surface">
            <div className="border-b border-app-border p-5">
              <h2 className="text-base font-semibold text-text-primary">Summary</h2>
              <p className="text-[11px] text-text-muted">{lines.length} line items · {currency}</p>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text-primary">{money(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Tax (8%)</span>
                <span className="text-text-primary">{money(tax)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Discount</span>
                <span className="text-text-primary">{money(0)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-app-border pt-3">
                <span className="text-sm font-medium text-text-primary">Amount due</span>
                <span className="text-xl font-semibold text-text-primary">{money(total)}</span>
              </div>

              <div className="space-y-2 pt-3">
                <button className={`${primaryBtn} w-full`}>
                  <Mail size={15} />
                  Send invoice
                </button>
                <button className={`${secondaryBtn} w-full`}>
                  <Download size={15} />
                  Save as draft
                </button>
              </div>

              <div className="rounded-lg border border-app-border bg-app-bg p-3">
                <p className="flex items-center gap-1.5 text-[11px] text-text-muted">
                  <Check size={12} className="text-green-500" />
                  Customer will receive a secure payment link.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-accent/40 bg-accent/10 p-4">
            <p className="text-xs font-medium text-accent-light">Draft saved locally</p>
            <p className="mt-1 text-[11px] leading-5 text-text-muted">
              Invoices are stored on this device until they are sent. You can edit this draft at any time.
            </p>
          </div>
        </div>
      </div>
    </DemoPage>
  );
}

interface Transaction {
  id: string;
  date: string;
  time: string;
  customer: string;
  email: string;
  method: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
}

const transactions: Transaction[] = [
  { id: "TXN-9F2A41B8", date: "Oct 28, 2025", time: "09:41 AM", customer: "Olivia Bennett", email: "olivia@northwind.co", method: "Visa •••• 4242", amount: "$1,240.00", status: "Completed" },
  { id: "TXN-7C1D90E2", date: "Oct 28, 2025", time: "08:12 AM", customer: "Marcus Chen", email: "marcus@luminary.io", method: "PayPal", amount: "$3,180.00", status: "Pending" },
  { id: "TXN-4B8E22A1", date: "Oct 27, 2025", time: "06:55 PM", customer: "Bluebird Labs", email: "billing@bluebird.dev", method: "Mastercard •••• 8812", amount: "$875.50", status: "Completed" },
  { id: "TXN-2A6F77C9", date: "Oct 27, 2025", time: "02:18 PM", customer: "Sofia Ramirez", email: "sofia@atlasdesign.co", method: "Bank transfer", amount: "$2,460.00", status: "Refunded" },
  { id: "TXN-8D3C15B4", date: "Oct 26, 2025", time: "11:02 AM", customer: "Acme Studio", email: "accounts@acmestudio.com", method: "Visa •••• 4242", amount: "$640.00", status: "Completed" },
  { id: "TXN-1E9B63F7", date: "Oct 26, 2025", time: "09:44 AM", customer: "Daniel Okafor", email: "daniel@vertexhq.io", method: "PayPal", amount: "$1,920.00", status: "Failed" },
  { id: "TXN-5F7A28D3", date: "Oct 25, 2025", time: "04:37 PM", customer: "Harbor & Co.", email: "finance@harborco.com", method: "Mastercard •••• 8812", amount: "$4,580.00", status: "Completed" },
];

const methodOptions = ["All methods", "Visa", "Mastercard", "PayPal", "Bank transfer"];
const statusOptions = ["All statuses", "Completed", "Pending", "Failed", "Refunded"];

export function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All methods");
  const [status, setStatus] = useState("All statuses");

  const filtered = transactions.filter((transaction) => {
    const matchesSearch = `${transaction.id} ${transaction.customer}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesMethod = method === "All methods" || transaction.method.startsWith(method);
    const matchesStatus = status === "All statuses" || transaction.status === status;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  return (
    <DemoPage title="Transactions" description="Monitor payments, payouts and refunds across every channel.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total revenue" value="$92,480" change="+14.2%" icon={DollarSign} tone="bg-accent/10 text-accent-light" />
        <StatsCard label="Successful payments" value="1,204" change="+6.8%" icon={Check} tone="bg-green-500/10 text-green-500" />
        <StatsCard label="Pending" value="36" icon={CreditCard} tone="bg-yellow-500/10 text-yellow-500" />
        <StatsCard label="Refunded" value="$1,840" icon={ArrowLeft} tone="bg-blue-500/10 text-blue-500" />
      </div>

      <div className="rounded-lg border border-app-border bg-app-surface">
        <div className="flex flex-col gap-3 border-b border-app-border p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search transaction or customer..."
                className={`${fieldClass} pl-9`}
              />
            </div>
            <div className="w-full sm:w-40">
              <select value={method} onChange={(event) => setMethod(event.target.value)} className={fieldClass}>
                {methodOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-40">
              <select value={status} onChange={(event) => setStatus(event.target.value)} className={fieldClass}>
                {statusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <button className={secondaryBtn}>
            <Download size={15} />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left">
            <thead>
              <tr className="border-b border-app-border text-[11px] uppercase tracking-wide text-text-muted">
                <th className="px-4 py-3 font-medium">Transaction ID</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {filtered.map((transaction) => (
                <tr key={transaction.id} className="transition-colors hover:bg-app-hover/50">
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{transaction.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-text-secondary">{transaction.date}</p>
                    <p className="text-[11px] text-text-muted">{transaction.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-text-primary">{transaction.customer}</p>
                    <p className="text-[11px] text-text-muted">{transaction.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
                      <CreditCard size={13} className="text-text-muted" />
                      {transaction.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{transaction.amount}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={transaction.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className={iconBtn} aria-label={`View ${transaction.id}`}>
                        <Eye size={15} />
                      </button>
                      <button className={iconBtn} aria-label={`Download receipt for ${transaction.id}`}>
                        <Download size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-text-secondary">No transactions found.</p>
            <p className="mt-1 text-xs text-text-muted">Try clearing the search or selecting another status.</p>
          </div>
        ) : (
          <Pagination total={1284} />
        )}
      </div>
    </DemoPage>
  );
}

const transactionTimeline = [
  { title: "Payment created", detail: "Checkout session completed by Olivia Bennett", time: "Oct 26, 2025 · 09:41 AM" },
  { title: "Authorized", detail: "Visa •••• 4242 approved by the issuing bank", time: "Oct 26, 2025 · 09:41 AM" },
  { title: "Captured", detail: "Funds captured and queued for settlement", time: "Oct 26, 2025 · 09:42 AM" },
  { title: "Settled", detail: "Funds deposited to your business balance", time: "Oct 28, 2025 · 02:15 AM" },
];

export function SingleTransactionPage() {
  const [refundRequested, setRefundRequested] = useState(false);

  return (
    <DemoPage title="Transaction Details" description="Inspect the payment lifecycle and issue refunds when needed.">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className={`${secondaryBtn} w-fit`}>
          <ArrowLeft size={15} />
          Back to transactions
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setRefundRequested(true)}
            disabled={refundRequested}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowLeft size={15} />
            {refundRequested ? "Refund requested" : "Refund payment"}
          </button>
          <button className={secondaryBtn}>
            <Download size={15} />
            Download receipt
          </button>
        </div>
      </div>

      {refundRequested && (
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <p className="text-sm font-medium text-yellow-500">Refund submitted for review</p>
          <p className="mt-1 text-xs text-text-secondary">
            A refund of $1,240.00 has been requested. Funds typically return to the original payment
            method within 5-10 business days.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-lg border border-app-border bg-app-surface p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/40 to-purple-500/30">
                  <CreditCard size={22} className="text-text-primary" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-text-muted">Transaction</p>
                  <p className="text-sm font-semibold text-text-primary">TXN-9F2A41B8</p>
                </div>
              </div>
              <StatusPill status="Completed" />
            </div>

            <div className="mt-6 flex items-end justify-between gap-4 border-b border-app-border pb-5">
              <div>
                <p className="text-xs text-text-muted">Amount received</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-text-primary">$1,240.00</p>
              </div>
              <p className="text-xs text-text-muted">USD · Gross</p>
            </div>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-text-muted">Date & time</dt>
                <dd className="mt-1 text-sm text-text-primary">Oct 26, 2025 · 09:41 AM</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-text-muted">Payment method</dt>
                <dd className="mt-1 text-sm text-text-primary">Visa •••• 4242</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-text-muted">Customer</dt>
                <dd className="mt-1 text-sm text-text-primary">Olivia Bennett</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-text-muted">Reference</dt>
                <dd className="mt-1 text-sm text-text-primary">ORD-88214</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-app-border bg-app-surface p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-text-primary">Payment Timeline</h2>
              <span className="text-[11px] text-text-muted">4 events</span>
            </div>
            <div>
              {transactionTimeline.map((event, index) => {
                const isCurrent = index === transactionTimeline.length - 1;
                return (
                  <div key={event.title} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
                          isCurrent ? "bg-accent ring-4 ring-accent/15" : "bg-green-500"
                        }`}
                      >
                        {!isCurrent && <Check size={8} className="text-white" />}
                      </span>
                      {index < transactionTimeline.length - 1 && <span className="my-1 w-px flex-1 bg-app-border" />}
                    </div>
                    <div className={`${index === transactionTimeline.length - 1 ? "" : "pb-6"}`}>
                      <p className="text-sm font-medium text-text-primary">{event.title}</p>
                      <p className="mt-0.5 text-xs text-text-muted">{event.detail}</p>
                      <p className="mt-1 text-[11px] text-text-dim">{event.time}</p>
                    </div>
                  </div>
                );
              })}
              {refundRequested && (
                <div className="flex gap-3">
                  <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Refund requested</p>
                    <p className="mt-0.5 text-xs text-text-muted">$1,240.00 pending review by the payments team</p>
                    <p className="mt-1 text-[11px] text-text-dim">Just now</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-app-border bg-app-surface p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-primary">Payment Method</h2>
              <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent-light">VISA</span>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-app-border bg-app-bg p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-app-hover">
                <CreditCard size={16} className="text-text-secondary" />
              </div>
              <div>
                <p className="text-sm text-text-primary">Visa ending in 4242</p>
                <p className="text-[11px] text-text-muted">Expires 09 / 28</p>
              </div>
            </div>
            <dl className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <dt className="text-text-muted">Cardholder</dt>
                <dd className="text-text-primary">Olivia Bennett</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-text-muted">Network</dt>
                <dd className="text-text-primary">Visa</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-text-muted">Risk score</dt>
                <dd className="inline-flex items-center gap-1 text-green-500">
                  <Check size={12} />
                  Low
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-app-border bg-app-surface p-5">
            <h2 className="text-sm font-semibold text-text-primary">Customer</h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent-light">
                OB
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-text-primary">Olivia Bennett</p>
                <p className="truncate text-[11px] text-text-muted">olivia@northwind.co</p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs text-text-secondary">
              <p>Northwind Traders</p>
              <p>88 Harbor Street, Floor 6</p>
              <p>Seattle, WA 98101</p>
              <p>United States</p>
              <p className="pt-2 text-text-muted">+1 (555) 014-2890</p>
            </div>
          </div>

          <div className="rounded-lg border border-app-border bg-app-surface p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Payout</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-text-secondary">Net after fees</span>
              <span className="text-sm font-semibold text-text-primary">$1,203.88</span>
            </div>
            <p className="mt-1 text-[11px] text-text-muted">Processing fee $36.12 · Settled Oct 28, 2025</p>
          </div>
        </div>
      </div>
    </DemoPage>
  );
}
