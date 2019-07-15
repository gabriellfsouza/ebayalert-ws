module.exports = {
  host: 'svcs.ebay.com',
  path: '/services/search/FindingService/v1',
  http: 'https',
  params: {
    'OPERATION-NAME': 'findItemsByKeywords',
    'SERVICE-VERSION': '1.0.0',
    'SECURITY-APPNAME': process.env.EBAY_SECURITY_APPNAME,
    'paginationInput.entriesPerPage': process.env.EBAY_ITEMS_PER_PAGE,
    'RESPONSE-DATA-FORMAT': 'JSON',
    'REST-PAYLOAD': null,
    sortOrder: 'PricePlusShippingLowestz',
  },
};
