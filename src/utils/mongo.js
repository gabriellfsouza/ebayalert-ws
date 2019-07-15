const aggregationQueue = [
  {
    $project: {
      fieldMath: {
        $multiply: ['$interval', 6000],
      },
      updatedAt: '$updatedAt',
      email: '$email',
      phrase: '$phrase',
    },
  },
  {
    $project: {
      dateRef: {
        $add: ['$fieldMath', '$updatedAt'],
      },
      email: '$email',
      phrase: '$phrase',
    },
  },
  {
    $match: { $expr: { $lt: ['$dateRef', new Date()] } },
  },
];

module.exports = { aggregationQueue };
