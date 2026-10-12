import { db, pool } from "@/src/db";
import {
  products,
  variants,
  orders,
  orderItems,
  categories,
  coupons,
  settings,
} from "@/src/db/schema";
import { eq, desc, inArray, sql } from "drizzle-orm";
import { Product, ALL_PRODUCTS } from "./products";

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  totalAmount: number;
  paymentMethod: "kapida_nakit" | "kapida_kart" | "havale";
  status: "yeni" | "hazirlaniyor" | "kargoda" | "teslim_edildi" | "iptal";
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
}

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  paymentMethod: "kapida_nakit" | "kapida_kart" | "havale";
  status?: "yeni" | "hazirlaniyor" | "kargoda" | "teslim_edildi" | "iptal";
  items: { productId: string; quantity: number; size: string; variantId?: string }[];
  couponCode?: string;
}

function mapDbProduct(p: typeof products.$inferSelect): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    category: p.category,
    categorySlug: p.categorySlug,
    badge: p.badge ?? undefined,
    description: p.description,
    fabric: p.fabric,
    modelInfo: p.modelInfo,
    inStock: Boolean(p.inStock),
    images: JSON.parse(p.images) as [string, string, ...string[]],
    sizes: JSON.parse(p.sizes) as string[],
    colors: p.colors ? (JSON.parse(p.colors) as string[]) : undefined,
  };
}

export async function getAdminProducts(): Promise<Product[]> {
  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));
    if (rows.length === 0) return [...ALL_PRODUCTS];
    return rows.map(mapDbProduct);
  } catch {
    return [...ALL_PRODUCTS];
  }
}

export async function getAdminProductById(id: string): Promise<Product | null> {
  try {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
    if (rows.length > 0) return mapDbProduct(rows[0]);
    const fallback = ALL_PRODUCTS.find((p) => p.id === id);
    return fallback ? { ...fallback } : null;
  } catch {
    const fallback = ALL_PRODUCTS.find((p) => p.id === id);
    return fallback ? { ...fallback } : null;
  }
}

export async function createAdminProduct(data: Omit<Product, "id">): Promise<Product> {
  const id = `p-${Date.now()}`;

  await db.insert(products).values({
    id,
    name: data.name,
    slug: data.slug,
    price: data.price,
    originalPrice: data.originalPrice ?? null,
    category: data.category,
    categorySlug: data.categorySlug,
    badge: data.badge ?? null,
    description: data.description,
    fabric: data.fabric,
    modelInfo: data.modelInfo,
    inStock: data.inStock,
    images: JSON.stringify(data.images),
    sizes: JSON.stringify(data.sizes),
    colors: data.colors ? JSON.stringify(data.colors) : null,
  });

  const created = await getAdminProductById(id);
  if (!created) throw new Error("Ürün oluşturulamadı.");
  return created;
}

export async function updateAdminProduct(
  id: string,
  data: Partial<Product>
): Promise<Product | null> {
  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.slug !== undefined) updates.slug = data.slug;
  if (data.price !== undefined) updates.price = data.price;
  if (data.originalPrice !== undefined) updates.originalPrice = data.originalPrice ?? null;
  if (data.category !== undefined) updates.category = data.category;
  if (data.categorySlug !== undefined) updates.categorySlug = data.categorySlug;
  if (data.badge !== undefined) updates.badge = data.badge ?? null;
  if (data.description !== undefined) updates.description = data.description;
  if (data.fabric !== undefined) updates.fabric = data.fabric;
  if (data.modelInfo !== undefined) updates.modelInfo = data.modelInfo;
  if (data.inStock !== undefined) updates.inStock = data.inStock;
  if (data.images !== undefined) updates.images = JSON.stringify(data.images);
  if (data.sizes !== undefined) updates.sizes = JSON.stringify(data.sizes);
  if (data.colors !== undefined) updates.colors = data.colors ? JSON.stringify(data.colors) : null;

  await db.update(products).set(updates).where(eq(products.id, id));
  return getAdminProductById(id);
}

export async function deleteAdminProduct(id: string): Promise<boolean> {
  const res = await db.delete(products).where(eq(products.id, id));
  return true;
}

export async function getAdminOrders(): Promise<Order[]> {
  try {
    const orderRows = await db.select().from(orders).orderBy(desc(orders.createdAt));
    if (orderRows.length === 0) return [];

    const itemRows = await db.select().from(orderItems);

    return orderRows.map((o) => {
      const oItems = itemRows
        .filter((i) => i.orderId === o.id)
        .map((i) => ({
          productId: i.productId,
          variantId: i.variantId ?? undefined,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          image: i.image,
        }));

      return {
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        phone: o.phone,
        email: o.email,
        city: o.city,
        address: o.address,
        totalAmount: o.totalAmount,
        paymentMethod: o.paymentMethod as Order["paymentMethod"],
        status: o.status as Order["status"],
        trackingNumber: o.trackingNumber ?? undefined,
        createdAt: o.createdAt.toISOString(),
        items: oItems,
      };
    });
  } catch {
    return [];
  }
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"],
  trackingNumber?: string
): Promise<void> {
  const updates: Record<string, unknown> = { status };
  if (trackingNumber !== undefined) {
    updates.trackingNumber = trackingNumber || null;
  }
  await db.update(orders).set(updates).where(eq(orders.id, id));
}

export async function createOrder(data: CreateOrderInput): Promise<Order> {
  return await db.transaction(async (tx) => {
    const productIds = data.items.map((i) => i.productId);
    const dbProds = await tx.select().from(products).where(inArray(products.id, productIds));

    let computedTotal = 0;
    const finalItems: OrderItem[] = [];

    for (const item of data.items) {
      let prod = dbProds.find((p) => p.id === item.productId);
      if (!prod) {
        const memoryProd = ALL_PRODUCTS.find((p) => p.id === item.productId);
        if (!memoryProd) {
          throw new Error("Sipariş edilmek istenen ürün bulunamadı.");
        }
        prod = {
          id: memoryProd.id,
          name: memoryProd.name,
          slug: memoryProd.slug,
          price: memoryProd.price,
          originalPrice: memoryProd.originalPrice ?? null,
          category: memoryProd.category,
          categorySlug: memoryProd.categorySlug,
          badge: memoryProd.badge ?? null,
          description: memoryProd.description,
          fabric: memoryProd.fabric,
          modelInfo: memoryProd.modelInfo,
          inStock: memoryProd.inStock,
          images: JSON.stringify(memoryProd.images),
          sizes: JSON.stringify(memoryProd.sizes),
          colors: memoryProd.colors ? JSON.stringify(memoryProd.colors) : null,
          createdAt: new Date(),
        };
      }

      if (!prod.inStock) {
        throw new Error(`"${prod.name}" ürünü tükenmiştir.`);
      }

      const itemTotal = prod.price * item.quantity;
      computedTotal += itemTotal;

      const imgList = JSON.parse(prod.images) as string[];
      finalItems.push({
        productId: prod.id,
        variantId: item.variantId,
        name: prod.name,
        price: prod.price,
        quantity: item.quantity,
        size: item.size,
        image: imgList[0] || "",
      });
    }

    let discount = 0;
    if (data.couponCode) {
      const couponRows = await tx
        .select()
        .from(coupons)
        .where(eq(coupons.code, data.couponCode.toUpperCase()))
        .limit(1);

      if (couponRows.length > 0 && couponRows[0].isActive) {
        const cp = couponRows[0];
        if (computedTotal >= cp.minOrderAmount) {
          discount = Math.round((computedTotal * cp.discountPercent) / 100);
          await tx
            .update(coupons)
            .set({ usedCount: cp.usedCount + 1 })
            .where(eq(coupons.id, cp.id));
        }
      }
    }

    const discountedSubtotal = Math.max(0, computedTotal - discount);
    const shippingFee = discountedSubtotal >= 1500 ? 0 : 59;
    const finalTotalWithShipping = discountedSubtotal + shippingFee;

    const orderId = `ord-${Date.now()}`;
    const orderNo = `#AS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    await tx.insert(orders).values({
      id: orderId,
      orderNumber: orderNo,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || "",
      city: data.city,
      address: data.address,
      totalAmount: finalTotalWithShipping,
      paymentMethod: data.paymentMethod,
      status: "yeni",
      trackingNumber: null,
    });

    for (const oi of finalItems) {
      await tx.insert(orderItems).values({
        id: `oi-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        orderId,
        productId: oi.productId,
        variantId: oi.variantId || null,
        name: oi.name,
        price: oi.price,
        quantity: oi.quantity,
        size: oi.size,
        image: oi.image,
      });
    }

    return {
      id: orderId,
      orderNumber: orderNo,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || "",
      city: data.city,
      address: data.address,
      totalAmount: finalTotalWithShipping,
      paymentMethod: data.paymentMethod,
      status: "yeni",
      createdAt: new Date().toISOString(),
      items: finalItems,
    };
  });
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  try {
    const catRows = await db.select().from(categories);
    const prodRows = await db.select().from(products);

    if (catRows.length === 0) {
      return [
        { id: "cat-1", name: "Yeni Gelenler", slug: "yeni-gelenler", description: "2026 İlkbahar & Yaz yeni sezon parçaları", itemCount: 4 },
        { id: "cat-2", name: "Elbiseler", slug: "elbiseler", description: "Akışkan saten ve keten elbise modelleri", itemCount: 2 },
        { id: "cat-3", name: "Dış Giyim", slug: "dis-giyim", description: "Kruvaze blazer ceketler ve dökümlü trençkotlar", itemCount: 2 },
        { id: "cat-4", name: "Takımlar", slug: "takimlar", description: "Doğal keten ikili gömlek ve pantolon kombinleri", itemCount: 2 },
        { id: "cat-5", name: "Alt Giyim", slug: "alt-giyim", description: "Palazzo geniş paça pantolonlar ve etekler", itemCount: 2 },
      ];
    }

    return catRows.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      itemCount: prodRows.filter((p) => p.categorySlug === c.slug).length,
    }));
  } catch {
    return [];
  }
}

export async function createAdminCategory(data: { name: string; slug: string; description: string }): Promise<AdminCategory> {
  const id = `cat-${Date.now()}`;
  await db.insert(categories).values({
    id,
    name: data.name,
    slug: data.slug,
    description: data.description,
  });

  return {
    id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    itemCount: 0,
  };
}

export async function deleteAdminCategory(id: string): Promise<boolean> {
  await db.delete(categories).where(eq(categories.id, id));
  return true;
}

export async function getAdminStats() {
  const prods = await getAdminProducts();
  const allOrders = await getAdminOrders();

  const totalRevenue = allOrders
    .filter((o) => o.status !== "iptal")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingOrders = allOrders.filter((o) => o.status === "yeni" || o.status === "hazirlaniyor").length;
  const inStockCount = prods.filter((p) => p.inStock).length;
  const outOfStockCount = prods.filter((p) => !p.inStock).length;

  return {
    totalRevenue,
    totalOrders: allOrders.length,
    pendingOrders,
    totalProducts: prods.length,
    inStockCount,
    outOfStockCount,
  };
}

export interface CouponItem {
  id: string;
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
}

export async function getAdminCoupons(): Promise<CouponItem[]> {
  try {
    const rows = await db.select().from(coupons).orderBy(desc(coupons.isActive));
    return rows.map((c) => ({
      id: c.id,
      code: c.code,
      discountPercent: c.discountPercent,
      minOrderAmount: c.minOrderAmount,
      maxUses: c.maxUses ?? undefined,
      usedCount: c.usedCount,
      isActive: c.isActive,
    }));
  } catch {
    return [];
  }
}

export async function createAdminCoupon(data: {
  code: string;
  discountPercent: number;
  minOrderAmount: number;
}): Promise<CouponItem> {
  const id = `cp-${Date.now()}`;
  await db.insert(coupons).values({
    id,
    code: data.code.toUpperCase().trim(),
    discountPercent: data.discountPercent,
    minOrderAmount: data.minOrderAmount,
    usedCount: 0,
    isActive: true,
  });

  return {
    id,
    code: data.code.toUpperCase().trim(),
    discountPercent: data.discountPercent,
    minOrderAmount: data.minOrderAmount,
    usedCount: 0,
    isActive: true,
  };
}

export async function toggleAdminCoupon(id: string, isActive: boolean): Promise<void> {
  await db.update(coupons).set({ isActive }).where(eq(coupons.id, id));
}

export async function deleteAdminCoupon(id: string): Promise<void> {
  await db.delete(coupons).where(eq(coupons.id, id));
}

export interface CustomerSummary {
  phone: string;
  customerName: string;
  email: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  orders: Order[];
}

export async function getAdminCustomers(): Promise<CustomerSummary[]> {
  const allOrders = await getAdminOrders();
  const customerMap = new Map<string, CustomerSummary>();

  for (const o of allOrders) {
    const key = o.phone.replace(/[^0-9]/g, "");
    const existing = customerMap.get(key);

    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += o.totalAmount;
      existing.orders.push(o);
      if (new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
        existing.lastOrderDate = o.createdAt;
      }
    } else {
      customerMap.set(key, {
        phone: o.phone,
        customerName: o.customerName,
        email: o.email,
        city: o.city,
        totalOrders: 1,
        totalSpent: o.totalAmount,
        lastOrderDate: o.createdAt,
        orders: [o],
      });
    }
  }

  return Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);
}

export interface StoreSettings {
  storeName: string;
  supportPhone: string;
  announcementActive: boolean;
  announcementText: string;
  paytrMerchantId: string;
  paytrMerchantKey: string;
  paytrMerchantSalt: string;
  paytrTestMode: boolean;
  iyzicoApiKey: string;
  iyzicoSecretKey: string;
  iyzicoTestMode: boolean;
  shippingCompany: string;
  freeShippingThreshold: number;
  flatShippingFee: number;
  parasutClientId: string;
  parasutClientSecret: string;
  parasutAutoInvoice: boolean;
  paymentCardActive: boolean;
  paymentCodActive: boolean;
  paymentTransferActive: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Atelier Silk",
  supportPhone: "0551 928 35 98",
  announcementActive: true,
  announcementText: "Tüm Türkiye'ye 1.500 TL Üzeri Ücretsiz VIP Kargo & Kapıda Şeffaf Kontrol",
  paytrMerchantId: "",
  paytrMerchantKey: "",
  paytrMerchantSalt: "",
  paytrTestMode: true,
  iyzicoApiKey: "",
  iyzicoSecretKey: "",
  iyzicoTestMode: true,
  shippingCompany: "Yurtiçi Kargo",
  freeShippingThreshold: 1500,
  flatShippingFee: 59,
  parasutClientId: "",
  parasutClientSecret: "",
  parasutAutoInvoice: false,
  paymentCardActive: true,
  paymentCodActive: true,
  paymentTransferActive: true,
};

let memorySettings: StoreSettings = { ...DEFAULT_SETTINGS };

export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const rows = await db.select().from(settings);
    if (rows.length === 0) return { ...memorySettings };

    const map = new Map(rows.map((r) => [r.key, r.value]));
    const loaded: StoreSettings = {
      storeName: map.get("storeName") || DEFAULT_SETTINGS.storeName,
      supportPhone: map.get("supportPhone") || DEFAULT_SETTINGS.supportPhone,
      announcementActive: map.get("announcementActive") === "true",
      announcementText: map.get("announcementText") || DEFAULT_SETTINGS.announcementText,
      paytrMerchantId: map.get("paytrMerchantId") || "",
      paytrMerchantKey: map.get("paytrMerchantKey") || "",
      paytrMerchantSalt: map.get("paytrMerchantSalt") || "",
      paytrTestMode: map.get("paytrTestMode") !== "false",
      iyzicoApiKey: map.get("iyzicoApiKey") || "",
      iyzicoSecretKey: map.get("iyzicoSecretKey") || "",
      iyzicoTestMode: map.get("iyzicoTestMode") !== "false",
      shippingCompany: map.get("shippingCompany") || DEFAULT_SETTINGS.shippingCompany,
      freeShippingThreshold: Number(map.get("freeShippingThreshold")) || DEFAULT_SETTINGS.freeShippingThreshold,
      flatShippingFee: Number(map.get("flatShippingFee")) || DEFAULT_SETTINGS.flatShippingFee,
      parasutClientId: map.get("parasutClientId") || "",
      parasutClientSecret: map.get("parasutClientSecret") || "",
      parasutAutoInvoice: map.get("parasutAutoInvoice") === "true",
      paymentCardActive: map.get("paymentCardActive") !== "false",
      paymentCodActive: map.get("paymentCodActive") !== "false",
      paymentTransferActive: map.get("paymentTransferActive") !== "false",
    };
    memorySettings = loaded;
    return loaded;
  } catch {
    return { ...memorySettings };
  }
}

export async function updateStoreSettings(newSettings: Partial<StoreSettings>): Promise<void> {
  memorySettings = { ...memorySettings, ...newSettings };

  try {
    for (const [k, v] of Object.entries(newSettings)) {
      if (v !== undefined) {
        const valStr = String(v);
        const existing = await db.select().from(settings).where(eq(settings.key, k)).limit(1);
        if (existing.length > 0) {
          await db.update(settings).set({ value: valStr }).where(eq(settings.key, k));
        } else {
          await db.insert(settings).values({ key: k, value: valStr });
        }
      }
    }
  } catch {
  }
}
