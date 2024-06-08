/**
 * This is created by pascalcouturier and all rights are reserved.
 * This is just a test aplication and it is not for commercial use nor is it fully maintained
 */

class RssFeed extends HTMLElement {
  static get observedAttributes() {
    return [
      "substack-page-name",
      "show-feed-description",
      "feed-amount-displayed",
      "custom-css-feed",
      "custom-css-loader",
      "custom-css-url",
      "feed-error-message",
      "feed-no-results-message",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.feedItems = [];
    this.substackPageName = "";
    this.showFeedDescription = false;
    this.feedDescription = "";
    this.isLoadingFeed = true;
    this.feedAmountDisplayed = 6;
    this.customCssUrl = "";
    this.customCssFeed = "";
    this.customCssLoader = "";
    this.customCss = "";
    this.feedErrorMessage =
      "There has been an error loading the feed, please try again later";
    this.feedNoResultsMessage = "No items to display";
  }

  connectedCallback() {
    // this.fetchCustomCss();
    this.renderLoading();
    // this.fetchFeed();
  }

  sanitizeCSS(css) {
    // Define a whitelist of allowed CSS properties
    const allowedProperties = [
      "align-content",
      "align-items",
      "align-self",
      "all",
      "animation",
      "animation-delay",
      "animation-direction",
      "animation-duration",
      "animation-fill-mode",
      "animation-iteration-count",
      "animation-name",
      "animation-play-state",
      "animation-timing-function",
      "backface-visibility",
      "background",
      "background-attachment",
      "background-blend-mode",
      "background-clip",
      "background-color",
      "background-image",
      "background-origin",
      "background-position",
      "background-repeat",
      "background-size",
      "border",
      "border-bottom",
      "border-bottom-color",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
      "border-bottom-style",
      "border-bottom-width",
      "border-collapse",
      "border-color",
      "border-image",
      "border-image-outset",
      "border-image-repeat",
      "border-image-slice",
      "border-image-source",
      "border-image-width",
      "border-left",
      "border-left-color",
      "border-left-style",
      "border-left-width",
      "border-radius",
      "border-right",
      "border-right-color",
      "border-right-style",
      "border-right-width",
      "border-spacing",
      "border-style",
      "border-top",
      "border-top-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-top-style",
      "border-top-width",
      "border-width",
      "bottom",
      "box-decoration-break",
      "box-shadow",
      "box-sizing",
      "break-after",
      "break-before",
      "break-inside",
      "caption-side",
      "caret-color",
      "@charset",
      "clear",
      "clip",
      "color",
      "column-count",
      "column-fill",
      "column-gap",
      "column-rule",
      "column-rule-color",
      "column-rule-style",
      "column-rule-width",
      "column-span",
      "column-width",
      "columns",
      "content",
      "counter-increment",
      "counter-reset",
      "cursor",
      "direction",
      "display",
      "empty-cells",
      "filter",
      "flex",
      "flex-basis",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "float",
      "font",
      "@font-face",
      "font-family",
      "font-feature-settings",
      "@font-feature-values",
      "font-kerning",
      "font-language-override",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-synthesis",
      "font-variant",
      "font-variant-alternates",
      "font-variant-caps",
      "font-variant-east-asian",
      "font-variant-ligatures",
      "font-variant-numeric",
      "font-variant-position",
      "font-weight",
      "grid",
      "grid-area",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-column",
      "grid-column-end",
      "grid-column-gap",
      "grid-column-start",
      "grid-gap",
      "grid-row",
      "grid-row-end",
      "grid-row-gap",
      "grid-row-start",
      "grid-template",
      "grid-template-areas",
      "grid-template-columns",
      "grid-template-rows",
      "hanging-punctuation",
      "height",
      "hyphens",
      "image-orientation",
      "image-rendering",
      "@import",
      "isolation",
      "justify-content",
      "@keyframes",
      "left",
      "letter-spacing",
      "line-break",
      "line-height",
      "list-style",
      "list-style-image",
      "list-style-position",
      "list-style-type",
      "margin",
      "margin-bottom",
      "margin-left",
      "margin-right",
      "margin-top",
      "max-height",
      "max-width",
      "@media",
      "min-height",
      "min-width",
      "mix-blend-mode",
      "object-fit",
      "object-position",
      "opacity",
      "order",
      "outline",
      "outline-color",
      "outline-offset",
      "outline-style",
      "outline-width",
      "overflow",
      "overflow-x",
      "overflow-y",
      "padding",
      "padding-bottom",
      "padding-left",
      "padding-right",
      "padding-top",
      "page-break-after",
      "page-break-before",
      "page-break-inside",
      "perspective",
      "perspective-origin",
      "pointer-events",
      "position",
      "quotes",
      "resize",
      "right",
      "rotate",
      "scale",
      "scroll-behavior",
      "tab-size",
      "table-layout",
      "text-align",
      "text-align-last",
      "text-combine-upright",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-line",
      "text-decoration-style",
      "text-indent",
      "text-justify",
      "text-orientation",
      "text-overflow",
      "text-shadow",
      "text-transform",
      "top",
      "transform",
      "transform-origin",
      "transform-style",
      "transition",
      "transition-delay",
      "transition-duration",
      "transition-property",
      "transition-timing-function",
      "translate",
      "unicode-bidi",
      "user-select",
      "vertical-align",
      "visibility",
      "white-space",
      "width",
      "word-break",
      "word-spacing",
      "word-wrap",
      "writing-mode",
      "z-index",
    ];

    // Split the CSS into blocks
    const blocks = css.split("}");

    // Map each block to a sanitized block
    const sanitizedBlocks = blocks.map((block) => {
      // Split the block into selector and rules
      const [selector, rules] = block.split("{");

      // If there are no rules, return the block as is
      if (!rules) return block;

      // Split the rules into individual rules
      const individualRules = rules.split(";");

      // Filter the individual rules
      const sanitizedRules = individualRules.filter((rule) => {
        // Split the rule into property and value
        const [property, value] = rule.split(":");

        // Check if the property is in the whitelist
        return allowedProperties.includes(property.trim());
      });

      // Join the sanitized rules back into a string
      const sanitizedRulesString = sanitizedRules.join(";");

      // Return the selector and the sanitized rules
      return `${selector}{${sanitizedRulesString}`;
    });

    // Join the sanitized blocks back into a string
    return sanitizedBlocks.join("}");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "substack-page-name":
        this.substackPageName = newValue;
        this.fetchFeed();
        break;
      case "show-feed-description":
        console.log("show-feed-description", newValue);
        this.showFeedDescription = newValue;
        break;
      case "feed-amount-displayed":
        this.feedAmountDisplayed = newValue;
        break;
      case "custom-css-feed":
        this.customCssFeed = this.sanitizeCSS(newValue);
        break;
      case "custom-css-loader":
        this.customCssLoader = this.sanitizeCSS(newValue);
        break;
      case "custom-css-url":
        this.customCssUrl = newValue;
        this.fetchCustomCss();
        break;
      case "feed-error-message":
        this.feedErrorMessage = newValue;
        break;
      case "feed-no-results-message":
        this.feedNoResultsMessage = newValue;
        break;
    }
  }

  async fetchCustomCss() {
    if (this.customCssUrl) {
      try {
        const response = await fetch(this.customCssUrl);
        let css = await response.text();
        this.customCss = this.sanitizeCSS(css);
      } catch (error) {
        console.error("Error fetching custom CSS:", error);
      }
    }
  }

  renderLoading() {
    this.shadowRoot.innerHTML = `
      <style>
        .rss-feed__loader {
          text-align: center;
          margin-top: 1rem;
        }
        
        .rss-feed__loader p {
          font-size: 16px;
          font-weight: bold;
        }
        ${this.customCssLoader}
      </style>
      <div id="loader">
        <div class="rss-feed__loader">
          <p>Loading...</p>
        </div>
      </div>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  renderError() {
    this.shadowRoot.innerHTML = `
      <style>
        .rss-feed__error {
          text-align: center;
          margin-top: 1rem;
        }
        
        .rss-feed__error p {
          font-size: 16px;
          font-weight: bold;
        }
        ${this.customCssLoader}
      </style>
      <div id="error">
        <div class="rss-feed__error">
          <p>${this.feedErrorMessage}</p>
        </div>
      </div>
    `;
  }

  async fetchFeed() {
    try {
      this.isLoadingFeed = true;
      const response = await fetch(
        `https://api.pascalcouturier.com/api/service/rssfeed/${this.substackPageName}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch RSS feed");
      } else {
        let json = await response.json();
        this.feedItems = json?.rss?.channel?.item;
        this.feedDescription =
          json?.rss?.channel?.description["#cdata-section"];
        this.isLoadingFeed = false;
        this.render();
      }
    } catch (error) {
      this.isLoadingFeed = false;
      console.error("Error fetching RSS feed:", error);
      this.renderError();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .rss-feed {
          padding-left: 1rem;
          padding-right: 1rem;
          margin: 0 auto;
          padding-bottom: 4rem;
          color: black;
        }
        
        .rss-feed__section-break {
          width: 3rem;
          height: 4px;
          background: linear-gradient(to right, #5783db, #a6c0fe);
          margin: 2rem auto 0;
        }
        
        .rss-feed__loader {
          text-align: center;
          margin-top: 1rem;
        }
        
        .rss-feed__loader p {
          font-size: 16px;
          font-weight: bold;
        }
        
        .rss-feed__default-placeholder {
          text-align: center;
          margin: 2rem auto;
        }
        
        .rss-feed__default-placeholder p {
          font-size: 16px;
        }
        
        .rss-feed__grid {
          display: grid;
          margin: 4rem auto;
          grid-template-columns: 1fr;
          gap: 4rem;
          justify-content: center;
          align-items: start;
        }
        
        .rss-feed__button {
          text-align: center;
          display: block;
          margin: 1rem auto;
          max-width: 200px;
        }
        
        .rss-feed__item-container {
          color: black;
          background: white;
          margin: 0.5rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          height: 100%;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .rss-feed__item-container:hover {
          background-color: #a6dfeb;
          transition: all 0.3s ease;
        }
        
        .rss-feed__item-image-container {
          width: 150px;
          height: 150px;
          margin-bottom: 1rem;
        }
        
        .rss-feed__item-image-container .rss-feed__item-image {
          max-width: 100%;
          max-height: 100%;
          border-radius: 10px;
        }
        
        .rss-feed__item-title {
          font-weight: bold;
          margin-bottom: 0.8rem;
        }
        
        .rss-feed__item-description {
          font-size: 0.8em;
        }
        
        .rss-feed__item-published {
          font-size: 0.7em;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .no-results-message p {
            text-align: center;
            font-weight: bold;
        }
        
        @media (min-width: 600px) {
          .rss-feed__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 900px) {
          .rss-feed__grid {
            max-width: 1100px;
            grid-template-columns: repeat(3, 1fr);
          }
        }
        ${this.customCss}
        ${this.customCssFeed}
      </style>
      <div id="rss-feed" class="rss-feed">
        <p id="feed-description" class="feed-description" style="display: ${
          this.showFeedDescription ? "block" : "none"
        }">${this.feedDescription}</p>
        ${
          this.feedItems && this.feedItems.length > 0
            ? `<div id="rss-feed__grid" class="rss-feed__grid">
                  ${this.feedItems
                    .slice(0, this.feedAmountDisplayed) // Only take the first 10 items
                    .map(
                      (item) => `
                              <a href="${item.link}" target="_blank" id="${
                        item.guid["#text"]
                      }" class="rss-feed__item-container">
                                  <div class="rss-feed__item-image-container">
                                      <img src="${
                                        item.enclosure["@url"]
                                      }" alt="Feed Item Image" class="rss-feed__item-image">
                                  </div>
                                  <h3 class="rss-feed__item-title">${
                                    item.title["#cdata-section"]
                                  }</h3>
                                  <p class="rss-feed__item-description">${
                                    item.description["#cdata-section"]
                                  }</p>
                                  <p class="rss-feed__item-published">Published: ${this.formatDate(
                                    item.pubDate
                                  )}</p>
                              </a>
                          `
                    )
                    .join("")}
              </div>`
            : `<div class="no-results-message"><p>${this.feedNoResultsMessage}</p></div>`
        }
      </div>
    `;
  }
}

customElements.define("substack-posts-feed", RssFeed);
