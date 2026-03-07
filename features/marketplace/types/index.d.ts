type PaymentFrecuency = "monthly" | "yearly";
type SubscriptionStatus = "cancelled" | "active" | "inactive";

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
  title: string;
  description: string;
  price: number;
  tokenAmount: number;
}

interface SubscriptionPlan {
  subscriptionPlanId: string;
  title: string;
  description: string;
  paymentFrecuency: PaymentFrecuency;
  price: number;
}

interface Product {
  productId: string;
  title: string;
  description: string;
  price: number;
  productType: "subscription" | "token_package";
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
