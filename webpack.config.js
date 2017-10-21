module.exports = function(webpackConfig) {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['antd',{
    style: 'css',  // if true, use less
  }]);
  
  webpackConfig.module.loaders.unshift({
    test: /\.(png|jpg)$/,
    loader: 'url?limit=250000'
  });

  return webpackConfig;
};
