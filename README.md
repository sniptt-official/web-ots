<p align="center">
  <a href="https://ots.sniptt.com">
    <img src=".github/assets/ots-web-cover.svg" alt="OTS Web Logo" />
  </a>
</p>

<div align="center">
  <a href="https://ots.sniptt.com" alt="Website Status">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fots-sniptt.netlify.app" />
  </a>
  <a href="https://api.netlify.com/api/v1/badges/9a02edc7-b47d-49f9-97ae-db42d5793e14/deploy-status" alt="Deploy Status">
  <img src="https://img.shields.io/netlify/9a02edc7-b47d-49f9-97ae-db42d5793e14?label=deployment" />
</a>
</div>

<p align="right" style="padding-top:16px">
  <i>If you use this repo, star it ⭐️</i>
</p>

***

<p align="center">🔐 <b>Share end-to-end encrypted secrets with others via a one-time URL</b></p>

<p align="center">Use to securely share API Keys, Signing secrets, Passwords, etc. with 3rd parties or with your team</p>

<p align="center">Secrets are destroyed 💥 once viewed, or after specified expiry</p>

***

## Introduction

This is the fontend for https://ots.sniptt.com.

It is open source to provide full transparency in how we handle secrets on our website. You can inspect and review the code to verify our end-to-end encryption of secrets.

## Features

- 🚀 **[Next.js](https://nextjs.org/)** React Framework
- 🎨 **[Material UI (v5)](https://next.material-ui.com/)** design system
- 🌳 **[Ky](https://github.com/sindresorhus/ky)** HTTP client for remote API calls
- 🔒 **[SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)** for end-to-end encryption
- 💦 **[animate.css](https://github.com/animate-css/animate.css)** for cross-browser CSS animation support
- 📗 **[Fontsource](https://github.com/fontsource/fontsource)** for self-hosted fonts

## Development
1. Install Node 14 or later.
2. Clone this repository.
3. Run `yarn` to install the dependencies.
4. Run `yarn dev` to start the frontend dev server.
5. Open `http://localhost:3000/` to view the frontend.

## License

See [LICENSE](LICENSE)
