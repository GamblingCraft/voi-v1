import type { Locale } from "@/i18n/config";
import type { LandingSlug } from "./landing.content";
import { ProductLanding } from "./pages/product-landing";
import { ProductionLanding } from "./pages/production-landing";
import { CooperationLanding } from "./pages/cooperation-landing";
import { ContactsPage } from "./pages/contacts-page";

const pageComponents = {
  product: ProductLanding,
  production: ProductionLanding,
  cooperation: CooperationLanding,
  contacts: ContactsPage,
};

export function LandingPage({ slug }: { locale: Locale; slug: LandingSlug }) {
  const Page = pageComponents[slug];
  return <Page />;
}
