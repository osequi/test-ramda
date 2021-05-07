/**
 * Loads images from Flickr
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
 * The impure functions separated into a special name space
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
const image = (x) => `<img src="${x}"/>`;
const images = compose(map(image), prop("message"));
const render = compose(Impure.toConsole("Images:"), images);
const app = compose(Impure.getJSON(render), url);

/**
 * Runs the app with data
 */
app("hound");
