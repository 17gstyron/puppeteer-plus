const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

class ElementSelector {
  constructor(page, selector) {
    this._page = page;
    this._selector = selector;
  }

  async getElement() {
    let that = this;
    return new Promise((resolve) => {
      if (typeof that._element === "undefined") {
        that._page.$(that._selector).then((el) => {
          that._element = el;
          resolve(el);
        });
      } else {
        resolve(that._element);
      }
    });
  }

  /**
   * Check if element is visible in the DOM
   * @returns {Promise<Boolean>}
   **/
  async isVisible() {
    return await this.getElement().then((el) => {
      if (el == null) {
        return $el;
      }
      return el.boundingBox() !== null;
    });
  }

  /**
   * Get element attribute
   * @param {string} attr
   * @returns {Promise<String>}
   */
  async attr(attr) {
    let that = this;
    return await this.getElement().then(async ($el) => {
      if ($el == null) {
        return $el;
      }
      const handle = await that.evaluateHandle(
        (el, attr) => el.getAttribute(attr),
        $el,
        attr
      );
      return await handle.jsonValue();
    });
  }

  /**
   * Get element text
   * @returns {Promise<String>}
   */
  async text() {
    let that = this;
    return await this.getElement().then(async ($el) => {
      if ($el == null) {
        return $el;
      }
      const handle = await that.evaluateHandle((el) => el.innerText, $el);
      return await handle.jsonValue();
    });
  }

  /**
   * Get element html
   * @returns {Promise<String>}
   */
  async html() {
    let that = this;
    return await this.getElement().then(async ($el) => {
      if ($el == null) {
        return $el;
      }
      const handle = await that.evaluateHandle((el) => el.innerHTML, $el);
      return await handle.jsonValue();
    });
  }

  /**
   * Get element property
   * @param {string} prop
   * @returns {Promise<String>}
   */
  async prop(prop) {
    let that = this;
    return await this.getElement().then(async ($el) => {
      if ($el == null) {
        return $el;
      }
      const handle = await that.evaluateHandle(
        (el, prop) => el[prop],
        $el,
        prop
      );
      return await handle.jsonValue();
    });
  }
}

const { Page } = require("../puppeteer/lib/cjs/puppeteer/common/Page");

/**
 * Prepares a selector to make scraping queries
 * @returns ElementSelector
 **/
Page.prototype.q = function (selector) {
  return new ElementSelector(this, selector);
};

/**
 * Check if element exists
 * @returns {Promise<Boolean>}
 **/
Page.prototype.exists = async function (selector) {
  return await this.$(selector).then((el) => {
    return el != null;
  });
};

/**
 * Gets elements selected attribute
 * @returns {Promise<Boolean>}
 **/
Page.prototype.getElementsAttribute = async function (selector, attribute) {
  return await this.$$(selector).then(async (elements) => {
    let list = [];

    for (let i = 0; i < elements.length; i++) {
      list.push(await elements[i].attr(attribute));
    }

    return list;
  });
};

/**
 * Fills form data easily
 * @returns {Promise<Boolean>}
 **/
Page.prototype.fill = async function (selector, fields) {
  for (let field in fields) {
    await this.$(selector + ' [name="' + field + '"]').then((el) => {
      el.attr("value", fields[field]);
    });
  }
  return true;
};

const ElementHandle = require("../puppeteer/lib/cjs/puppeteer/common/JSHandle").ElementHandle || require("../puppeteer/lib/cjs/puppeteer/common/ElementHandle").ElementHandle;

/**
 * Check if element is visible in the DOM
 * @returns {Promise<Boolean>}
 **/
ElementHandle.prototype.isVisible = async function () {
  return (await this.boundingBox()) !== null;
};

/**
 * Get element attribute
 * @param {string} name
 * @returns {Promise<String>}
 */
ElementHandle.prototype.getAttribute = async function (name) {
  const handle = await this.evaluateHandle(
    (el, name) => {
      if (name === "src") {
        return el.src;
      } else {
        return el.getAttribute(name);
      }
    },
    this,
    name
  );
  return await handle.jsonValue();
};

/**
 * Get all element attributes
 * @returns {Promise<String>}
 */
ElementHandle.prototype.attributes = async function () {
  const handle = await this.evaluateHandle(async (el) => {
    const attrs = await el.attributes;
    return attrs;
  }, this);
  return await handle.jsonValue();
};

/**
 * Get element inner text
 * @returns {Promise<String>}
 */
ElementHandle.prototype.innerText = async function () {
  const handle = await this.evaluateHandle((el) => el.innerText, this);
  return await handle.jsonValue();
};

/**
 * Get element property
 * @param {string} prop
 * @returns {Promise<String>}
 */
ElementHandle.prototype.prop = async function (prop) {
  const handle = await this.evaluateHandle(
    (el, prop) => el[prop],
    this,
    prop
  );
  return await handle.jsonValue();
};

module.exports = puppeteer;
