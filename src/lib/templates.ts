import { EditorElement } from "@/providers/editor/editor-provider";

import { professionalPortfolio } from "./templates/portfolio/professional";
import { bestHeroSection } from "./templates/miscellaneous/hero";
import { standardLandingPage } from "./templates/landing-page/standard";
import { neoBrutalismPortfolio } from "./templates/portfolio/neo-brutalism";
import { modernCommerce } from "./templates/ecommerce/modern-ecommerce";
import { sneakerStoreDP } from "./templates/ecommerce/temp-ecommerce";

export type TemplateCategory =
  | "Portfolio"
  | "E-commerce"
  | "Landing Page"
  | "Miscellaneous";

export const templates: {
  name: string;
  imageUrl?: string;
  category: TemplateCategory;
  elements: EditorElement[];
}[] = [
  professionalPortfolio,
  neoBrutalismPortfolio,
  modernCommerce,
  sneakerStoreDP,
  standardLandingPage,
  bestHeroSection,
];
