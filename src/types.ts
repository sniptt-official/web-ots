import { LinkSection } from "~/components/layouts/Footer"

export type SiteConfig = {
  api: ApiConfig
  baseUrl: string
  domain: string
  footer: FooterConfig
  githubOrgUrl: string
  githubUrl: string
  navbar: NavbarConfig
  organizationName: string
  tagline: string
  title: string
  url: string
}

export enum Region {
  US = "us-east-1", // US East (N. Virginia).
  EU = "eu-central-1", // Frankfurt.
}

type ApiConfig = {
  baseUrl: string
}

type NavbarConfig = {
  items: Array<NavItem>
}

export type NavItem = {
  activeBasePath?: string
  className?: string
  href?: string
  icon?: React.ElementType
  label?: string
  position: "left" | "right"
  to?: string
}

type FooterConfig = {
  links: Array<LinkSection>
}
