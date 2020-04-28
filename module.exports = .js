module.exports = {
  

    pwa: {
      name: 'Mind Games',
      themeColor: '#009688',
      msTileColor: '#009688',
      manifestOptions: {
        background_color: '#FFFFFF'
      }
      
    },
  
    chainWebpack: config => {
      config.module
          .rule('vue')
          .use('vue-loader')
          .tap(options => {
              return options;
          });
  },
  
  
  
  
  
  
  assetsDir: '../src/assets/',
  
  configureWebpack: {
      module: {
          rules: [
              {
                  test: /\.(png|jpg|gif)$/,
                  use: [
                      {
                          loader: 'file-loader',
                          options: {
                              outputPath: '../src/assets/images',
                              name: '../src/assets/images/[name].[ext]'
                          }
                      }
                  ]
              }
          ]
      }
  }
  }
  
  
  