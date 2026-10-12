import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().trim().min(2, "Ürün adı en az 2 karakter olmalıdır.").max(120),
  slug: z.string().trim().max(120).optional(),
  price: z.number().int().positive("Fiyat pozitif bir tam sayı olmalıdır.").max(1000000),
  originalPrice: z.number().int().positive().max(1000000).optional(),
  category: z.string().trim().min(2).max(50),
  categorySlug: z.string().trim().min(2).max(50).optional(),
  badge: z.string().trim().max(30).optional(),
  description: z.string().trim().min(5).max(2000),
  fabric: z.string().trim().min(2).max(100),
  modelInfo: z.string().trim().min(2).max(100),
  inStock: z.boolean(),
  images: z.array(z.string().url("Geçerli bir görsel bağlantısı olmalıdır.")).min(1).max(10),
  sizes: z.array(z.string().trim().min(1).max(20)).min(1),
  colors: z.array(z.string().trim().min(1).max(30)).optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const CreateCategorySchema = z.object({
  name: z.string().trim().min(2).max(60),
  slug: z.string().trim().max(60).optional(),
  description: z.string().trim().min(2).max(500),
});

export const CreateOrderSchema = z.object({
  customerName: z.string().trim().min(3).max(80),
  phone: z.string().trim().min(10).max(20),
  email: z.string().trim().email("Geçerli bir e-posta adresi giriniz.").optional().or(z.literal("")),
  city: z.string().trim().min(2).max(50),
  address: z.string().trim().min(10).max(300),
  paymentMethod: z.enum(["kapida_nakit", "kapida_kart", "havale"]),
  items: z.array(
    z.object({
      productId: z.string().trim().min(1),
      quantity: z.number().int().positive().max(10),
      size: z.string().trim().min(1).max(20),
    })
  ).min(1, "Sipariş en az bir ürün içermelidir."),
});

export const UpdateOrderStatusSchema = z.object({
  orderId: z.string().trim().min(1),
  status: z.enum(["yeni", "hazirlaniyor", "kargoda", "teslim_edildi", "iptal"]),
  trackingNumber: z.string().trim().max(50).optional(),
});
