const path = require('path')

module.exports = {
    mode: 'production',
    entry: './public/js/app.js',
    output: {
        filename: 'final.js',
        path: path.resolve(__dirname,'./src')
    }
}