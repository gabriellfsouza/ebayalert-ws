module.exports = {
  dsn: process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : '',
};
