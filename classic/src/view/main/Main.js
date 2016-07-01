/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('editpic.view.main.Main', {
    extend: 'Ext.tab.Panel',
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
        "editpic.view.panel.SetPicPanel"
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        resizable: true,

        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        }
        //iconCls: 'fa-list-ul',
        //icon:"resources/SmartIO.png"


    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'right'
        }
    },

    defaults: {
        //bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [

        {
            title: 'Home',
            iconCls: 'fa-home',

            // The following grid shares a store with the classic version's grid as well!
            layout: "border",
            items: [
                {
                    xtype: "panel",
                    region: 'center',
                    layout: "center",
                    scrollable: true,
                    bodyStyle: {
                        background: "url(resources/square.png)"
                    },
                    items: [
                        {
                            xtype: "picpanel",
                        }
                    ],


                },
                {
                    xtype: "editpic.svgstree",
                    id: "testtree",
                    region: 'west',
                }
            ]
        }, {
            title: 'Users',
            iconCls: 'fa-user',
            bind: {
                html: '{loremIpsum}'
            },
            hidden: true
        }, {
            title: 'Groups',
            iconCls: 'fa-users',
            bind: {
                html: '{loremIpsum}'
            },
            hidden: true
        }, {
            title: 'Settings',
            iconCls: 'fa-cogs',

            bind: {
                html: '{loremIpsum}'
            }
        }],
    listeners: {}
});

