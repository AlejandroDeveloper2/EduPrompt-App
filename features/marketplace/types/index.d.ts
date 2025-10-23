type TokenPackagePlan = "basic_package" | "pro_package" | "advanced_package";

interface TokenPackage {
  packageId: string;
  price: string;
  packageTitle: string;
  description: string;
  tokensAmount: number;
}

export type { TokenPackage, TokenPackagePlan };
