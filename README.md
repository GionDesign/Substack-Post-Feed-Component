# Substack Post Feed Component

A small and simple responsive Substack post feed component for your website.

> **Note:** This is in Alpha phase and not fully production ready, please watch the FAQs as some parts could change without notice.

---

## Implementation Details

This is a short explanation on how the substack rss feed component renderer can work and how it functions.

### Feed Preview

An example of how the feed can render is displayed below:

![Substack RSS Feed Preview](/images/feed preview.png)

### FAQs

A breakdown of how the component can work and function:

#### Component Usage

##### How to use the component

The `substack-posts-feed` is a custom HTML element that fetches and displays an RSS feed from a specified Substack page. It's a powerful tool that allows you to integrate Substack content directly into your website.

To use this component, you need to include it in your HTML file. Here's how you can do it:

This component can be customized with several attributes:

1. `substack-page-name`: This attribute is used to specify the name of the Substack page from which the RSS feed will be fetched. This is a required attribute for the component to function.
2. `show-feed-description`: This attribute is a boolean that determines whether the description of the feed should be displayed. By default, it is set to `false` and it doesn’t need to be provided for default functionality. If you want to show the feed description, set it to `true`
3. `feed-error-message`: This is optional and can be used to provide a custom error message when the feed fails to load
4. `feed-no-results-message`: This is optional and can be used to provide a custom message when there are no results returned from the feed but the request has returned successfully
5. `feed-amount-displayed`: This attribute is used to specify the number of feed items to display. By default, it is set to `6`. You can adjust this number to your liking
6. `custom-css-feed`: This attribute is used to provide custom CSS for the feed. Instead of a URL, you can provide inline CSS
7. `custom-css-loader`: This attribute is used to provide custom CSS for the loader. You can also provide inline CSS
8. `custom-css-url`: You can provide the url of a `.css` file and this will load that css stylesheet

Example of Full Component:

```html
<substack-posts-feed 
    substack-page-name="your-substack-page-name" 
    show-feed-description="true" 
    feed-amount-displayed="10" 
    custom-css-feed=".rss-feed { background-color: green; }"
    custom-css-loader=".rss-feed__loader { color: #ff0000; }"
    feed-error-message="There was an error loading the feed"
    feed-no-results-message="No results were found"
></substack-posts-feed>
```

Replace "your-substack-page-name" with the name of your Substack page, and adjust the `feed-amount-displayed` attribute to the number of feed items you want to display. You can also replace the CSS in `custom-css-feed` and `custom-css-loader` with your own CSS to customize the look of the feed and the loader.

Please note that the `substack-posts-feed` component must be imported into your HTML file before you can use it. You can do this by adding a script tag pointing to the `substack-carousel.js` file in your HTML file:

```html
<script src="https://api.pascalcouturier.com/resources/scripts/components/substack-post-feed.js"></script>
```

> **NOTE:** The domain that you are using needs to be added to the API access or there will be CORS errors and it will not be able to load. Please notify the admin of [api.pascalcouturier.com](http://api.pascalcouturier.com/) to be able to have your domain added to the list for access on your site.

## CSS Classes

You can customize the CSS classes to target them directly, or override them in the CSS attributes of the component.

The classes that are available are below:

- rss-feed
- rss-feed__section-break
- rss-feed__loader
- rss-feed__default-placeholder
- rss-feed__grid
- rss-feed__button
- rss-feed__item-container
- rss-feed__item-image-container
- rss-feed__item-image
- rss-feed__item-title
- rss-feed__item-description
- rss-feed__item-published
- no-results-message
- rss-feed__error

## Coming Soon

More updates and changes are coming soon so keep posted! 😁