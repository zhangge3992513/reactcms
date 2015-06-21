/** @jsx React.DOM */

var React = React || require('react/addons');
var HtmlInput = require('reactlet-html-input');
var HtmlSelect = require('reactlet-html-select');

// HtmlInput component
var HtmlInput = React.createClass({
    name: 'html-form',
    mixins: [getCommonMixin],
    components: {
        HtmlInput: React.createFactory(HtmlInput),
        HtmlSelect: React.createFactory(HtmlSelect)
    },
    
    // attribute definitions
    getAttributes: function() {
        var attributes = [
            { name:'name', type:'string', required:false, defaultValue:'', note:'form name' },
            { name:'dispatcher', type:'object', required:false, defaultValue:null, note:'flux dispatcher' },
            { name:'boxClass', type:'string', required:false, defaultValue:'', note:'container CSS class' },
            { name:'fields', type:'array', required:false, defaultValue:'', note:'html form fields' },
            { name:'action', type:'string', required:false, defaultValue:'', note:'form url' },
            { name:'method', type:'string', required:false, defaultValue:'POST', note:'form method' }
        ];
        return attributes;
    },
    
    getValue: function() {
        var result = {};
        for (var i = 0; i < this.state.fieldComponents.length; i++ ) {
            var fieldComponent = this.state.fieldComponents[i];
            var fieldName = fieldComponent.key;
            var field = this.refs[fieldName];
            result[fieldName] = field.getValue();
        }
        return result;
    },
    
    onChange: function(event) {
        var newValue = event.target.value;
        this.setState({ value: newValue });
        this.fire('change', [newValue]);
    },
    
    render: function() {
        // set content display
        var fields = [];
        for (var i = 0; i < this.state.fields.length; i++) {
            var field = this.state.fields[i];
            // pass form's layout property to components
            field.data.layout = this.state.layout;
            // add field component to fields array
            fields.push( this.components[field.type]({
                key: field.data.name,
                ref: field.data.name,
                data:field.data
            }) );
        }
        this.state.fieldComponents = fields;
        // construct form content
        var content = 
            <div className="html-form-content-container" >
                <form action={ this.state.action } method={ this.state.method } >
                    { fields }
                </form>
            </div>;
        return (
            <div className={ this.state.containerClassNames.join(' ') }  >
                { content }
            </div>
        );
    }
});

module.exports = HtmlInput;
