var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {
    
    var moduleName = 'layout';
    var block = {
        app: app,
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    
    block.model = {
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        filename: {
            type: 'string'
        },
        data: {
            type: 'object',
            subtype: {
                type: 'json'
            }
        },
        status: {
            type: 'string',
            values: ['active', 'inactive']
        },
        create_date: {
            type: 'date'
        },
        create_by: {
            type: 'string'
        },
        edit_date: {
            type: 'date'
        },
        edit_by: {
            type: 'string'
        }
    };
    
    // page route
    app.server.all('/layout', block.page.checkLogin);
    app.server.all('/layout/*', block.page.checkLogin);
    app.server.get('/layout', block.page.getIndex);

    return block;
};

