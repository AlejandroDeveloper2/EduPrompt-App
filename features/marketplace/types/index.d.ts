import { LangTag } from "@/core/types";

type PaymentFrecuency = "monthly" | "yearly";
type SubscriptionStatus = "cancelled" | "active" | "failed";

type PayPalMessageType = "error" | "cancelled" | "success";

type OrderStatus =
  | "CREATED"
  | "APPROVED"
  | "COMPLETED"
  | "CANCELLED"
  | "PENDING"
  | "SAVED";

interface TokenPackage {
  packageId: string;
  title: { en: string; es: string; pt: string };
  description: { en: string; es: string; pt: string };
  price: number;
  tokenAmount: number;
}

interface SubscriptionPlan {
  subscriptionPlanId: string;
  title: { en: string; es: string; pt: string };
  description: { en: string; es: string; pt: string };
  paymentFrecuency: PaymentFrecuency;
  price: number;
}

interface Product {
  productId: string;
  title: string;
  description: string;
  price: number;
  productType: "subscription" | "token_package";
  language?: LangTag;
  tokenAmount?: number;
}

interface CaptureProductOrderInput {
  orderId: string;
  productDetails: Product;
}

interface Subscription {
  subscriptionId: string;
  history: {
    historyId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
  }[];
  currentHistoryId: string;
}

interface OrderStatusResponse {
  orderId: string;
  status: OrderStatus;
}

export type {
  CaptureProductOrderInput,
  OrderStatus,
  OrderStatusResponse,
  PaymentFrecuency,
  PayPalMessageType,
  Product,
  Subscription,
  SubscriptionPlan,
  SubscriptionStatus,
  TokenPackage,
};
