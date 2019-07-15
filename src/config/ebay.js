module.exports = {
  host: 'svcs.ebay.com',
  path: '/services/search/FindingService/v1',
  http: 'https',
  params: {
    'OPERATION-NAME': 'findItemsByKeywords',
    'SERVICE-VERSION': '1.0.0',
    'SECURITY-APPNAME': 'Gabrield-alertws-PRD-0d8d33955-31891659',
    'paginationInput.entriesPerPage': 3,
    'RESPONSE-DATA-FORMAT': 'JSON',
    'REST-PAYLOAD': null,
    sortOrder: 'PricePlusShippingLowestz',
  },
};
