Ext.define('editpic.view.form.LabelForm', {
    extend: 'editpic.view.form.CanvasMenuBaseForm',
    title: "Label",
    border: true,
    /*defaults: {
     anchor: "100%",
     allowBlank: false
     },*/
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
        if (itype == 0 || itype == 1) {
            labelFormItems = [
                {
                    xtype: "checkboxfield", fieldLabel: "link database",
                    reference: "isLinkDataBase",
                    publishes: {
                        value: true
                    },
                    name: "isLinkDataBase",
                    hidden: itype == 1,
                    disabled: itype == 1
                },
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
                    xtype: "textfield", allowBlank: true, value: "null", name: "text", fieldLabel: "Text"
                },
                {
                    xtype: "textfield",
                    allowBlank: true,
                    value: "null",
                    name: "dynamictext",
                    fieldLabel: "Dynamic Text",
                    disabled: itype == 4,
                    hidden: itype == 4
                }
            ]
        }
        if (itype > 1) {
            var fontColorField = Ext.create("Ext.form.field.Text", {
                store: ["white", "blue", "red", "gray", "brown", "green", "black"],
                fieldLabel: 'Font Color',
                value: values.fontColor || "white",
                name: "fontColor",
                listeners: {
                    focus: "colorPickerFocus"
                }
            })
            labelFormItems.push(fontColorField)
            if (itype == 3) {
                labelFormItems.push({
                    fieldLabel: "alias", xtype: "textfield", name: "aliasName", allowBlank: true,
                    value: values.aliasName
                })
                labelFormItems.push({
                    fieldLabel: "show filename",
                    xtype: "checkboxfield",
                    name: "showFilename",
                    inputValue: true,
                    value: values.showFilename
                })
            }
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
                                        editable: false,
                                        listeners: {
                                            change: function (field, newValue) {
                                                var name = field.name;
                                                values[name] = newValue
                                            }
                                        }
                                    },
                                    padding: 10,
                                    items: [
                                        {
                                            fieldLabel: "font style",
                                            name: "fontStyle",
                                            xtype: "combo",
                                            store: ["normal", "italic", "oblique"],
                                            value: values.fontStyle || "normal"
                                        }, {
                                            fieldLabel: "font variant",
                                            name: "fontVariant",
                                            xtype: "hiddenfield",
                                            value: values.fontVariant || "normal"
                                        }, {
                                            fieldLabel: "font weight",
                                            name: "fontWeight",
                                            xtype: "combo",
                                            store: ["normal", "bold", "bolder", "lighter", 100, 200, 300, 400, 500, 600, 700, 800, 900],
                                            value: values.fontWeight || "normal"
                                        }, {
                                            fieldLabel: "font size",
                                            name: "fontSize",
                                            xtype: "numberfield",
                                            minValue: 1,
                                            value: values.fontSize || 15
                                        }, {
                                            fieldLabel: "font family",
                                            name: "fontFamily",
                                            xtype: "combo",
                                            editable: true,
                                            store: ["normal", "times", "courier", "arial", "serif", "sans-serif", "cursive", "fantasy", "monospace"],
                                            value: values.fontFamily || "normal"
                                        }
                                    ]
                                },
                                buttons: [
                                    {
                                        text: "OK", handler: function () {
                                        console.log(values)
                                        var form = win.getComponent("fontForm")
                                        var fontJson = form.getForm().getValues();
                                        var style = fontJson['fontStyle']
                                        var variant = fontJson['fontVariant']
                                        var weight = fontJson['fontWeight']
                                        var size = fontJson['fontSize']
                                        var family = fontJson['fontFamily']
                                        var fontStr = style + " " + variant + " " + weight + " " + size + "px " + family;
                                        field.setValue(fontStr);
                                        //Ext.apply(values,fontJson);
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
                name: "fontPostion",
                fieldLabel: "font postion",
                xtype: "slider",
                minValue: 0,
                configName: "mySetFontPosition",
                maxValue: values.height,
                bind: {maxValue: "{height.value}"},
                value: values.fontPostion || values.height / 2 - 10,
                listeners: {
                    values: values,
                    change: function (field, newValue) {
                        values.mySetFontPosition(newValue)
                    }
                }
            })
            labelFormItems.push({
                name: "boxShadow", fieldLabel: "shadow", allowBlank: true, xtype: "textfield",
                listeners: {
                    focus: function (field) {

                        var win = Ext.create("Ext.window.Window", {
                            autoShow: true,
                            width: 400,
                            modal: true,
                            controller:me.controller,
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
                                        xtype: 'textfield',
                                        value: "#FFFFFF",
                                        editable:true,
                                        listeners: {
                                            focus:"colorPickerFocus"
                                        }
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
            labelFormItems.push(
                {
                    xtype: "textfield", allowBlank: true, name: "background", fieldLabel: "background",
                    listeners: {
                        focus: function (field) {
                            var colorfield = Ext.create("Ext.ux.colorpick.Field", {
                                itemId: "backgroundColor",
                                name: "backgroundColor",
                                fieldLabel: "Background Color"
                            })

                            var win = Ext.create("Ext.window.Window", {
                                autoShow: true,
                                width: 400,
                                modal: false,
                                title: "set background",
                                controller: me.controller,
                                items: {
                                    xtype: "form",
                                    itemId: "form",
                                    defaults: {
                                        width: "100%",
                                        editable: false,
                                        allwoBlank: false
                                    },
                                    padding: 10,
                                    items: [

                                        Ext.create("Ext.form.field.ComboBox", {
                                            store: ["white", "blue", "red", "gray", "brown", "green", "black"],
                                            fieldLabel: "Background Color",
                                            name: "backgroundColor",
                                            value: values.backgroundColor || "",
                                            listeners: {
                                                focus:"colorPickerFocus",
                                                change: function (field, newValue) {
                                                    values.backgroundColor = newValue
                                                }
                                            }
                                        }),
                                        {
                                            xtype: "textfield", name: "backgroundImage", fieldLabel: "Background Image",
                                            emptyText: "Please drag the image here.",
                                            value: values.backgroundImage,
                                            listeners: {
                                                render: "dragImageSetUrl",
                                                change: function (field, newValue) {
                                                    values.backgroundImage = newValue
                                                }
                                            }
                                        }

                                    ]
                                },
                                buttons: [
                                    {
                                        text: "OK", handler: function () {
                                        var form = win.getComponent("form");
                                        var oJson = form.getForm().getValues();
                                        var color = oJson["backgroundColor"];
                                        var backgroundImage = oJson['backgroundImage'];
                                        //color = Ext.ux.colorpick.ColorUtils.getRGBAString(color);
                                        //console.log(color)
                                        values.setBackground(oJson);
                                        var backgroundStr = color + " url(" + backgroundImage + ")  no-repeat  scroll  center";
                                        field.setValue(backgroundStr);
                                        win.close();
                                    }
                                    }, {
                                        text: "Cancel", handler: function () {
                                            win.close()
                                        }
                                    }
                                ]
                            })
                            colorfield.setColor("rgba(0,0,0,1)");
                        }
                    }
                }
            )
        }


        labelFormItems.unshift({
            xtype: "textfield", allowBlank: true,
            fieldLabel: "name", name: "name"
        })

        var publicItems = [
            {
                xtype: "hiddenfield",
                name: "itype"
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
                name: "width", fieldLabel: "width",itemId:"width", configName: "mySetWidth", xtype: 'numberfield',
                step: 1,
                minValue: 1,
                listeners: {
                    values: values,
                    change: "mySetConfig"
                }
            },
            {
                name: "height",
                fieldLabel: "height",
                configName: "mySetHeight",
                xtype: 'numberfield',
                itemId:"height",
                step: 1,
                minValue: 1,
                reference: "height",
                publishes: [
                    "value"
                ],
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
            /*{
             xtype: 'colorfield',
             fieldLabel: 'background color',
             value: values.myGetBackgroundColor(),
             hidden: !values.body & itype > 1,
             disabled: !values.body & itype > 1,
             name: "backgroundColor",
             listeners: {
             change: function (field, color, previousColor, eOpts) {
             if (field.color) {
             values.mySetBackgroundColor(field.getColor())
             }
             }
             }
             },*/
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
        boxready: "boxready"

    }
});
