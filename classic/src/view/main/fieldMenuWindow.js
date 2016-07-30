Ext.define('editpic.view.window.FieldMenuWindow',
    {
        extend: 'Ext.window.Window',
        title: "Propertys",

        autoShow: true,
        requires: [
            'editpic.view.window.FieldMenuWindowController',
            'editpic.view.window.FieldMenuWindowModel'
        ],

        controller: 'window-fieldmenuwindow',
        viewModel: {
            type: 'window-fieldmenuwindow'
        },

        initComponent: function () {
            var me = this;
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
                            xtype: "hiddenfield", name: "itype"
                        },
                        {
                            xtype: "textfield", allowBlank: true,
                            fieldLabel: "name", name: "name"
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


            console.log(me.values)
            if (me.values.itype == 3) {
                me.bindFormPanel = Ext.create("editpic.view.form.LinkPropertyForm", {
                    items: [
                        {
                            xtype: 'checkbox',
                            fieldLabel: "bind",
                            name: 'isBind',
                            hidden: false,
                            reference: "isBind"

                        },
                        {
                            xtype: "combo",
                            bind: {
                                hidden: "{!isBind.checked}",
                                disabled: "{!isBind.checked}"
                            },
                            //flex: 2,
                            store: My.getImageNames(),
                            fieldLabel: "Type",
                            editable: false,
                            name: "linkValue",
                        }
                    ]
                })
            }
            if(me.values.itype==2){
            me.bindFormPanel = Ext.create("editpic.view.form.LinkPropertyForm")
            }

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
    }
)