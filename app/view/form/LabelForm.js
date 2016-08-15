Ext.define('editpic.view.form.LabelForm', {
    extend: 'editpic.view.form.CanvasMenuBaseForm',
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
                    xtype: "textfield", allowBlank: true,
                    fieldLabel: "name", name: "name"
                }
            ];

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
                    xtype: "checkboxfield", fieldLabel: "link database",
                    reference: "isLinkDataBase",
                    publishes: {
                        value: true
                    },
                    name: "isLinkDataBase",
                    hidden: itype == 1,
                    disabled: itype == 1,
                    /*listeners:{
                     change:function(field,bol){
                     var win =  me.up();
                     var isBindComponent = win.query("[name=isBind]")[0];
                     isBindComponent.setDisabled(!bol)
                     }
                     }*/
                },
                /* {
                 xtype: "hiddenfield", name: "isLinkDataBase", disabled: itype == 1,
                 bind: {
                 value: "{isLinkDataBase.checked}"
                 }
                 },*/
                {
                    xtype: "numberfield",
                    allowBlank: true,
                    configName: "setRotate",
                    name: "rotate",
                    fieldLabel: "ratate",
                    minValue: 0,
                    maxValue: 360,
                    value: 0,
                    listeners: {
                        values: values,
                        change: "mySetConfig"
                    }
                },
                {
                    xtype: "textfield", allowBlank: true, name: "src", fieldLabel: "Image",
                    listeners: {
                        render: "dragImageSetUrl"
                    }
                },
                {
                    xtype: "textfield",
                    name: "dynamicSrc", allowBlank: true, fieldLabel: "Dynamic Image",
                    /*bind: {
                     disabled: "{!ImageType.value}",
                     hidden: "{!ImageType.value}"
                     },*/
                    hidden: values.itype == 0,
                    disabled: values.itype == 0,
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
        if (itype == 4 || itype == 5) {
            labelFormItems = [
                {
                    xtype: "textfield", allowBlank: false, value: "null", name: "text", fieldLabel: "Text"
                },
                {
                    xtype: "textfield",
                    allowBlank: false,
                    value: "null",
                    name: "dynamictext",
                    fieldLabel: "Dynamic Text",
                    disabled: itype == 4,
                    hidden: itype == 4
                },
                {
                    xtype: 'colorfield',
                    fieldLabel: 'Font Color',
                    value: values.getFontColor(),
                    name: "fontColor",
                    listeners: {
                        change: function (field, color) {
                            values.setFontColor("#" + color);
                        }
                    }
                }
            ]
        }
        if (itype > 1) {
            labelFormItems.push(
                {
                    name: "font", fieldLabel: "font", allowBlank: true, xtype: "textfield",
                    listeners: {
                        focus: function (field) {
                            var win = Ext.create("Ext.window.Window", {
                                autoShow: true,
                                width: 400,
                                modal: true,
                                title: "set font",
                                items: {
                                    xtype: "form",
                                    reference: "fontForm",
                                    itemId: "fontForm",
                                    defaults: {
                                        width: "100%",
                                        editable: false
                                    },
                                    padding: 10,
                                    items: [
                                        {
                                            fieldLabel: "font style",
                                            name: "font_style",
                                            xtype: "combo",
                                            store: ["normal", "italic", "oblique"],
                                            value: "normal"
                                        }, {
                                            fieldLabel: "font variant",
                                            name: "font_variant",
                                            xtype: "hiddenfield",
                                            value: "normal"
                                        }, {
                                            fieldLabel: "font weight",
                                            name: "font_weight",
                                            xtype: "combo",
                                            store: ["normal", "bold", "bolder", "lighter", 100, 200, 300, 400, 500, 600, 700, 800, 900],
                                            value: "normal"
                                        }, {
                                            fieldLabel: "font size",
                                            name: "font_size",
                                            xtype: "numberfield",
                                            minValue: 1,
                                            value: 15
                                        }, {
                                            fieldLabel: "font family",
                                            name: "font_family",
                                            xtype: "combo",
                                            editable: true,
                                            store: ["normal", "times", "courier", "arial", "serif", "sans-serif", "cursive", "fantasy", "monospace"],
                                            value: "normal"
                                        }
                                    ]
                                },
                                buttons: [
                                    {
                                        text: "OK", handler: function () {
                                        var form = win.getComponent("fontForm")
                                        var fontJson = form.getForm().getValues();
                                        var style = fontJson['font_style']
                                        var variant = fontJson['font_variant']
                                        var weight = fontJson['font_weight']
                                        var size = fontJson['font_size']
                                        var family = fontJson['font_family']
                                        var fontStr = style + " " + variant + " " + weight + " " + size + "px " + family;
                                        field.setValue(fontStr);
                                        win.close()
                                    }
                                    }, {
                                        text: "Cancel", handler: function () {
                                            win.close()
                                        }
                                    }
                                ]
                            })
                        }
                    }
                }
            )
            labelFormItems.push({
                name: "boxShadow", fieldLabel: "shadow", allowBlank: true, xtype: "textfield",
                listeners: {
                    focus: function (field) {

                        var win = Ext.create("Ext.window.Window", {
                            autoShow: true,
                            width: 400,
                            modal: true,
                            title: "set shadow",
                            items: {
                                xtype: "form",
                                itemId: "shadowForm",
                                defaults: {
                                    width: "100%",
                                    editable: false,
                                    allwoBlank: false
                                },
                                padding: 10,
                                items: [
                                    {
                                        xtype: "numberfield", name: "hShadow", fieldLabel: "x",
                                        value: 1
                                    },
                                    {
                                        xtype: "numberfield", name: "vShadow", fieldLabel: "y",
                                        value: 1
                                    },
                                    {
                                        xtype: "numberfield", name: "blur", fieldLabel: "blur",
                                        value: 1
                                    },
                                    {
                                        fieldLabel: "shadow color",
                                        name: "shadowColor",
                                        xtype: 'colorfield',
                                        value: "#FFFFFF"
                                    }
                                ]
                            },
                            buttons: [
                                {
                                    text: "OK", handler: function () {
                                    var form = win.getComponent("shadowForm")
                                    var oJson = form.getForm().getValues();
                                    var hShadow = oJson['hShadow']
                                    var vShadow = oJson['vShadow']
                                    var blur = oJson['blur']
                                    var shadowColor = oJson['shadowColor']
                                    var resStr = hShadow + "px " + vShadow + "px " + blur + "px " + "#" + shadowColor
                                    field.setValue(resStr);
                                    win.close()
                                }
                                }, {
                                    text: "Cancel", handler: function () {
                                        win.close()
                                    }
                                }
                            ]
                        })

                    }
                }
            })
            /*labelFormItems.push(
                {
                    xtype: "textfield", allowBlank: true, name: "src", fieldLabel: "background image",
                    listeners: {
                        render: "dragImageSetUrl"
                    }
                }
            )*/
        }

        var publicItems = [
            {
                xtype: "hiddenfield",
                name: "itype",
            },
            {
                name: "x", fieldLabel: "x", configName: "mySetX", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values: values,
                    change: "mySetConfig"
                }
            },
            {
                name: "y", fieldLabel: "y", configName: "mySetY", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values: values,
                    change: "mySetConfig"
                }
            },
            {
                name: "width", fieldLabel: "width", configName: "mySetWidth", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values: values,
                    change: "mySetConfig"
                }
            },
            {
                name: "height", fieldLabel: "height", configName: "mySetHeight", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values: values,
                    change: "mySetConfig"
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
                disabled: true,
                listeners: {
                    change: "mySetConfig"
                }
            },
            {
                xtype: 'colorfield',
                fieldLabel: 'background color',
                value: values.myGetBackgroundColor(),
                hidden: !values.body,
                disabled: !values.body,
                name: "backgroundColor",
                listeners: {
                    change: function (field, color, previousColor, eOpts) {
                        if (field.color) {
                            values.mySetBackgroundColor(field.getColor())
                        }
                    }
                }
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

    },
    listeners: {
        boxready: "boxready",

    }
});
