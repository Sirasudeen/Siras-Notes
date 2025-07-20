// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Siras Notes",
  tagline: "Walk into my mind palace.",
  favicon: "img/logo.png",

  url: "https://notes.siras.dev", // Change to your deployed URL
  baseUrl: "/",

  organizationName: "Sirasudeen", // Your GitHub username/org
  projectName: "siras-notes",     // Your repo name

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        gtag: {
          trackingID: "G-SH8PQ13FF4", // Your GA4 ID
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: "./sidebars.js",
          routeBasePath: "/", // Docs as the landing page
          showLastUpdateTime: true,
          // editUrl: "https://github.com/Sirasudeen/siras-notes",
        },
        blog: {
          blogTitle: "Siras' Blog",
          blogDescription: "Updates, thoughts, and more!",
          showReadingTime: true,
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Siras Notes`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
      },
      // Remove or configure Algolia if you don't use it
      algolia: {
        appId: "AQVCMEVYAS",
        apiKey: "119e30c81bd6ccdd7dce41b5f769b21b",
        indexName: "siras-notes",

        contextualSearch: false,

        searchPagePath: "search",
        insights: false,
      },
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Siras Notes",
        logo: {
          alt: "Siras Notes Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar", // or your sidebar id
            position: "left",
            label: "Notes",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/Sirasudeen/siras-notes",
            position: "right",
            className: "header--github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      stylesheets: [
  {
    href: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap',
    rel: 'stylesheet',
  },
],
      footer: {
        style: "dark",
        links: [
          {
            title: "Notes",
            items: [
              {
                label: "All Notes",
                to: "/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Sirasudeen/",
              },
              // Add more if you want
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "Siras Notes GitHub",
                href: "https://github.com/Sirasudeen/siras-notes",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Siras Notes. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
