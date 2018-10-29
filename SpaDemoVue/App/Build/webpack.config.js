const config = require('./config');                         // Configuration settings
const path = require('path');                               // Path library used for building file locations
const fileSave = require('file-save');                      // Utility for writing files to disk
const webpack = require('webpack');			     // Webpack library
const VueLoaderPlugin = require('vue-loader/lib/plugin');   // Plugin used for loading single-component vue files
// Output the application settings file
if (config.appSettings != null) {
    // NOTE: the replace regex on the next line removes the quotes from properties.  It is rudimentary and can be removed 
    // if it causes issues (because the quotes are technically OK I just think they look bad).
    var appSettingsOutput = JSON.stringify(config.appSettings, null, 4).replace(/\"([^(\")"]+)\":/g, "$1:");
    fileSave(path.join(path.resolve(__dirname, "../../wwwroot/js"), "app-settings.js"))
        .write("window.appSettings = " + appSettingsOutput);
}
const webpathConfig = {
    mode: config.webpackMode,   // Specifies whether to use built-in optimizations accordingly (options: production | development | none)
    entry: "./App/main.js",     // Specifies the entry point of the application where webpack begins the packaging process.  
    output: {
        path: path.resolve(__dirname, "../../wwwroot/js"),  // Specifies the output directory for any wepback output files
        filename: "bundle.js",                              // Specifies the file name template for entry chunks (TODO: figure out what an entry point chunk is),
        publicPath: "/js/"                                  // Specifies the page-relative URL to prefix before assets to ensure they can be resolved by a browser.  (Notice this value is injected into index.html to refer to the bundle.js file created by webpack).
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'  // This is required to avoid the error 'You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.'
        }
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' },                                   // Specifies that files with the .vue extension should be processed by vue-loader which is what breaks up a single-file vue component into its constituent parts.
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015'] } },  // Specifies that .js files should be run through the babel-loader for ES2015 to ES5 conversion.
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },                // Specifies that CSS should be included in the bundle from .CSS files as well as processed from the <style> section of vue single-file vue component.	
            // ESLint rules
            {
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, "App")],
                options: {
                    eslintPath: path.join(__dirname, '../node_modules/eslint'),
                    fix: true,
                    formatter: require('eslint-friendly-formatter'),
                    emitError: false,
                    emitWarning: false,
                    failOnError: true,
                    failOnWarning: false
                }
            }
        ]
    },
    plugins: [
        ////////////////////////////////////////////////////////////////////////////////////////////
        // Required per manual configuration section of the Vue Loader configuration instructions 
        // located at https://vue-loader.vuejs.org/guide/#vue-cli
        ////////////////////////////////////////////////////////////////////////////////////////////
        new VueLoaderPlugin(),

        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
            'appSettings': "window.appSettings"
        }),
    ],
    watch: config.watch,                // Flag indicating whether webpack should monitor files and update bundles automatically with any changes
    watchOptions: {                     // Specifies watch options for the watching mechanism.
        ignored: ['node_modules']       // Specifies directories to ignore (optimization).
    }
};
module.exports = webpathConfig;