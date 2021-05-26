const title = "Cat Ears for V1";
const description =
  "Add cat ears to your profile photo to support V1 in Valorant";

const SEO = {
  title,
  description,
  canonical: "https://www.catearsforv1.com",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://www.catearsforv1.com",
    title,
    description,
    images: [
      {
        url: "https://www.catearsforv1.com/static/og.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: "@berbaroovez",
    site: "@berbaroovez",
    cardType: "summary_large_image",
  },
};

export default SEO;
