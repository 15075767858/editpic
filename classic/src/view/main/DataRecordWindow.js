Ext.define('graph.view.window.DataRecordWindow', {
    extend: 'Ext.window.Window',
    alias: "DataRecordWindow",
    requires: [
        'graph.view.window.DataRecordWindowController',
        'graph.view.window.DataRecordWindowModel',
        'Ext.ux.ProgressBarPager',
    ],

    controller: 'window-datarecordwindow',
    viewModel: {
        type: 'window-datarecordwindow'
    },
    height: 500,
    width: 700,
    title: "Data Record",
    autoShow: true,
    layout: "border",
    initComponent: function () {
        var me = this;
        var IPCombo = Ext.create("Ext.form.field.ComboBox", {
            fieldLabel: "Sources IP",
            store: ['127.0.0.1', window.location.hostname, "192.168.253.253"],
            labelWidth: 70,
            maxWidth: 300,
            value: "127.0.0.1"
            //value: location.hostname
        });
        var PortCombo = Ext.create("Ext.form.field.ComboBox", {
            fieldLabel: "port number",
            store: ["6379"],
            value: "6379"
        });
        var formPanel = Ext.create("Ext.form.Panel", {
            region: "north",
            items: {
                xtype: "fieldset",
                title: "link option",
                layout: "hbox",
                defaults: {
                    margin: 10
                },
                items: [
                    IPCombo, PortCombo,
                    {
                        xtype: "button",
                        text: "link",
                        handler: function () {
                            var treeStore = Ext.create("Ext.data.TreeStore", {
                                fields: ["text"],
                                proxy: {
                                    type: "ajax",
                                    autoLoad: true,
                                    url: "resources/globalTree.php?ip=" + IPCombo.value + "&port=" + PortCombo.value,
                                    reader: {
                                        type: "json"
                                    }
                                },
                                root: {
                                    text: "root"
                                }
                            })

                            treePanel.setStore(treeStore);
                        }
                    }
                ]
            }
        })
        var treePanel = Ext.create("Ext.tree.Panel", {
            region: "center",
            useArrows: true,
            animate: true,
            checkPropagation: "down",
            rootVisible: false,
            bufferedRenderer: false,
            listeners: {
                checkchange: function (node, checked, e, eOpts) {
                    checkNode(node, checked)

                    function checkNode(node, checked) {
                        var childNodes = node.childNodes;
                        if (childNodes.length > 0) {
                            for (var i = 0; i < childNodes.length; i++) {
                                childNodes[i].set("checked", checked)
                                if (childNodes[i].childNodes.length > 0) {
                                    checkNode(childNodes[i], checked);
                                }
                            }
                        }
                    }
                    console.log(arguments)
                }
            },
            getSelectPoints: function () {
                var me = this;
                var checkeds = me.getChecked();
                var keysArr = [];
                for (var i = 0; i < checkeds.length; i++) {
                    if (checkeds[i].data.depth == 4) {
                        keysArr.push(checkeds[i].data.key)
                    }
                }
                return keysArr;
            },
            tbar: [{
                text: 'Expand All',
                scope: this,
                handler: function (th) {
                    treePanel.expandAll()
                }
            }, {
                text: 'Collapse All',
                scope: this,
                handler: function (th) {
                    treePanel.collapseAll()
                }
            }, "->", {
                text: "config filter point",
                handler: function () {
                    Ext.create("FilterPointWindow", {
                        callback: function (res) {
                            //Ext.Msg.alert("Info","Ok");
                        }
                    })
                }
            }, {
                text: "config database",
                handler: function () {
                    var win = Ext.create("Ext.window.Window", {
                        title: "Config database .",
                        autoShow: true,
                        width: 300,
                        resizeable: false,
                        items: [{
                            xtype: "form",
                            defaults: {
                                margin: 10,
                                allowBlank: false
                            },
                            items: [{
                                    xtype: "textfield",
                                    fieldLabel: "Database host",
                                    name: "host",
                                    value: "127.0.0.1"
                                },
                                {
                                    xtype: "textfield",
                                    fieldLabel: "username",
                                    name: "username",
                                    value: "root"
                                },
                                {
                                    xtype: "textfield",
                                    fieldLabel: "password",
                                    name: "password",
                                    inputType: "password",
                                    value: "root"
                                },
                                {
                                    xtype: "textfield",
                                    fieldLabel: "Database name",
                                    name: "databasename",
                                    value: "smartio_db"
                                }, {
                                    xtype: "button",
                                    text: "create ",
                                    handler: function () {
                                        var form = this.up("form");
                                        form.submit({
                                            url: "/php/mysqlInit.php?par=createTable",
                                            success: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            }
                                        })
                                    }
                                }
                            ],
                            listeners: {
                                boxready: function (form) {
                                    Ext.Ajax.request({
                                        url: "/php/mysqlInit.php?par=getConfig",
                                        success: function (response) {
                                            var xml = $(response.responseText);
                                            var host = xml.find("host").text()
                                            var username = xml.find("username").text()
                                            var password = xml.find("password").text()
                                            var databasename = xml.find("databasename").text()
                                            var ojson = {
                                                host: host || "127.0.0.1",
                                                username: username || "root",
                                                password: password || "root",
                                                databasename: databasename || "smartio_db"
                                            }
                                            form.getForm().setValues(ojson)
                                        }
                                    })
                                }
                            },
                            buttons: [{
                                    text: "Test Connect",
                                    handler: function () {
                                        var form = this.up("form");
                                        form.submit({
                                            url: "/php/mysqlInit.php?par=testConnect",
                                            success: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            },
                                            failure: function (form, action) {
                                                Ext.Msg.alert('Info ', action.response.responseText);
                                            }
                                        })

                                    }
                                },
                                "->",
                                {
                                    text: "Ok",
                                    handler: function () {
                                        var form = this.up("form");
                                        if (form.isValid()) {
                                            var values = form.getValues();
                                            form.submit({
                                                url: "/php/mysqlInit.php?par=saveConfig",
                                                success: function (form, action) {
                                                    Ext.Msg.alert('Info ', action.response.responseText);
                                                },
                                                failure: function (form, action) {
                                                    Ext.Msg.alert('Info ', action.response.responseText);
                                                }
                                            })
                                        }
                                    }
                                },
                                {
                                    text: "Cancel",
                                    handler: function () {
                                        win.close();
                                    }
                                }
                            ]
                        }]
                    })
                }
            }, {
                text: "config Listeners Ip",
                handler: function () {
                    setIpsWindow()
                }
            }]
        })
        this.treePanel = treePanel;
        this.IPCombo = IPCombo;
        Ext.apply(me, {
            items: [formPanel, treePanel]
        })

        me.callParent();
    },
    buttons: [{
            text: "Run/Restart",
            handler: function () {
                Ext.Ajax.request({
                    url: "/php/mysqlinit.php?par=runListen"
                }).then(function (response) {
                    console.log(response.responseText);
                    Ext.Msg.alert("info", " ok .");
                })
            }
        },
        "->",
        {
            text: "Show Event",
            handler: function () {
                var treePanel = this.up("window").treePanel;
                var IPCombo = this.up("window").IPCombo;
                var keysArr = treePanel.getSelectPoints();

                var qdr = Ext.create("QueryEventRecord", {
                    ip: IPCombo.value,
                    keys: keysArr.join(",")
                })
                // var cdr = Ext.create("ChartDataRecord", {
                //     store: qdr.store
                // })

                Ext.create("Ext.window.Window", {
                    title: "Show Data Record",
                    autoShow: true,
                    scrollable: "y",
                    items: [qdr]
                })


            }
        },
        {
            text: "Show",
            handler: function () {
                var treePanel = this.up("window").treePanel;
                var IPCombo = this.up("window").IPCombo;
                var keysArr = treePanel.getSelectPoints();
                var qdr = Ext.createByAlias("QueryDataRecord", {
                    ip: IPCombo.value,
                    keys: keysArr.join(","),
                    height: Ext.getBody().getHeight() / 2.5,
                })
                var cdr = Ext.createByAlias("ChartDataRecord", {
                    height: Ext.getBody().getHeight() / 2,
                    store: qdr.store
                })
                Ext.create("Ext.window.Window", {
                    title: "Show Data Record",
                    autoShow: true,
                    scrollable: "y",
                    items: [cdr, qdr]
                })

            }
        }
    ]
});

function setIpsWindow() {
    Ext.create("Ext.window.Window", {
        width: 500,
        height: 300,
        title: "Setting Listen Ip",
        autoShow: true,
        scrollable: "y",
        items: [
            Ext.create("ListenIps", {})
        ],
        buttons: [{
                text: "Add",
                handler: function () {
                    var grid = this.up("window").down("grid")
                    grid.addIp()
                }
            },
            {
                text: "Delete",
                handler: function () {
                    var grid = this.up("window").down("grid")
                    grid.deleteIp();
                }
            },
            "->",
            {
                text: "Ok",
                handler: function () {
                    var grid = this.up("window").down("grid")
                    console.log(grid)
                    grid.saveIpsXml();
                }
            },
            {
                text: "Cancel",
                handler: function () {
                    this.up("window").close()
                }
            }
        ]
    })
}

Ext.define("modbusConfig", {
    extend: "Ext.grid.Panel",
    xtype: "modbusConfig",
    typpe: "grid",
    width: "100%",
    height: "100%",
    generateModbusXml: function () {
        var grid = this;
        var store = grid.store;
        var items = store.data.items;
        var root = document.createElement("root");
        var aiOffsetEl = document.createElement("aiOffset");
        aiOffsetEl.innerHTML = grid.aiOffset;
        root.appendChild(aiOffsetEl)

        var aoOffsetEl = document.createElement("aoOffset");
        aoOffsetEl.innerHTML = grid.aoOffset;
        root.appendChild(aoOffsetEl)

        var diOffsetEl = document.createElement("diOffset");
        diOffsetEl.innerHTML = grid.diOffset;
        root.appendChild(diOffsetEl)

        var doOffsetEl = document.createElement("doOffset");
        doOffsetEl.innerHTML = grid.doOffset;
        root.appendChild(doOffsetEl)

        for (var i = 0; i < items.length; i++) {
            var key = document.createElement("key");
            console.log(items[i])
            key.setAttribute("slavenumber", items[i].data.slavenumber)
            key.setAttribute("key", items[i].data.key)

            key.setAttribute("pointnumber", items[i].data.pointnumber)
            key.innerHTML = items[i].data.objectname
            root.appendChild(key);
        }
        var xmlstr = '<?xml version="1.0" encoding="utf-8"?>' + root.outerHTML;
        console.log(xmlstr);
        return xmlstr;
    },
    loadModbusXml: function (xmlstr) {
        var grid = this;
        var store = grid.store;

        var aiOffset = $(xmlstr).find("aiOffset")[0];
        if (aiOffset) {
            grid.aiOffset = aiOffset.innerHTML;
        } else {
            grid.aiOffset = 0
        }

        var aoOffset = $(xmlstr).find("aoOffset")[0];
        if (aoOffset) {
            grid.aoOffset = aoOffset.innerHTML;
        } else {
            grid.aoOffset = 0
        }

        var diOffset = $(xmlstr).find("diOffset")[0];
        if (diOffset) {
            grid.diOffset = diOffset.innerHTML;
        } else {
            grid.diOffset = 0
        }

        var doOffset = $(xmlstr).find("doOffset")[0];
        if (doOffset) {
            grid.doOffset = doOffset.innerHTML;
        } else {
            grid.doOffset = 0
        }
        var keys = $(xmlstr).find("key");
        var arr = [];
        for (var i = 0; i < keys.length; i++) {
            arr[i] = {
                slavenumber: keys[i].getAttribute("slavenumber"),
                pointnumber: keys[i].getAttribute("pointnumber"),
                key: keys[i].getAttribute("key"),
                objectname: keys[i].innerHTML
            }
        }

        console.log("arr")
        store.add(arr)
    },
    listeners: {
        boxready: function (grid) {
            console.log(grid.store.removeAll())
            Ext.Ajax.request({
                url: "resources/file.php",
                params: {
                    par: "get",
                    fileName: "/mnt/nandflash/modbusID.xml"
                }
            }).then(function (response) {
                grid.loadModbusXml(response.responseText)
            })

        }
    },
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    addModbus: function () {
        var grid = this;
        var selArr = grid.getSelection();
        var model, data;
        if (selArr[0]) {
            model = selArr[0];
        } else {
            model = grid.store.getAt(grid.store.data.length - 1)
            console.log(model)
        }
        if (model) {
            data = {
                slavenumber: model.data.slavenumber,
                pointnumber: parseInt(model.data.pointnumber) + 1,
                pointtype: model.data.pointtype,
                key: parseInt(model.data.key) + 1
            }
        } else {
            data = {}
        }
        var setkeywin = Ext.create("Ext.window.Window", {
            title: "Settings",
            autoShow: true,
            width: 300,
            height: 215,
            buttons: [{
                    text: "select",
                    handler: function () {
                        var form = setkeywin.down("form");
                        var keyfield = form.getComponent("key")
                        var objname = form.getComponent("objname")
                        var win = Ext.create("SelectKeyWinodw", {
                            ip: "127.0.0.1",
                            port: "6379",
                            callback: function (selectArr) {
                                console.log(arguments)
                                if (selectArr[0]) {
                                    var key = selectArr[0].data.value;
                                    var text = selectArr[0].data.text;
                                    if (key[4] == 4 || key[4] == 3 || key[4] == 1 || key[4] == 0) {
                                        keyfield.setValue(key);
                                        objname.setValue(text);
                                    } else {
                                        Ext.Msg.alert("info ", "please select AI,AV,DI,DO");
                                    }
                                }
                                win.close()
                            }
                        })
                    }
                },
                "->",
                {
                    text: "Ok",
                    handler: function () {
                        var win = this.up("window")
                        var form = win.down("form");
                        grid.store.add(form.getValues())
                        win.close();
                    }
                },
                {
                    text: "Cancel",
                    handler: function () {
                        this.up("window").close()
                    }
                }
            ],
            items: [{
                xtype: "form",
                defaultType: 'textfield',
                //margin:10,
                width: "100%",
                height: "100%",
                defaults: {
                    margin: 10,
                    allowBlank: false
                },
                listeners: {
                    boxready: function (form) {
                        form.form.setValues(data)
                        //form.loadRecord(rec)
                    }
                },
                items: [{
                        fieldLabel: 'Key',
                        name: 'key',
                        itemId: "key",
                        listeners: {
                            change: function (field, newValue, oldValue) {
                                var win = field.up("window")
                                var ip = win.ip;
                                var port = win.port;
                                var objname = field.up().getComponent("objname")
                                if (newValue.length == 7) {
                                    Ext.Ajax.request({
                                        url: "php/main.php",
                                        async: false,
                                        params: {
                                            par: "getNodeTypeValue",
                                            ip: "127.0.0.1",
                                            port: "6379",
                                            nodename: newValue,
                                            type: "Object_Name"
                                        },
                                        success: function (response) {
                                            objname.setValue(response.responseText)
                                        }
                                    })
                                }
                            },

                        }
                    },

                    {
                        fieldLabel: 'Object Name',
                        name: 'objectname',
                        itemId: "objname",
                        allowBlank: true
                    },
                    {
                        fieldLabel: "Slave Number",
                        name: "slavenumber",
                        xtype: "numberfield",
                        //maxValue: 99,
                        minValue: 1
                    },
                    {
                        fieldLabel: "Point Number",
                        name: "pointnumber",
                        xtype: "numberfield",
                        //maxValue: 99,
                        minValue: 1
                    }
                ],
            }]
        })
    },
    deleteModbus: function () {
        var grid = this;
        var selArr = grid.getSelection();
        if (selArr[0]) {
            grid.store.remove(selArr[0])
        }
    },

    tbar: [{
            text: "Add",
            handler: function () {
                var grid = this.up("grid");
                grid.addModbus();
            }
        },
        {
            text: "Delete",
            handler: function () {
                var grid = this.up("grid");
                grid.deleteModbus()
            }
        },
        {
            text: "offset",
            hidden: false,
            handler: function () {
                var grid = this.up("grid");

                Ext.create("Ext.window.Window", {
                    text: "Settings",
                    autoShow: true,
                    width: 300,
                    height: 215,
                    buttons: [{
                            text: "Ok",
                            handler: function () {
                                var win = this.up("window")
                                var form = win.down("form");
                                var values = form.getValues();
                                grid.aiOffset = values.aiOffset
                                grid.aoOffset = values.aoOffset
                                grid.diOffset = values.diOffset
                                grid.doOffset = values.doOffset
                                //rec.set(form.getValues());
                                win.close();
                            }
                        },
                        {
                            text: "Cancel",
                            handler: function () {
                                this.up("window").close()
                            }
                        }
                    ],
                    items: [{
                        xtype: "form",
                        defaultType: 'textfield',
                        //margin:10,
                        width: "100%",
                        height: "100%",
                        defaults: {
                            margin: 10,
                            allowBlank: false
                        },
                        listeners: {
                            boxready: function (form) {
                                //form.loadRecord(rec)
                            }
                        },
                        items: [{
                            xtype: "numberfield",
                            value: grid.aiOffset || 0,
                            fieldLabel: 'AI',
                            name: 'aiOffset'
                        }, {
                            xtype: "numberfield",
                            value: grid.aoOffset || 0,
                            fieldLabel: 'AO',
                            name: 'aoOffset'
                        }, {
                            xtype: "numberfield",
                            value: grid.diOffset || 0,
                            fieldLabel: 'DI',
                            name: 'diOffset'
                        }, {
                            xtype: "numberfield",
                            value: grid.doOffset || 0,
                            fieldLabel: 'DO',
                            name: 'doOffset'
                        }, ],
                    }]
                })
            }
        }
    ],
    initComponent: function () {
        var me = this;
        var ip = "127.0.0.1";
        var port = "6379";
        me.columns = [{
                text: "Slave Number",
                dataIndex: "slavenumber",
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1,
                    //maxValue: 99
                }
            },
            {
                text: "Point Number",
                dataIndex: "pointnumber",
                flex: 1,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 1,
                    //maxValue: 99
                }
            },
            {
                text: "type",
                dataIndex: "pointtype",
                width: 40,
                renderer: function (und, ele, model) {
                    var key = model.data.key
                    if (key) {
                        switch (key[4]) {
                            case "0":
                                return "AI";
                            case "1":
                                return "AO";
                            case "3":
                                return "BI";
                            case "4":
                                return "BO";
                        }
                    }
                }
            },
            {
                text: "Object_Name",
                dataIndex: "objectname",
                flex: 2,
                // editor: {
                //     xtype: 'textfield',
                //     allowBlank: false
                // },
                renderer: function (und, ele, model) {
                    var key = model.data.key
                    //console.log(arguments)
                    if (und != "") {
                        return und;
                    }
                    if (key) {
                        Ext.Ajax.request({
                            url: "php/main.php",
                            async: false,
                            params: {
                                par: "getNodeTypeValue",
                                ip: ip,
                                port: port,
                                nodename: model.data.key,
                                type: "Object_Name"
                            },
                            success: function (response) {
                                und = response.responseText;
                                model.data.objectname = und
                            }
                        })
                    }
                    return und;
                }
            },
            {
                text: "Key",
                dataIndex: "key",
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                },

            },

        ]
        me.callParent();
    },
    store: Ext.create("Ext.data.Store", {
        fields: ["slavenumber", "pointnumber", {
            name: 'pointtype',
            convert: function (val, model) {
                //console.log(arguments)
                //console.log(this);
                //var startingBonus = val * .1;
                var key = model.data.key;
                if (key)
                    return key[4];
                return null;
            }
        }, "objectname", "key"],
        groupField: 'pointtype',
        data: []
    }),
    features: [{
        ftype: 'grouping'
    }],

})
Ext.define("ListenIps", {
    extend: "Ext.grid.Panel",
    width: 500,
    height: 300,
    store: Ext.create("Ext.data.XmlStore", {
        autoLoad: true,
        fields: ["ip", "port"],
        proxy: {
            url: "resources/file.php?fileName=/mnt/nandflash/listenip.xml&par=get",
            type: "ajax",
            reader: {
                type: 'xml',
                record: "item",
                rootProperty: "root"
            }
        },
        data: []
    }),
    getXmlStr: function () {
        var me = this;
        var store = me.store;
        var items = store.data.items;
        var root = document.createElement("root");
        for (var i = 0; i < items.length; i++) {
            var item = document.createElement("item");
            var ip = document.createElement("ip");
            var port = document.createElement("port");
            ip.innerHTML = items[i].data.ip;
            port.innerHTML = items[i].data.port;
            item.appendChild(ip)
            item.appendChild(port)
            root.appendChild(item);
            var points = items[i].data.points;
            itemAddPoints(item, points);
        }

        function itemAddPoints(item, points) {
            var pointArr = points.split(",");
            for (var i = 0; i < pointArr.length; i++) {
                var ntheProperty = pointArr[i].split(":");
                var key = document.createElement("key");
                key.setAttribute("number", ntheProperty[0]);
                key.setAttribute("loop_time", ntheProperty[1]);
                key.setAttribute("history", ntheProperty[2]);
                key.setAttribute("event", ntheProperty[3]);
                item.appendChild(key);
            }
        }
        var xmlstr = '<?xml version="1.0" encoding="utf-8"?>' + root.outerHTML;
        console.log(xmlstr);
        return xmlstr
    },
    saveIpsXml: function () {
        var xmlstr = this.getXmlStr()
        Ext.Ajax.request({
            url: "resources/file.php",
            method: "POST",
            params: {
                par: "save",
                fileName: "/mnt/nandflash/listenip.xml",
                content: xmlstr
            }
        }).then(function (response) {
            if (isNaN(response.responseText)) {
                Ext.Msg.alert("info ", "save file done " + response.responseText)
            } else {
                Ext.Msg.alert("info ", "save file ok " + response.responseText)
            }
        })
    },
    columns: [{
            text: "Ip",
            dataIndex: "ip",
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            text: "Port",
            dataIndex: "port",
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 1,
                //maxValue: 99
            }
        },
        {
            text: "Points",
            dataIndex: "points",
            flex: 1,
            editor: {
                xtype: 'textfield',
            }
        },
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            flex: 1,
            text: "Setting",
            items: [{
                icon: "resources/icons/config_set_24px.png",
                tooltip: 'Sell stock',
                handler: function (ipgrid, rowIndex, colIndex) {
                    var win = Ext.create("Ext.window.Window", {
                        title: "Set Points",
                        autoShow: true,
                        width: 600,
                        height: 400,
                        scrollable: "y",
                        items: [{
                            xtype: "grid",
                            plugins: [
                                Ext.create('Ext.grid.plugin.CellEditing', {
                                    clicksToEdit: 1
                                })
                            ],
                            store: {
                                fields: ["number", "loop_time", "history", "event"]
                            },
                            columns: [{
                                text: "key",
                                dataIndex: "number",
                                flex: 1,
                                editor: {
                                    xtype: 'textfield',
                                    allowBlank: false,
                                }
                            }, {
                                text: "loop time (ms)",
                                dataIndex: "loop_time",
                                flex: 1,
                                tooltip: "If the value is 0, the subscription mode is used.",
                                editor: {
                                    xtype: 'numberfield',
                                    step: 1000,
                                    allowBlank: false,
                                    minValue: 0
                                }
                            }, {
                                xtype: 'checkcolumn',
                                text: "history",
                                flex: 1,
                                inputValue: 1,
                                uncheckedValue: 0,
                                dataIndex: "history"
                            }, {
                                xtype: 'checkcolumn',
                                text: "event",
                                flex: 1,
                                inputValue: 1,
                                uncheckedValue: 0,
                                dataIndex: "event"
                            }]
                        }],
                        buttons: [{
                                text: "Change",
                                handler: function () {
                                    Ext.create("SelectKeyWinodw", {
                                        ip:ipgrid.store.getAt(rowIndex).get("ip"),
                                        port:"6379",
                                        callback: function () {
                                            var keys = this.down("treepanel").getChecked();
                                            keys = keys.filter(function (val, index) {
                                                if (val.data.leaf) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            })
                                            keys.sort(function (a, b) {
                                                return a.data.value[4] - b.data.value[4];
                                            })
                                            for (var i = 0; i < keys.length; i++) {
                                                win.down("grid").store.add({
                                                    number: keys[i].data.value,
                                                    "loop_time": 0,
                                                    event: 1,

                                                })
                                            }
                                            console.log(keys)
                                            console.log(arguments)
                                        }
                                    })
                                }
                            },
                            "->",
                            {
                                text: "Ok",
                                handler: function () {
                                    var grid = win.down("grid");
                                    var store = grid.store;
                                    var items = store.data.items;
                                    var keys = [];
                                    for (var i = 0; i < items.length; i++) {
                                        var number = items[i].data.number;
                                        var loop_time = items[i].data.loop_time;
                                        var event = items[i].data.event || 0;
                                        var history = items[i].data.history || 0;
                                        keys.push(number + ":" + loop_time + ":" + event + ":" + history)
                                    }
                                    ipgrid.store.getAt(rowIndex).set("points", keys.join(","))
                                    win.close()
                                }
                            }, {
                                text: "Cancel",
                                handler: function () {
                                    win.close();
                                }
                            }
                        ]
                    })
                    console.log(arguments)
                }
            }],
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    addIp: function () {
        var grid = this;
        var selArr = grid.getSelection();
        grid.store.add({
            ip: "192.168.253.253",
            port: 6379
        })
    },
    deleteIp: function () {
        var grid = this;
        var selArr = grid.getSelection();
        if (selArr[0]) {
            grid.store.remove(selArr[0])
        }
    },
    initComponent: function () {
        var me = this;
        me.callParent();
    },
    listeners: {
        boxready: function (grid) {
            testgrid = grid
            console.log(arguments)
        }
    }
})
Ext.define('QueryDataRecord', {
    extend: 'Ext.grid.Panel',
    alias: "QueryDataRecord",
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging'
    ],
    xtype: 'progress-bar-pager',
    //height: 360,
    frame: true,
    initComponent: function () {
        this.width = 800;
        var me = this;
        var ip = this.ip || "127.0.0.1";
        var keys = this.keys;
        var pageSize = 25;
        var store = Ext.create("Ext.data.Store", {
            autoLoad: true,
            fields: [{
                    name: 'device_instance',
                    type: 'string'
                },
                {
                    name: 'Object_Name',
                    type: 'string'
                },
                {
                    name: 'Present_Value',
                    type: 'string'
                },
                {
                    name: 'last_update_time',
                    type: 'date'
                }
            ],
            pageSize: pageSize,
            proxy: {
                type: 'ajax',
                url: 'resources/mysql.php?par=getDataRecord&ip=' + ip + "&keys=" + keys,
                reader: {
                    type: 'json',
                    rootProperty: "topics",
                    totalProperty: 'totalCount',
                    listeners: {
                        exception: function () {
                            console.log(arguments)
                        }
                    }
                }
            },
            listeners: {
                load: function () {
                    console.log(arguments)
                }
            }
        })
        Ext.apply(this, {
            store: store,
            columns: [{
                text: 'Device Instance',
                sortable: true,
                dataIndex: 'device_instance',
                flex: 1
            }, {
                text: 'Device Type',
                sortable: true,
                dataIndex: 'device_type',
                flex: 1,
                renderer: function (val) {
                    switch (val) {
                        case "0":
                            return "AI";
                        case "1":
                            return "AO";
                        case "2":
                            return "AV"
                        case "3":
                            return "BI"
                        case "4":
                            return "BO"
                        case "5":
                            return "BV"
                        default:
                            return val;
                    }
                }
            }, {
                text: 'device_number',
                sortable: true,
                dataIndex: 'device_number',
                flex: 1
            }, {
                text: 'Object Name',
                sortable: true,
                dataIndex: 'Object_Name',
                flex: 1
            }, {
                text: 'Present Value',
                sortable: true,
                dataIndex: 'Present_Value',
                flex: 1
            }, {
                text: 'Last Updated',
                sortable: true,
                dataIndex: 'last_update_time',
                flex: 1
            }],

            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: store,
                displayInfo: true,
                items: [
                    "-", {
                        listeners: {
                            change: function (field, newV, oldV) {
                                field.up().pageSize = newV;
                                me.store.setPageSize(newV)
                            }
                        },
                        value: pageSize,
                        fieldLabel: "pageSize",
                        xtype: "textfield",
                        labelWidth: 50,
                        width: 100
                    }
                ],
                plugins: new Ext.ux.ProgressBarPager()
            }

        });


        this.callParent();
    },


});
Ext.define('QueryEventRecord', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
    ],
    xtype: 'progress-bar-pager',
    height: 360,
    frame: true,
    initComponent: function () {
        var me = this;
        this.width = 1000;
        var ip = this.ip || "127.0.0.1";
        var keys = this.keys;
        var pageSize = 25;
        var store = Ext.create("Ext.data.Store", {
            autoLoad: true,
            fields: [{
                    name: 'Object_Name',
                    type: 'string'
                },
                {
                    name: 'Description',
                    type: "string"
                },
                {
                    name: 'device_instance',
                    type: 'string'
                },
                {
                    name: 'device_number',
                    type: 'string'
                },
                {
                    name: 'Present_Value',
                    type: 'string'
                },
                {
                    name: 'message_number',
                    type: 'string'
                },
                {
                    name: 'last_update_time',
                    type: 'date'
                }
            ],
            proxy: {
                type: 'ajax',
                url: 'resources/mysql.php?par=getEventData&ip=' + ip + "&keys=" + keys,
                reader: {
                    type: 'json',
                    rootProperty: "topics",
                    totalProperty: 'totalCount'
                }
            },
            listeners: {
                load: function () {
                    console.log(arguments)
                }
            }
        })
        Ext.apply(this, {
            store: store,
            columns: [{
                    text: 'Device Type',
                    sortable: true,
                    hidden: true,
                    dataIndex: 'device_type',
                    flex: 1,
                    renderer: function (val) {
                        switch (val) {
                            case "0":
                                return "AI";
                            case "1":
                                return "AO";
                            case "2":
                                return "AV"
                            case "3":
                                return "BI"
                            case "4":
                                return "BO"
                            case "5":
                                return "BV"
                            default:
                                return val;
                        }
                    }
                },
                {
                    text: 'Object Name',
                    sortable: true,
                    dataIndex: 'Object_Name',
                    flex: 2
                },

                {
                    text: 'Description',
                    sortable: true,
                    dataIndex: 'Description',
                    flex: 2
                },
                {
                    text: 'Device Instance',
                    sortable: true,
                    dataIndex: 'device_instance',
                    flex: 1
                },
                {
                    text: 'Device Number',
                    sortable: true,
                    dataIndex: 'device_number',
                    flex: 1
                }, {
                    text: 'Present Value',
                    sortable: true,
                    dataIndex: 'Present_Value',
                    flex: 1
                },
                {
                    text: "Message",
                    sortable: true,
                    dataIndex: "message_number",
                    flex: 2.5,

                },
                {
                    text: 'Last Updated',
                    sortable: true,
                    dataIndex: 'last_update_time',
                    flex: 2
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: store,
                displayInfo: true,
                items: [
                    "-", {
                        listeners: {
                            change: function (field, newV, oldV) {
                                field.up().pageSize = newV;
                                me.store.setPageSize(newV)
                            }
                        },
                        value: pageSize,
                        fieldLabel: "pageSize",
                        xtype: "textfield",
                        labelWidth: 50,
                        width: 100
                    }
                ],
                plugins: new Ext.ux.ProgressBarPager()
            }

        });
        this.callParent();
    },


});

Ext.define("FilterPoint", {
    extend: "Ext.grid.Panel",
    alias: "FilterPoint",
    xtype: "FilterPoint",
    width: 500,
    height: 300,
    store: Ext.create("Ext.data.XmlStore", {
        autoLoad: true,
        fields: ["ip", "port", "object_name", "key"],
        proxy: {
            url: "php/file.php?fileName=/mnt/nandflash/filterpoint.xml&par=get",
            type: "ajax",
            reader: {
                type: 'xml',
                record: "item",
                rootProperty: "root"
            }
        },
        data: []
    }),
    getXmlStr: function () {
        var me = this;
        var store = me.store;
        var items = store.data.items;
        var root = document.createElement("root");
        for (var i = 0; i < items.length; i++) {
            var item = document.createElement("item");
            var ip = document.createElement("ip");
            var port = document.createElement("port");
            var object_name = document.createElement("object_name");
            var key = document.createElement("key");

            ip.innerHTML = items[i].data.ip;
            port.innerHTML = items[i].data.port;
            object_name.innerHTML = items[i].data.object_name;
            key.innerHTML = items[i].data.key;

            item.appendChild(ip)
            item.appendChild(port)
            item.appendChild(object_name)
            item.appendChild(key)
            root.appendChild(item);
        }
        var xmlstr = '<?xml version="1.0" encoding="utf-8"?>' + root.outerHTML;
        console.log(xmlstr);
        return xmlstr
    },
    saveIpsXml: function () {
        var xmlstr = this.getXmlStr()
        Ext.Ajax.request({
            url: "php/file.php",
            method: "POST",
            params: {
                par: "save",
                fileName: "/mnt/nandflash/filterpoint.xml",
                content: xmlstr
            }
        }).then(function (response) {
            if (isNaN(response.responseText)) {
                Ext.Msg.alert("info ", "save file done " + response.responseText)
            } else {
                Ext.Msg.alert("info ", "save file ok " + response.responseText)
            }
        })
    },
    columns: [{
            text: "Ip",
            dataIndex: "ip",
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        },
        {
            text: "Port",
            dataIndex: "port",
            flex: 1,
            hidden: true,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 1,
                //maxValue: 99
            }
        },
        {
            text: "Key",
            dataIndex: "key",
            flex: 1,
            editor: {
                xtype: "textfield",
                allowBlank: false
            }
        },
        {
            text: "Object_Name",
            dataIndex: "object_name",
            flex: 1,
            renderer: function (und, ele, model) {
                var key = model.data.key
                //console.log(arguments)
                if (und != "") {
                    return und;
                }
                if (key) {
                    Ext.Ajax.request({
                        url: "php/main.php",
                        async: false,
                        params: {
                            par: "getNodeTypeValue",
                            ip: ip,
                            port: port,
                            nodename: model.data.key,
                            type: "Object_Name"
                        },
                        success: function (response) {

                            und = response.responseText;
                            model.data.objectname = und
                        }
                    })
                }
                return und;
            }
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    addItem: function (data) {
        var grid = this;
        //var selArr = grid.getSelection();
        grid.store.add(data)
    },
    deleteSelectItem: function () {
        var grid = this;
        var selArr = grid.getSelection();
        if (selArr[0]) {
            grid.store.remove(selArr[0])
        }
    },
    initComponent: function () {
        var me = this;
        me.callParent();
    },
    listeners: {
        boxready: function (grid) {
            testgrid = grid
            console.log(arguments)
        }
    }
})

Ext.define("FilterPointWindow", {
    extend: "Ext.window.Window",
    width: 500,
    height: 300,
    title: "Setting Event No Listen Point",
    autoShow: true,
    scrollable: "y",
    items: [{
        xtype: "FilterPoint"
    }],
    buttons: [{
            text: "Add",
            handler: function () {
                var grid = this.up("window").down("grid")
                Ext.create("SelectKeyFormWindow", {
                    callback: function (res) {
                        console.log(res)
                        grid.addItem(res)
                    }
                })
            }
        },
        {
            text: "Delete",
            handler: function () {
                var grid = this.up("window").down("grid")
                grid.deleteSelectItem();
            }
        },
        "->",
        {
            text: "Ok",
            handler: function () {
                var grid = this.up("window").down("grid")
                console.log(grid)
                grid.saveIpsXml();
            }
        },
        {
            text: "Cancel",
            handler: function () {
                this.up("window").close()
            }
        }
    ]
})