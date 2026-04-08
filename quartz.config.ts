import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Frostpunk",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "seanie-d.github.io/frostpunk",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#e8e5d8",        // dingy cold parchment
          lightgray: "#c8c3b0",    // aged border
          gray: "#8e8a7a",         // muted warm-gray
          darkgray: "#2e3240",     // dark with cold blue tint
          dark: "#1a1e2e",         // deep cold navy
          secondary: "#a06818",    // deep amber for light bg
          tertiary: "#c07820",     // hover
          highlight: "rgba(160, 104, 24, 0.12)",
          textHighlight: "#f5ad5c66",
        },
        darkMode: {
          light: "#131c28",        // deep cold blue-black
          lightgray: "#1f2d3d",    // dark steel blue
          gray: "#3d5166",         // mid steel blue
          darkgray: "#bfbbaa",     // dingy parchment text
          dark: "#d8d4c2",         // bright dingy parchment for headers
          secondary: "#f5ad5c",    // Hearth amber — fire against ice
          tertiary: "#f7c380",     // hover
          highlight: "rgba(245, 173, 92, 0.12)",
          textHighlight: "#f5ad5c44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
