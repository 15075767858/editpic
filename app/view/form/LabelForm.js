Ext.define('editpic.view.form.LabelForm', {
    extend: 'editpic.view.form.CanvasMenuBaseForm',
    width: 400,
    margin: 10,
    title: "Label",
    border: true,
    defaults: {
        anchor: "100%",
        allowBlank: false
    },
    /* requires: [
     'editpic.view.form.CanvasMenuBaseFormController',
     'editpic.view.form.CanvasMenuBaseFormModel'
     ],

     controller: 'form-canvasmenubaseform',
     viewModel: {
     type: 'form-canvasmenubaseform'
     },
     */
    initComponent: function () {
        var me = this;

        var values = me.values;
        var itype = values.itype;
        var labelFormItems = [];

        if (itype == 2 || itype == 3) {
            labelFormItems = [
                {
                    xtype: "hiddenfield", name: "itype"
                },
                {
                    xtype: "textfield", allowBlank: true,
                    fieldLabel: "name", name: "name"
                }
            ]
        }

        if (itype == 0 || itype == 1) {
            labelFormItems = [
                {
                    xtype: "textfield", allowBlank: true,
                    fieldLabel: "name", name: "name"
                },
                /*{
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
                },*/
                {
                    xtype:"hiddenfield",
                    name:"itype",

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
                    /*bind: {
                        disabled: "{!ImageType.value}",
                        hidden: "{!ImageType.value}"
                    },*/
                    hidden:values.itype==0,
                    disabled:values.itype==0,
                    editable: true,
                    emptyText: "Please drag the image here.",
                    displayField: "text",
                    valueField: "src",
                    listeners: {
                        render: "dragImageSetUrl"
                    }
                }
            ]
        }


        var publicItems = [{
            name: "x", fieldLabel: "x", configName: "mySetX", xtype: 'numberfield',
            step: 1,
            minValue: 1,
            listeners: {
                values:values,
                change: "mySetConfig"
            }
        },
            {
                name: "y", fieldLabel: "y", configName: "mySetY", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values:values,
                    change: "mySetConfig"
                }
            },
            {
                name: "width", fieldLabel: "width", configName: "mySetWidth", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values:values,
                    change: "mySetConfig"
                }
            },
            {
                name: "height", fieldLabel: "height", configName: "mySetHeight", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values:values,
                    change:"mySetConfig"
                }
            },
            {
                scope: me,
                name: "disabled",
                configName: "disabled",
                fieldLabel: "enabled",
                xtype: "combo",
                store: [false, true],
                allowBlank: true,
                disabled:true,
                listeners: {
                    change: "mySetConfig"
                }
            },
            {
                name: "background", fieldLabel: "background", xtype: "textfield",
                step: 2,
                minValue: 0,
                value: 0,
                disabled: true

            },
            {
                name: "font", fieldLabel: "font", xtype: "textfield",
                step: 2,
                minValue: 0,
                value: 0,
                disabled: true

            },
            {
                name: "blink", fieldLabel: "blink", xtype: "textfield",
                step: 2,
                minValue: 0,
                value: 0,
                disabled: true

            },
            {
                name: "halign", fieldLabel: "halign", xtype: "textfield",
                step: 2,
                minValue: 0,
                value: 0,
                disabled: true
            },
            {
                name: "zindex", fieldLabel: "layer",
                allowBlank: true, xtype: "numberfield",
                step: 2,
                minValue: 0,
                listeners: {
                    change: function (field, newValue) {
                        if (!newValue) {
                            return;
                        }
                        me.values.mySetZIndex(newValue)
                    }
                }
            }
        ]
        for (var i = 0; i < publicItems.length; i++) {
            labelFormItems.push(publicItems[i])
        }
        me.items = labelFormItems;

        me.callParent()
        var form = me.getForm()
        if (form) {
            form.setValues(me.values)
        }

    }
});
