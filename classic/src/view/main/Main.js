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
        'Ext.tree.Panel',
        'editpic.view.main.MainModel',
        'editpic.view.main.MainController',
        'editpic.view.tree.SvgsTree',
        "editpic.view.panel.PicPanel",
        "editpic.view.panel.SetPicPanel",
        "editpic.view.panel.DevFormPanel",
        'editpic.view.panel.ToolsPanel'
    ],

    controller: 'main',
    viewModel: 'main',
    //ui: 'navigation',
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
            xtype: "panel",
            region: 'center',
            scrollable: true,
            bodyStyle: {
                background: "url(resources/square.png)"
            },
            items: [
                {
                    xtype: "picpanel",
                    x: 30,
                    y: 30
                }

            ]
        },
        {
            xtype: "editpic.svgstree",
            id: "imgTreePanel",
            region: 'west',
            collapsible: true
        },
        {
            xtype: "toolspanel",
            region: "east",

        },
        {
            xtype: "devformpanel",
            region: "east",
        }
        ,

    ],
    listeners: {
        boxready: function () {
            var me = this;
            /*
             Ext.onReady(function () {
             //Ext.create("editpic.view.window.ImgPanelMenuFormWindow")
             })*/

        }
    }

});
