Ext.define('editpic.view.img.TextFieldTool',
    {
        //extend: 'editpic.view.img.Base',
        extend: "editpic.view.img.BaseTool",
        requires: [
            'editpic.view.img.TextFieldToolController',
            'editpic.view.img.TextFieldToolModel'
        ],
        controller: 'img-textfieldtool',
        viewModel: {
            type: 'img-textfieldtool'
        },
        initComponent: function () {
            var me = this;

            var textfield = Ext.create("Ext.form.field.Text", {})

            me.items = textfield;
            me.field = textfield;
            me.callParent()
        },

        refreshCanvas: function () {
            var me = this;
            me.field.setValue(me.getLinkValue())
        }
    }
);
