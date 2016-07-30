Ext.define('editpic.view.window.ImgPanelMenuFormWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'editpic.view.window.ImgPanelMenuFormWindowController',
        'editpic.view.window.ImgPanelMenuFormWindowModel'
    ],

    controller: 'window-imgpanelmenuformwindow',
    viewModel: {
        type: 'window-imgpanelmenuformwindow'
    },
    title: "Propertys",
    autoShow: true,
    //layout: "fit",
    initComponent: function () {
        var me = this;
        console.log(me)
        me.labelFormPanel = Ext.create("Ext.form.Panel", {
                width: 400,
                height: "100",
                margin: 10,
                title: "Label",
                border: true,
                defaults: {
                    anchor: "100%",
                    allowBlank: false
                },
                items: [
                    {
                        xtype: "textfield", allowBlank: true,
                        fieldLabel: "name", name: "name"
                    },
                    {
                        xtype: "combo", fieldLabel: "Image Type",
                        name: "itype", allowBlank: true,
                        store: Ext.create("Ext.data.Store", {
                            fields: ["name", "value"],
                            data: [
                                {name: "static Image", value: 0},
                                {name: "Dynamic Image", value: 1}
                            ]
                        }),
                        editable: false,
                        value: 0,
                        displayField: 'name',
                        valueField: 'value',
                        reference: "ImageType",
                        publishes: [
                            "value"
                        ]
                    },
                    {
                        xtype: "textfield", name: "src", fieldLabel: "Image",
                        listeners: {
                            render: "dragImageSetUrl"
                        }
                    },
                    {
                        xtype: "textfield",
                        name: "dynamicSrc", fieldLabel: "Dynamic Image",
                        bind: {
                            disabled: "{!ImageType.value}",
                            hidden: "{!ImageType.value}"
                        },
                        editable: true,
                        emptyText: "Please drag the image here.",
                        displayField: "text",
                        valueField: "src",
                        listeners: {
                            render: "dragImageSetUrl"
                        }
                    },
                    {
                        name: "x", fieldLabel: "x", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "y", fieldLabel: "y", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "width", fieldLabel: "width", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    },
                    {
                        name: "height", fieldLabel: "height", xtype: 'numberfield',
                        step: 10,
                        minValue: 0
                    }
                ]
            }
        )

        me.bindFormPanel = Ext.create("editpic.view.form.LinkPropertyForm", {})

        me.items = [me.labelFormPanel, me.bindFormPanel];

        me.labelFormPanel.getForm().setValues(me.values)
        me.bindFormPanel.getForm().setValues(me.values)

        me.buttons = [
            {
                text: "OK", handler: function () {

                var labelForm = me.labelFormPanel.getForm();
                var bindForm = me.bindFormPanel.getForm();

                if (labelForm.isValid()) {
                    var bindValues = bindForm.getValues()

                    var datas = labelForm.getValues();
                    console.log(datas)

                    me.ok(Ext.apply(datas,bindValues));

                    me.close()
                }

                //if(bindForm.isValid()){

                //}

            }
            },
            {
                text: "Cancel", handler: function () {
                me.close()
            }
            }
        ]
        me.callParent();
    },
    listeners: {
        destroy: function () {
            var me = this;
            me.cancel()
        }
    }
});
