Ext.define('editpic.view.EventAlarm.ListenGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventalarm-listengrid',
    itemcontextmenu: function (grid, record, item, index, e, eOpts) {
        e.stopEvent();
        var __this = this;
        Ext.create("Ext.menu.Menu", {
                //floating: true,
                autoShow: true,
                x: e.pageX + 5,
                y: e.pageY + 5,
                items: [
                    {
                        text: "OK",
                        handler: function () {
                            __this.alarmOk(grid, record, item, index, e, eOpts);
                        }
                    },
                    {
                        text: "hold",

                        handler: function () {
                            __this.hold(grid, record, item, index, e, eOpts);
                        }
                    }
                ]
            }
        )
    },
    setTrClass: function (item, style) {
        var tr = item.querySelector('tr')
        tr.className = tr.className.split(' ').map(function (v, index) {
            if (v == "alarm" || v == "hold" || v == "normal") {
                return style;
            }
            return v;
        }).join(" ")
    },
    alarmOk: function (grid, record, item, index, e, eOpts) {
        this.setTrClass(item, "alarm");
        record.setStatusNormal(function () {
            console.log(arguments)
        })
    },
    hold: function (grid, record, item, index, e, eOpts) {
        this.setTrClass(item, "hold");
        record.setStatusHold(function () {
            console.log(arguments)
        })
    },
    printSetting: function () {
        var __this = this;
        console.log(__this.view.viewModel)
        var win = Ext.create("Ext.window.Window", {
            title: "Print Setting",
            viewModel: __this.view.viewModel,
            icon: EventRootUrl + "graph/resources/icons/print_24px.png",
            autoShow: true,
            width: 400,
            bodyPadding: 10,
            items: {
                xtype: "form",
                items: [{
                    xtype: "fieldset",
                    title: "Print Number",
                    defaultType: 'radiofield',
                    items: [
                        {
                            boxLabel: '1',
                            name: 'number',
                            inputValue: '1',
                            bind: "{number}"
                        }, {
                            boxLabel: '10',
                            name: 'number',
                            inputValue: '10',
                            bind: "{number}"
                        }
                    ]
                }, {
                    xtype: "fieldset",
                    title: "print model",
                    fieldLabel: 'Size',
                    defaultType: 'radiofield',
                    items: [
                        {
                            boxLabel: 'generate pdf',
                            name: 'mode',
                            inputValue: 'pdf',
                        }, {
                            boxLabel: 'printer',
                            name: 'mode',
                            inputValue: 'print',
                        }
                    ]
                }],
                listeners: {
                    boxready: function (form) {

                        var m = Ext.createByAlias("PrintSettingModel")
                        m.loadPrintSettingData(function () {
                            form.loadRecord(m)
                        })
                    }
                },
            },
            buttons: [
                {
                    text: "Ok", handler: function () {
                    var values = win.down("form").getValues()
                    var m = Ext.createByAlias("PrintSettingModel", {
                            number: values.number,
                            mode: values.mode
                        }
                    )
                    m.savePrintSettingData(function (v) {
                        if (isNaN(v)) {
                            Ext.Msg.alert("Massage", v)
                        } else {
                            My.delayToast("Massage", "Save Ok " + v)
                        }
                        console.log(arguments)
                    })
                }
                }, {
                    text: "Close", handler: function () {

                    }
                }
            ]
        })
    }
});
