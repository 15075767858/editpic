Ext.define('graph.view.chart.HistoryChart', {
    extend: 'Ext.panel.Panel',
    alias: "HistoryChart",
    xtype: "HistoryChart",
    requires: [
        'graph.view.chart.HistoryChartController',
        'graph.view.chart.HistoryChartModel',
        "graph.store.HistoryStore",
        "graph.store.HistoryRecord"
    ],
    controller: 'chart-historychart',
    viewModel: {
        type: 'chart-historychart'
    },
    initComponent: function () {
        var me = this;
        //Ext.chart.CartesianChart
        var tablename = me.tablename;
        var hiData = getHistoryIndexData(tablename)
        var keysArr = hiData.keys.split(",")

        var series = [];
        var cloumns = [];

        for (var i = 0; i < keysArr.length; i++) {
            var key = keysArr[i];
            var objname = My.getObjectName(hiData.ip, hiData.port, keysArr[i])
            var valueField = 'key' + (i + 1) + '_value'
            var line = createLine(key, objname, valueField)

            function createLine(key, objname, valueField) {
                var line = {
                    type: 'line',
                    title: objname,
                    xField: 'last_update_time',
                    yField: valueField,
                    marker: {
                        type: 'triangle',
                        fx: {
                            duration: 200,
                            easing: 'backOut'
                        }
                    },
                    highlightCfg: {
                        scaling: 2
                    },
                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: function (tooltip, record, item) {
                            console.log('key' + (i + 1) + '_value')
                            var arr = ["Object Name :" + objname,
                                "Device Instance :" + key.substr(0, 4),
                                //"Device Type :" + record.data.device_type,
                                "Device Number :" + key.substr(5, 7),
                                "Present Value :" + record.data[valueField],
                                "Time :" + new Date(record.data.last_update_time).toLocaleString()
                            ]
                            if (record.data.message_number) {
                                arr.push("message :" + record.data.message_number + "");
                            }
                            tooltip.setHtml(arr.join("<br>"))
                        }
                    }
                }
                return line
            }
            series.push(line);
        }

        var store = me.store;
        Ext.apply(me, {
            items: [{

                    xtype: 'cartesian',
                    reference: 'chart',
                    width: '100%',
                    height: 350,
                    height: me.cartesianheight,
                    legend: {
                        type: 'sprite',
                        docked: 'left',
                    },
                    store: store,
                    insetPadding: 40,
                    sprites: [{
                        type: 'text',
                        text: tablename,
                        fontSize: 22,
                        width: 100,
                        height: 30,
                        x: 40, // the sprite x position
                        y: 30 // the sprite y position
                    }],
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        fields: ["key1_value", "key2_value", "key3_value", "key4_value", "key5_value", "key6_value", "key7_value", "key8_value"],
                        title: {
                            text: "Present Value",
                            fontSize: 15
                        },
                        grid: true,
                    }, {
                        type: 'numeric',
                        grid: true,
                        //dateFormat: 'Y-m-d',
                        //visibleRange: [0, 1],
                        position: 'bottom',
                        fields: 'last_update_time',
                        titleMargin: 12,
                        title: {
                            text: 'Time'
                        },
                        renderer: function (numeric, val) {
                            //console.log(arguments)
                            return new Date(val).toLocaleString()
                        }
                    }],
                    series: series,
                    interactions: [{
                        type: 'panzoom',
                        zoomOnPan: true
                    }],
                    tbar: {
                        itemId: "toolbar",
                        items: [
                            '->',
                            {
                                text: 'Reset pan/zoom',
                                handler: function () {
                                    console.log(arguments)
                                    console.log(this)
                                    console.log(this.up("cartesian"))
                                    var chart = this.up("cartesian"),
                                        axes = chart.getAxes();
                                    axes[0].setVisibleRange([0, 1]);
                                    axes[1].setVisibleRange([0, 1]);
                                    chart.redraw();
                                }
                            },
                            "|"
                        ]
                    },
                    listeners: {
                        afterrender: function () {
                            //console.log(this)
                            var chart = this;
                            var toolbar = this.getComponent('toolbar');
                            console.log(toolbar)
                            var panzoom = chart.getInteractions()[0];
                            panzoom.getModeToggleButton()

                            toolbar.add(panzoom.getModeToggleButton());
                        }
                    }
                },

            ]
        })

        me.callParent();
    },

});

My.ShowHistoryTable = function (tablename) {
    var store = Ext.create("graph.store.HistoryRecord", {
        proxy: {
            type: "ajax",
            url: "resources/mysql.php?par=getHistory&tablename=" + tablename,
            reader: {
                type: 'json',
                rootProperty: "topics",
                totalProperty: 'totalCount'
            }
        }
    })
    Ext.create("Ext.window.Window", {
        autoShow: true,
        title: "History",
        items: [{
                xtype: "HistoryChart",
                width: 1000,
                cartesianheight: Ext.getBody().getHeight() / 2,
                tablename: tablename,
                store: store
            },
            {
                xtype: "HistoryGrid",
                width: 1000,
                height: Ext.getBody().getHeight() / 2.5,
                tablename: tablename,
                store: store
            }
        ]
    })
}

function getHistoryIndexData(tablename) {
    var data;
    Ext.Ajax.request({
        url: "resources/mysql.php?par=getHistoryIndexByTableName&tablename=" + tablename,
        async: false,
        success: function (response) {
            console.log(response)
            var res = Ext.decode(response.responseText);
            data = res;
        }
    })
    return data;
}
Ext.define('HistoryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: "HistoryGrid",
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        "Ext.ux.ProgressBarPager"
    ],
    xtype: 'progress-bar-pager',
    height: 360,
    frame: true,

    initComponent: function () {
        var me = this;
        var store = me.store;
        var tablename = me.tablename;
        var pageSize = 25;
        var hiData = getHistoryIndexData(tablename)
        var keysArr = hiData.keys.split(",")
        var columns = [{
                text: 'Ip',
                sortable: true,
                dataIndex: 'ip',
                flex: 2,
                hidden: true
            },
            {
                text: 'Port',
                sortable: true,
                dataIndex: 'port',
                flex: 2,
                hidden: true
            },
            {
                text: 'Table Name',
                hidden: true,
                sortable: true,
                dataIndex: 'tablename',
                flex: 1
            },
            {
                text: 'Time',
                sortable: true,
                dataIndex: 'last_update_time',
                flex: 2,
                renderer: function (val) {
                    return new Date(val).toLocaleString()
                }
            }
        ];
        for (var i = 0; i < keysArr.length; i++) {
            var objname = My.getObjectName(hiData.ip, hiData.port, keysArr[i])
            console.log(objname)
            var data = {
                text: objname,
                sortable: true,
                dataIndex: 'key' + (i + 1) + '_value',
                flex: 1
            }
            columns.push(data);
        }
        Ext.apply(this, {
            columns: columns,
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
    }
});

//8 yue