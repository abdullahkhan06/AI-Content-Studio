export const TRACER_BUSINESS = {
  name: "Sunrise Café",
  type: "restaurant" as const,
  products: ["Cappuccino", "Avocado Toast", "Seasonal Smoothie Bowl"],
  brandTone: "casual" as const,
  brandColors: ["#2D5016", "#F5E6D3", "#D4A574"],
  targetCustomers:
    "Young professionals and students looking for aesthetic café experiences",
} satisfies {
  name: string;
  type: string;
  products: string[];
  brandTone: string;
  brandColors: string[];
  targetCustomers: string;
};

export type TracerBusiness = typeof TRACER_BUSINESS;
