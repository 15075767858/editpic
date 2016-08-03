Ext.define('editpic.view.window.CanvasConponmentWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.window.CanvasConponmentWindowController',
        'editpic.view.window.CanvasConponmentWindowModel'
    ],

    controller: 'window-canvasconponmentwindow',
    viewModel: {
        type: 'window-canvasconponmentwindow'
    },
    title: "Propertys",
    autoShow: true,
    initComponent: function () {
        var me = this;
        var values = me.values;
        var itype = values.itype;

        me.labelFormPanel = Ext.create("editpic.view.form.LabelForm", {
            values: values,
            itype: itype
        })

        me.bindFormPanel = Ext.create("editpic.view.form.LinkPropertyForm",
            {
                values: me.values
            }
        )

        me.bindFormPanel.getForm().setValues(me.values)

        me.items = [me.labelFormPanel, me.bindFormPanel];


        me.buttons = [
            {
                text: "OK", handler: function () {

                var labelForm = me.labelFormPanel.getForm();
                var bindForm = me.bindFormPanel.getForm();

                if (labelForm.isValid()) {
                    var bindValues = bindForm.getValues()
                    console.log(bindValues)
                    var datas = labelForm.getValues();
                    me.ok(Ext.apply(datas, bindValues));
                    me.close()
                }
            }
            },
            {
                text: "Cancel", handler: function () {

                me.close()
            }
            }
        ]
        me.callParent();
    }
});
