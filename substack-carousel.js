class RssFeed extends HTMLElement {
  static get observedAttributes() {
    return ["feed-url", "show-feed-description"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.feedItems = [];
    this.feedUrl = "";
    this.showFeedDescription = false;
    this.feedDescription = "";
    this.isLoadingFeed = true;
  }

  connectedCallback() {
    this.fetchFeed();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "feed-url":
        this.feedUrl = newValue;
        this.fetchFeed();
        break;
      case "feed-description":
        this.feedDescription = newValue;
        break;
      case "feed-items":
        this.feedItems = JSON.parse(newValue);
        this.render();
        break;
      case "show-feed-description":
        this.showFeedDescription = newValue;
        break;
    }
  }

  async fetchFeed() {
    try {
      this.isLoadingFeed = true;
      const response = await fetch(this.feedUrl, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      let json = await response.json();
      this.feedItems = json?.rss?.channel?.item;
      this.feedDescription = json?.rss?.channel?.description["#cdata-section"];
      this.isLoadingFeed = false;
      this.render();
    } catch (error) {
      this.isLoadingFeed = false;
      console.error("Error fetching RSS feed:", error);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .rss-feed {
          padding-left: 1rem;
          padding-right: 1rem;
          margin: 0 auto 4rem;
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
        
        .rss-feed__blog-logo {
          text-align: center;
          margin: 1rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .rss-feed__blog-logo img {
          max-width: 500px;
          width: 100%;
        }
        
        .rss-feed__blog-logo p {
          margin-top: 2rem;
          font-size: 16px;
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
          gap: 1rem;
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
      </style>
      <div id="rss-feed">
        <p id="feed-description" class="feed-description" style="display: ${
          this.showFeedDescription ? "block" : "none"
        }>${this.feedDescription}</p>
        <div id="loader"  ${this.isLoadingFeed ? "" : "hidden"}">
          <div class="rss-feed__loader">
            <p>Loading...</p>
          </div>
        </div>
        <div id="rss-feed__grid">
          ${this.feedItems
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
}

customElements.define("rss-feed", RssFeed);
