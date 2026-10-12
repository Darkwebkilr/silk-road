import { getAdminCoupons } from "@/lib/admin-store";
import CouponListClient from "./coupon-list";

export const instant = false;

export default async function AdminCouponsPage() {
  const coupons = await getAdminCoupons();

  return <CouponListClient initialCoupons={coupons} />;
}
