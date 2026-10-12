"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  updateOrderStatus,
  createAdminCategory,
  deleteAdminCategory,
  createOrder,
  createAdminCoupon,
  toggleAdminCoupon,
  deleteAdminCoupon,
  updateStoreSettings,
  Order,
} from "@/lib/admin-store";
import {
  setAdminSession,
  clearAdminSession,
  isAdminAuthenticated,
  ADMIN_CREDENTIALS,
} from "@/lib/admin-auth";
import {
  CreateProductSchema,
  UpdateProductSchema,
  CreateCategorySchema,
  UpdateOrderStatusSchema,
  CreateOrderSchema,
} from "@/lib/validations";

async function assertAdmin() {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    throw new Error("UNAUTHORIZED");
  }
}

export async function loginAdminAction(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    await setAdminSession();
    redirect("/admin");
  }

  return { error: "Geçersiz kullanıcı adı veya şifre!" };
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function addProductAction(formData: FormData) {
  await assertAdmin();

  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || undefined;
  const price = Number(formData.get("price")) || 0;
  const originalPriceStr = formData.get("originalPrice");
  const originalPrice = originalPriceStr ? Number(originalPriceStr) : undefined;
  const category = String(formData.get("category") || "Elbiseler");
  const categorySlug = String(formData.get("categorySlug") || "elbiseler");
  const badge = String(formData.get("badge") || "").trim() || undefined;
  const description = String(formData.get("description") || "").trim();
  const fabric = String(formData.get("fabric") || "").trim();
  const modelInfo = String(formData.get("modelInfo") || "").trim();
  const inStock = formData.get("inStock") === "on" || formData.get("inStock") === "true";

  const img1 = String(formData.get("image1") || "").trim();
  const img2 = String(formData.get("image2") || "").trim();
  const img3 = String(formData.get("image3") || "").trim();

  const images = [
    img1 || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
    img2 || "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&auto=format&fit=crop&q=80",
  ];
  if (img3) images.push(img3);

  const sizesStr = String(formData.get("sizes") || "36, 38, 40");
  const sizes = sizesStr.split(",").map((s) => s.trim()).filter(Boolean);

  const parsed = CreateProductSchema.parse({
    name,
    slug,
    price,
    originalPrice,
    category,
    categorySlug,
    badge,
    description,
    fabric,
    modelInfo,
    inStock,
    images,
    sizes,
  });

  await createAdminProduct({
    name: parsed.name,
    slug: parsed.slug || parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    price: parsed.price,
    originalPrice: parsed.originalPrice,
    category: parsed.category,
    categorySlug: parsed.categorySlug || "elbiseler",
    badge: parsed.badge,
    description: parsed.description,
    fabric: parsed.fabric,
    modelInfo: parsed.modelInfo,
    inStock: parsed.inStock,
    images: parsed.images as [string, string, ...string[]],
    sizes: parsed.sizes,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/urunler");
  revalidatePath("/");
  return { success: true };
}

export async function updateProductAction(id: string, formData: FormData) {
  await assertAdmin();

  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || undefined;
  const price = Number(formData.get("price")) || 0;
  const originalPriceStr = formData.get("originalPrice");
  const originalPrice = originalPriceStr ? Number(originalPriceStr) : undefined;
  const category = String(formData.get("category") || "Elbiseler");
  const categorySlug = String(formData.get("categorySlug") || "elbiseler");
  const badge = String(formData.get("badge") || "").trim() || undefined;
  const description = String(formData.get("description") || "").trim();
  const fabric = String(formData.get("fabric") || "").trim();
  const modelInfo = String(formData.get("modelInfo") || "").trim();
  const inStock = formData.get("inStock") === "on" || formData.get("inStock") === "true";

  const img1 = String(formData.get("image1") || "").trim();
  const img2 = String(formData.get("image2") || "").trim();
  const img3 = String(formData.get("image3") || "").trim();

  const images = [
    img1 || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
    img2 || "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&auto=format&fit=crop&q=80",
  ];
  if (img3) images.push(img3);

  const sizesStr = String(formData.get("sizes") || "36, 38, 40");
  const sizes = sizesStr.split(",").map((s) => s.trim()).filter(Boolean);

  const parsed = UpdateProductSchema.parse({
    name,
    slug,
    price,
    originalPrice,
    category,
    categorySlug,
    badge,
    description,
    fabric,
    modelInfo,
    inStock,
    images,
    sizes,
  });

  await updateAdminProduct(id, {
    ...(parsed.name ? { name: parsed.name } : {}),
    ...(parsed.slug ? { slug: parsed.slug } : {}),
    ...(parsed.price !== undefined ? { price: parsed.price } : {}),
    originalPrice: parsed.originalPrice,
    ...(parsed.category ? { category: parsed.category } : {}),
    ...(parsed.categorySlug ? { categorySlug: parsed.categorySlug } : {}),
    badge: parsed.badge,
    ...(parsed.description ? { description: parsed.description } : {}),
    ...(parsed.fabric ? { fabric: parsed.fabric } : {}),
    ...(parsed.modelInfo ? { modelInfo: parsed.modelInfo } : {}),
    ...(parsed.inStock !== undefined ? { inStock: parsed.inStock } : {}),
    ...(parsed.images ? { images: parsed.images as [string, string, ...string[]] } : {}),
    ...(parsed.sizes ? { sizes: parsed.sizes } : {}),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/urunler");
  revalidatePath(`/admin/urunler/${id}`);
  revalidatePath("/");
  return { success: true };
}

export async function updateProductStockAction(id: string, inStock: boolean) {
  await assertAdmin();

  await updateAdminProduct(id, { inStock });
  revalidatePath("/admin");
  revalidatePath("/admin/urunler");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProductAction(id: string) {
  await assertAdmin();

  await deleteAdminProduct(id);
  revalidatePath("/admin");
  revalidatePath("/admin/urunler");
  revalidatePath("/");
  return { success: true };
}

export async function updateOrderStatusAction(
  orderId: string,
  status: Order["status"],
  trackingNumber?: string
) {
  await assertAdmin();

  const parsed = UpdateOrderStatusSchema.parse({
    orderId,
    status,
    trackingNumber: trackingNumber || undefined,
  });

  await updateOrderStatus(parsed.orderId, parsed.status, parsed.trackingNumber);
  revalidatePath("/admin");
  revalidatePath("/admin/siparisler");
  return { success: true };
}

export async function addCategoryAction(formData: FormData) {
  await assertAdmin();

  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || undefined;
  const description = String(formData.get("description") || "").trim();

  const parsed = CreateCategorySchema.parse({ name, slug, description });

  await createAdminCategory({
    name: parsed.name,
    slug: parsed.slug || parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: parsed.description,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/kategoriler");
  return { success: true };
}

export async function deleteCategoryAction(id: string) {
  await assertAdmin();

  await deleteAdminCategory(id);
  revalidatePath("/admin");
  revalidatePath("/admin/kategoriler");
  return { success: true };
}

export async function placeCustomerOrderAction(rawInput: unknown) {
  try {
    const parsed = CreateOrderSchema.parse(rawInput);

    const created = await createOrder({
      customerName: parsed.customerName,
      phone: parsed.phone,
      email: parsed.email || "",
      city: parsed.city,
      address: parsed.address,
      paymentMethod: parsed.paymentMethod,
      status: "yeni",
      items: parsed.items,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/siparisler");

    return {
      success: true,
      orderNumber: created.orderNumber,
      orderId: created.id,
      totalAmount: created.totalAmount,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Sipariş işlenirken bir sorun oluştu. Lütfen bilgilerinizi kontrol edin.",
    };
  }
}

export async function trackOrderAction(query: string) {
  try {
    const cleanQuery = query.trim();
    if (!cleanQuery) return { success: false, error: "Lütfen bir sipariş numarası veya telefon giriniz." };

    const allOrders = await (await import("@/lib/admin-store")).getAdminOrders();
    const cleanPhone = cleanQuery.replace(/[^0-9]/g, "");

    const found = allOrders.find(
      (o) =>
        o.orderNumber.toLowerCase() === cleanQuery.toLowerCase() ||
        (cleanPhone.length >= 7 && o.phone.replace(/[^0-9]/g, "").includes(cleanPhone)) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === cleanQuery.toLowerCase())
    );

    if (!found) {
      return { success: false, error: "Girdiğiniz bilgilere ait sipariş bulunamadı." };
    }

    return {
      success: true,
      order: {
        orderNumber: found.orderNumber,
        customerName: found.customerName,
        status: found.status,
        trackingNumber: found.trackingNumber,
        createdAt: found.createdAt,
        totalAmount: found.totalAmount,
        itemsCount: found.items.length,
      },
    };
  } catch {
    return { success: false, error: "Sipariş sorgulanamadı." };
  }
}

export async function addCouponAction(formData: FormData) {
  await assertAdmin();

  const code = String(formData.get("code") || "").trim().toUpperCase();
  const discountPercent = Number(formData.get("discountPercent")) || 10;
  const minOrderAmount = Number(formData.get("minOrderAmount")) || 0;

  if (!code || discountPercent <= 0 || discountPercent > 100) {
    throw new Error("Geçersiz kupon bilgisi!");
  }

  await createAdminCoupon({ code, discountPercent, minOrderAmount });
  revalidatePath("/admin/kuponlar");
  return { success: true };
}

export async function toggleCouponAction(id: string, currentStatus: boolean) {
  await assertAdmin();

  await toggleAdminCoupon(id, !currentStatus);
  revalidatePath("/admin/kuponlar");
  return { success: true };
}

export async function deleteCouponAction(id: string) {
  await assertAdmin();

  await deleteAdminCoupon(id);
  revalidatePath("/admin/kuponlar");
  return { success: true };
}

export async function updateSettingsAction(formData: FormData) {
  await assertAdmin();

  const updates: Record<string, any> = {};

  const storeName = formData.get("storeName");
  if (storeName !== null) updates.storeName = String(storeName).trim();

  const supportPhone = formData.get("supportPhone");
  if (supportPhone !== null) updates.supportPhone = String(supportPhone).trim();

  const announcementActive = formData.get("announcementActive");
  if (announcementActive !== null) updates.announcementActive = announcementActive === "on" || announcementActive === "true";

  const announcementText = formData.get("announcementText");
  if (announcementText !== null) updates.announcementText = String(announcementText).trim();

  const paytrMerchantId = formData.get("paytrMerchantId");
  if (paytrMerchantId !== null) updates.paytrMerchantId = String(paytrMerchantId).trim();

  const paytrMerchantKey = formData.get("paytrMerchantKey");
  if (paytrMerchantKey !== null) updates.paytrMerchantKey = String(paytrMerchantKey).trim();

  const paytrMerchantSalt = formData.get("paytrMerchantSalt");
  if (paytrMerchantSalt !== null) updates.paytrMerchantSalt = String(paytrMerchantSalt).trim();

  const paytrTestMode = formData.get("paytrTestMode");
  if (paytrTestMode !== null) updates.paytrTestMode = paytrTestMode === "on" || paytrTestMode === "true";

  const iyzicoApiKey = formData.get("iyzicoApiKey");
  if (iyzicoApiKey !== null) updates.iyzicoApiKey = String(iyzicoApiKey).trim();

  const iyzicoSecretKey = formData.get("iyzicoSecretKey");
  if (iyzicoSecretKey !== null) updates.iyzicoSecretKey = String(iyzicoSecretKey).trim();

  const iyzicoTestMode = formData.get("iyzicoTestMode");
  if (iyzicoTestMode !== null) updates.iyzicoTestMode = iyzicoTestMode === "on" || iyzicoTestMode === "true";

  const shippingCompany = formData.get("shippingCompany");
  if (shippingCompany !== null) updates.shippingCompany = String(shippingCompany).trim();

  const freeShippingThreshold = formData.get("freeShippingThreshold");
  if (freeShippingThreshold !== null) updates.freeShippingThreshold = Number(freeShippingThreshold) || 1500;

  const flatShippingFee = formData.get("flatShippingFee");
  if (flatShippingFee !== null) updates.flatShippingFee = Number(flatShippingFee) || 59;

  const parasutClientId = formData.get("parasutClientId");
  if (parasutClientId !== null) updates.parasutClientId = String(parasutClientId).trim();

  const parasutClientSecret = formData.get("parasutClientSecret");
  if (parasutClientSecret !== null) updates.parasutClientSecret = String(parasutClientSecret).trim();

  const parasutAutoInvoice = formData.get("parasutAutoInvoice");
  if (parasutAutoInvoice !== null) updates.parasutAutoInvoice = parasutAutoInvoice === "on" || parasutAutoInvoice === "true";

  const paymentCardActive = formData.get("paymentCardActive");
  if (paymentCardActive !== null) updates.paymentCardActive = paymentCardActive === "on" || paymentCardActive === "true";

  const paymentCodActive = formData.get("paymentCodActive");
  if (paymentCodActive !== null) updates.paymentCodActive = paymentCodActive === "on" || paymentCodActive === "true";

  const paymentTransferActive = formData.get("paymentTransferActive");
  if (paymentTransferActive !== null) updates.paymentTransferActive = paymentTransferActive === "on" || paymentTransferActive === "true";

  await updateStoreSettings(updates);
  revalidatePath("/admin/ayarlar");
  revalidatePath("/admin/entegrasyonlar");
  revalidatePath("/");
  return { success: true };
}
