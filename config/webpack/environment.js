const { environment } = require('@rails/webpacker')

/**
 * Solution from https://peaku.co/questions/9610-error-de-paquete-web:-configurationnode-tiene-una-propiedad-desconocida-%26%2339;fs%26%2339;
 * To "[webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema"
 *    configuration.node does not have 'dgram', 'fs', 'net', 'tls', and 'child_process'
 */
const customConfig = {
    resolve: {
      fallback: {
        dgram: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        timers: false
      }
    }
  };
  
  environment.config.delete('node.dgram')
  environment.config.delete('node.fs')
  environment.config.delete('node.net')
  environment.config.delete('node.tls')
  environment.config.delete('node.child_process')
  
  environment.config.merge(customConfig);
  /** END solution to  '[webpack-cli] ...' bug */
  
  /** 
   * Solution to: JQuery is not defined and failing to load some react components
   * See: https://www.codegrepper.com/code-examples/javascript/rails+6+jquery+%24+is+not+defined
  */
  const webpack = require('webpack')
  environment.plugins.prepend('Provide',
    new webpack.ProvidePlugin({
        $: 'jquery/src/jquery',
        jQuery: 'jquery/src/jquery'
    })
  )
  /** END solution to 'jQuery is not defined ...' */

module.exports = environment
