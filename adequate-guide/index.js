/**
 * Loads images from an API
 *
 * See https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch06.md#a-flickr-of-functional-programming
 */

/**
 * The imports
 */
const fetch = require("node-fetch");
const { curry, map, compose, prop } = require("ramda");

/**
 * The data
 */
const host = "dog.ceo";
const path = "/api/breed/";
const query = (tag) => `${tag}/images`;
const url = (tag) => `https://${host}${path}${query(tag)}`;

/**
 * The impure functions
 * - Separated into a special name space
 */
const Impure = {
  /**
   * This is an always handy logging function
   */
  toConsole: curry((tag, x) => {
    console.log(tag, x);
    return x;
  }),
  /**
   * This is also a standard fetching function
   */
  getJSON: curry((callback, url) =>
    fetch(url)
      .then((res) => res.json())
      .then(callback)
  ),
};

/**
 * The pure functions
 * - They build up / solve the problem step-by-step
 * - From smallest to largest
 * - The final function will be the app itself
 * - All functions are point-free, aka without data
 */

/**
 * 6. Returns a HTML image tag.
 */
const image = (x) => `<img src="${x}"/>`;

/**
 * 5. Wraps each `message` into an `image`
 * 4. Takes the `message` prop from the response
 */
const images = compose(map(image), prop("message"));

/**
 * 3. Renders the images to the console.
 * - This can be replaced by a HTML renderer.
 */
const render = compose(Impure.toConsole("Images:"), images);

/**
 * The app:
 *
 * 3. Renders the results
 * 2. Transform the result to JSON
 * 1. Loads the url
 *
 */
const app = compose(Impure.getJSON(render), url);

/**
 * 0. Runs the app with data
 * - `url` will get the `hound` prop
 */
app("hound");
