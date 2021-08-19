const siteConfig = {
  algolia: {
    apiKey: "0fc70d15e1f3d90d47219bd99968ddd0",
    indexName: "sniptt",
  },
  api: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "api.sniptt.com"
        : "api-dev.sniptt.com",
  },
  title: "Sniptt",
  tagline: "The secret manager built for developers",
  announcementBar: {
    text: "Looking for a developer-friendly secret manager? Try snip! 🙌",
    url: "https://sniptt.com",
  },
  url: `https://ots.sniptt.com`,
  baseUrl: "/",
  repo: {
    url: "https://github.com/sniptt-official/ots",
  },
  footer: {
    links: [
      {
        title: "Developers",
        items: [
          {
            label: "Snip",
            to: "https://sniptt.com",
          },
        ],
      },
      {
        title: "Community",
        items: [
          {
            label: "GitHub",
            href: "https://github.com/sniptt-official/snip-cli",
          },
          {
            label: "Medium",
            href: "https://sniptt.medium.com",
          },
          {
            label: "Stack Overflow",
            href: "https://stackoverflow.com/questions/tagged/sniptt",
          },
        ],
      },
      {
        title: "Sniptt",
        items: [
          {
            label: "Terms",
            to: "https://sniptt.com/docs/terms",
          },
          {
            label: "Privacy",
            to: "https://sniptt.com/docs/privacy",
          },
        ],
      },
    ],
  },
  seo: {
    title: "Sniptt",
    titleTemplate: "%s - Sniptt",
    description: "The secret manager built for developers",
    siteUrl: "https://ots.sniptt.com",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://ots.sniptt.com",
      title: "Sniptt",
      description: "The secret manager built for developers",
      site_name: "Sniptt: The secret manager built for developers",
      images: [
        {
          url: "https://ots.sniptt.com/og-image.png",
          width: 1240,
          height: 480,
          alt: "Sniptt: The secret manager built for developers",
        },
      ],
    },
  },
}

export default siteConfig
