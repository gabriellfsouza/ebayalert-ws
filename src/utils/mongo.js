const aggregationQueue = [
  {
    $project: {
      fieldMath: {
        $multiply: ['$interval', 6000],
      },
      updatedAt: '$updatedAt',
      email: '$email',
      phrases: '$phrases',
    },
  },
  {
    $project: {
      dateRef: {
        $add: ['$fieldMath', '$updatedAt'],
      },
      email: '$email',
      phrases: '$phrases',
    },
  },
  {
    $match: { $expr: { $lt: ['$dateRef', new Date()] } },
  },
];

module.exports = { aggregationQueue };
