import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  category: text("category").notNull(),
  categorySlug: text("category_slug").notNull(),
  badge: text("badge"),
  description: text("description").notNull(),
  fabric: text("fabric").notNull(),
  modelInfo: text("model_info").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  images: text("images").notNull(),
  sizes: text("sizes").notNull(),
  colors: text("colors"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const variants = pgTable("variants", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  size: text("size").notNull(),
  color: text("color"),
  sku: text("sku"),
  stockQuantity: integer("stock_quantity").notNull().default(0),
  priceAdjustment: integer("price_adjustment").default(0),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  totalAmount: integer("total_amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").notNull().default("yeni"),
  trackingNumber: text("tracking_number"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull(),
  variantId: text("variant_id"),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  size: text("size").notNull(),
  image: text("image").notNull(),
});

export const coupons = pgTable("coupons", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  discountPercent: integer("discount_percent").notNull(),
  minOrderAmount: integer("min_order_amount").notNull().default(0),
  maxUses: integer("max_uses"),
  usedCount: integer("used_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  expiresAt: timestamp("expires_at"),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
