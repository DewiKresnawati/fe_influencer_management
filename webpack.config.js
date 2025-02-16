// filepath: /c:/xampp/htdocs/star/starweb/webpack.config.js
const path = require('path');

module.exports = {
  // Konfigurasi lain yang ada
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/")
    }
  },
  // Konfigurasi lain yang ada
};