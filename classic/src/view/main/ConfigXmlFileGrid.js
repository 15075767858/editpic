Ext.define('graph.view.grid.ConfigXmlFileGrid', {
    extend: 'Ext.grid.Panel',
    xtype: "ConfigXmlFileGrid",
    alias: "ConfigXmlFileGrid",
    requires: [
        'graph.view.grid.ConfigXmlFileGridController',
        'graph.view.grid.ConfigXmlFileGridModel'
    ],

    controller: 'grid-configxmlfilegrid',
    viewModel: {
        type: 'grid-configxmlfilegrid'
    },
    width: 500,
    height: 200,
    getXmlStr: function () {
        var me = this;
        var store = me.store;
        var fields = store.config.fields;
        var items = store.data.items;
        var root = document.createElement("root");
        for (var i = 0; i < items.length; i++) {
            var item = document.createElement("item");
            for (var j = 0; j < fields.length; j++) {
                var el = document.createElement(fields[j]);
                el.innerHTML = items[i].data[fields[j]];
                item.appendChild(el);
            }
            root.appendChild(item);
        }
        var xmlstr = '<?xml version="1.0" encoding="utf-8"?>' + root.outerHTML;
        console.log(xmlstr);
        return xmlstr
    },
    saveIpsXml: function () {
        var fileName = this.fileName;
        var xmlstr = this.getXmlStr()
        Ext.Ajax.request({
            url: "resources/file.php",
            method: "POST",
            params: {
                par: "save",
                fileName: fileName,
                content: xmlstr
            }
        }).then(function (response) {
            if (isNaN(response.responseText)) {
                My.delayToast("info ", "save file done " + response.responseText)
            } else {
                My.delayToast("info ", "save file ok " + response.responseText)
            }
        })
    },

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
           return  grid.store.remove(selArr[0])
        }
    },
    initComponent: function () {
        var me = this;
        console.log("store", me, me.store)

        if (!me.columns) {
            var columns = [];
            var fields = me.store.config.fields;
            for (var i = 0; i < fields.length; i++) {
                columns.push({
                    text: fields[i].toLocaleUpperCase(),
                    dataIndex: fields[i],
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                })
            }
            me.columns = columns;
        }

        me.callParent();
    },
    getWindowButtons: function () {
        var grid = this;
        var buttons = [{
                text: "Add",
                handler: grid.addItemClick || function () {
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
                    grid.deleteSelectItem();
                }
            },
            "->",
            {
                text: "Ok",
                handler: function () {
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
        return buttons;
    },

    listeners: {
        boxready: function (grid) {
            // testgrid = grid
            // console.log(arguments)
        }
    }
});