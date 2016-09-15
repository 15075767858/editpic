Ext.define('editpic.view.panel.SetAPicPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel-setapicpanel',
    checkedHandler: function (field, checked) {
        var numberField = field.up().getComponent("checkfield");
        if (checked) {
            numberField.setConfig("step", 1)
        } else {
            numberField.setConfig("step", 10)
        }

    },
    relatedCheckHandler:function(field, checked){
        var record =  field.up().getRecord()
        record.data.setRelated(checked);

    }
    
});
