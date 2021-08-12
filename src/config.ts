import GithubIcon from "~/components/icons/Github"

import { SiteConfig } from "./types"

const githubOrgUrl = "https://github.com/sniptt-official"
const domain = "ots.sniptt.com"
const githubUrl = `${githubOrgUrl}/snip`

const siteConfig: SiteConfig = {
  api: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "api.sniptt.com"
        : "api-dev.sniptt.com",
  },
  title: "Sniptt",
  tagline: "The secret manager built for developers",
  organizationName: "sniptt-official",
  url: `https://${domain}`,
  baseUrl: "/",
  domain,
  githubOrgUrl,
  githubUrl,
  navbar: {
    items: [
      { label: "Docs", to: "/docs", position: "left" },
      {
        label: "API",
        to: "/api",
        position: "left",
      },
      {
        label: "Share One-Time Secret",
        to: "/",
        position: "left",
        activeBasePath: "/",
      },
      {
        icon: GithubIcon,
        href: githubUrl,
        position: "right",
      },
    ],
  },
  footer: {
    links: [
      {
        title: "Developers",
        items: [
          {
            label: "Documentation",
            to: "/docs/getting-started",
          },
          {
            label: "Share One-Time Secret",
            to: "/",
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
            to: "/terms",
          },
          {
            label: "Privacy",
            to: "/privacy",
          },
        ],
      },
    ],
  },
}

export default siteConfig
