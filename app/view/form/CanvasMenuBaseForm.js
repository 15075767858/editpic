
Ext.define('editpic.view.form.CanvasMenuBaseForm',{
    extend: 'Ext.form.Panel',

    requires: [
        'editpic.view.form.CanvasMenuBaseFormController',
        //'editpic.view.form.CanvasMenuBaseFormModel'
    ],

    controller: 'form-canvasmenubaseform',
    /*viewModel: {
        type: 'form-canvasmenubaseform'
    },*/

    width: 400,
    margin: 10,
    title: "Label",
    border: true,
    defaults: {
        anchor: "100%",
        allowBlank: false
    },
    initComponent:function(){
        var me=this;

        var values = me.values;
        me.callParent()
    }

});
