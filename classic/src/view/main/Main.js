/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('editpic.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Ext.tree.Panel',
        'editpic.view.main.MainModel',
        'editpic.view.main.MainController',
        'editpic.view.tree.SvgsTree',
        "editpic.view.panel.PicPanel",
        "editpic.view.panel.SetPicPanel",
        "editpic.view.panel.DevFormPanel",
        'editpic.view.panel.ToolsPanel',
        "Ext.window.Toast"
    ],

    id: "mainPanel",
    controller: 'main',
    viewModel: 'main',
    //ui: 'navigation',
    tbar: [
        {
            text: "save", handler: "saveHandler"
        }, {
            text: "open", handler: "openHandler"
        },
        {
            text:"Backup Graphice",/*handler:"BackupGraphice"*/
        },
        {
            text: "Restor Graphice", /*handler: "dataJsonUpload"*/
        }, {
            text: "update graph",
            handler: function () {
                Ext.create("editpic.view.window.UploadWindow")
            }
        } ,{
            text: "about",
            handler: function () {
                Ext.Msg.alert("Version", "SmartIOgraphTools 1.73")
            }
        }
    ],
    border: true,
    header: {
        height: 50,
        style: {
            lineHeight: 50
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 1
        }
    },
    layout: "border",
    defaults: {},
    items: [
        {
            xtype: "tabpanel",
            region: 'center',
            id: "mintab",
            scrollable: true,
            getCurrentTab: function () {
                var me = this;
                if (!me.items) {
                    return null;
                }
                for (var i = 0; i < me.items.items.length; i++) {
                    if (!me.items.items[i].hidden) {
                        return me.items.items[i]
                    }
                }
                return null;
            },
            getTabByTitle: function (title) {
                var me = this;
                if (!me.items) {
                    return null;
                }
                for (var i = 0; i < me.items.items.length; i++) {
                    if (me.items.items[i].title == title) {
                        return me.items.items[i]
                    }
                }
                return null;

            },
            addTab: function (text) {
                if (!text) {
                    return;
                }
                var me = this
                var panel = me.getTabByTitle(text);
                if (panel) {
                    panel.close()
                }
                var picPanel = Ext.create("editpic.view.panel.PicPanel", {
                    x: 0,
                    y: 0
                })
                me.add(
                    {
                        xtype: "panel",
                        title: text,
                        items: picPanel
                    }
                ).show()
                Ext.toast
                picPanel.load(My.getImageData()[text])
            },
            defaults: {
                bodyStyle: {
                    //background: "url(resources/square.png)"
                    background:"#1491fb"
                },
                closable: true
            },
            items: [
                {
                    xtype: "panel",
                    title: "untitled",
                    items: {
                        xtype: "picpanel",
                        x: 30,
                        y: 30
                    }
                }
            ],
            listeners: {
                boxready: function () {
                    var me = this;
                    /*var search = window.location.search;
                     if(search){
                     var resObj = Ext.Object.fromQueryString(search)
                     if(resObj){
                     me.addTab(resObj['graph'])
                     }
                     }*/
                    var resObj = My.getSearch();
                    if (resObj) {
                        me.removeAll();
                        me.addTab(resObj['graph']);
                        Ext.getCmp("imgTreePanel").hide();
                        Ext.getCmp("toolPanel").hide();
                        Ext.getCmp("devformpanel").hide();
                        console.log(me.getDockedItems());
                        var mainPanel = Ext.getCmp("mainPanel");
                        mainPanel.getDockedItems()[0].hide();
                        mainPanel.getDockedItems()[1].hide();

                    }

                    My.linkManger.init()
                }
            }
        },
        {
            xtype: "editpic.svgstree",
            id: "imgTreePanel",
            region: 'west',
            collapsible: true
        },
        {
            xtype: "toolspanel",
            border: true,
            region: "east"
        },
        {
            xtype: "devformpanel",
            id: "devformpanel",
            region: "east"
        }
    ]

});
