module.exports = {
    configureWebpack: config => {

        let externals = config.externals;

        delete externals["vue"];

        config.externals = externals
    }
}