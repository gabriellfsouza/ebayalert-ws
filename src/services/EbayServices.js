const axios = require('axios');
const ebayConfig = require('../config/ebay');

class EbayServices {
  constructor() {
    this.findPhrase = this.findPhrase.bind(this);
  }

  /**
   *
   * @param {String} phrase
   */
  async findPhrase(phrase) {
    const { http, host, path } = ebayConfig;
    const resultadoBusca = await axios.get(
      `${http}://${host}/${path}?${this._queryformatter(phrase)}`,
    );

    const resultadoFormatado = this._resultsFormatter(resultadoBusca);
    return resultadoFormatado;
  }

  /**
   *
   * @param {String} phrase
   */
  _queryformatter(phrase) {
    return [
      ...Object.keys(ebayConfig.params).map(key => (ebayConfig.params[key] !== null ? `${key}=${ebayConfig.params[key]}` : key)),
      `keywords=${phrase}`,
    ].join('&');
  }

  /**
   *
   * @param {String} response
   */
  _resultsFormatter(response) {
    return response.data.findItemsByKeywordsResponse[0].searchResult[0].item.map((item) => {
      const title = item.title[0];
      const subtitle = item.subtitle && item.subtitle[0] ? item.subtitle[0] : '';
      const pic = item.galleryURL[0];
      const viewItemURL = item.viewItemURL[0];
      const displayPrice = `${item.sellingStatus[0].currentPrice[0]['@currencyId']} ${
        item.sellingStatus[0].currentPrice[0].__value__
      }`;

      return {
        title,
        subtitle,
        pic,
        viewItemURL,
        displayPrice,
      };
    });
  }
}

module.exports = new EbayServices();
