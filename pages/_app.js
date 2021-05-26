import GlobalStyles from "../util/GlobalStyles";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import * as Fathom from "fathom-client";

import { useEffect } from "react";

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load(process.env.FATHOM_SITE_ID, {
        includedDomains: ["https://www.catearsforv1.com/"],
      });
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
