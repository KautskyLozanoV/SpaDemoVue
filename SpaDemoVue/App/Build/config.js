const configuration = {
    // Application settings that can be configured from one environment to the next.  These 
    // are output to the app-settings.js file that is then referenced as a plugin within 
    // webpack so they can be changed manually if needed.
    appSettings: {
        settingA: 5,
        settingB: 10
    },
    // Identifies the type of build that has been requested.  Primarily used to vary 
    // settings for different types of builds.
    buildTarget: process.env.NODE_ENV || 'development',
    // Specifies whether webpack should watch for changes on the file system and 
    // automatically repack bundles when changes occur.
    watch: false,
    // Specifies the webpack mode
    webpackMode: 'development'
};
/*******************************************************************************
 * Define watch-only settings
 ******************************************************************************/
if (configuration.buildTarget === 'watch') {
    configuration.watch = true;
}
/*******************************************************************************
 * Define production-only settings
 ******************************************************************************/
if (configuration.buildTarget === 'production') {
    // Define production-only settings
    configuration.webpackMode = 'production';
}
//Export the configuration
module.exports = configuration;