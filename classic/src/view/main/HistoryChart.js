Ext.define('graph.view.chart.HistoryChart', {
    extend: 'Ext.panel.Panel',
    alias: "HistoryChart",
    requires: [
        'graph.view.chart.HistoryChartController',
        'graph.view.chart.HistoryChartModel'
    ],

    controller: 'chart-historychart',
    viewModel: {
        type: 'chart-historychart'
    },
    initComponent: function () {
        var me = this;
        var data= [
            {
            "0": "1",
            "id": "1",
            "1": "10",
            "device": "10",
            "2": "",
            "Object_Name": "",
            "3": "1001",
            "device_instance": "1001",
            "4": "0",
            "device_type": "0",
            "5": "01",
            "device_number": "01",
            "6": "-597",
            "Present_Value": "-597",
            "7": "2017-07-07 11:42:45",
            "last_update_time": "2017-07-07 11:42:45"
        }, {
            "0": "2",
            "id": "2",
            "1": "10",
            "device": "10",
            "2": "",
            "Object_Name": "",
            "3": "1001",
            "device_instance": "1001",
            "4": "0",
            "device_type": "0",
            "5": "01",
            "device_number": "01",
            "6": "336",
            "Present_Value": "336",
            "7": "2017-07-07 11:42:47",
            "last_update_time": "2017-07-07 11:42:47"
        }, {
            "0": "3",
            "id": "3",
            "1": "10",
            "device": "10",
            "2": "",
            "Object_Name": "",
            "3": "1001",
            "device_instance": "1001",
            "4": "0",
            "device_type": "0",
            "5": "01",
            "device_number": "01",
            "6": "631",
            "Present_Value": "631",
            "7": "2017-07-07 11:42:47",
            "last_update_time": "2017-07-07 11:42:47"
        }, {
            "0": "4",
            "id": "4",
            "1": "10",
            "device": "10",
            "2": "",
            "Object_Name": "",
            "3": "1001",
            "device_instance": "1001",
            "4": "0",
            "device_type": "0",
            "5": "01",
            "device_number": "01",
            "6": "805",
            "Present_Value": "805",
            "7": "2017-07-07 11:42:48",
            "last_update_time": "2017-07-07 11:42:48"
        },
            {
                "0": "5",
                "id": "5",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "634",
                "Present_Value": "634",
                "7": "2017-07-07 11:42:49",
                "last_update_time": "2017-07-07 11:42:49"
            }, {
                "0": "6",
                "id": "6",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "249",
                "Present_Value": "249",
                "7": "2017-07-07 11:42:51",
                "last_update_time": "2017-07-07 11:42:51"
            }, {
                "0": "7",
                "id": "7",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "229",
                "Present_Value": "229",
                "7": "2017-07-07 11:42:52",
                "last_update_time": "2017-07-07 11:42:52"
            }, {
                "0": "8",
                "id": "8",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "339",
                "Present_Value": "339",
                "7": "2017-07-07 11:42:53",
                "last_update_time": "2017-07-07 11:42:53"
            }, {
                "0": "9",
                "id": "9",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "139",
                "Present_Value": "139",
                "7": "2017-07-07 11:42:54",
                "last_update_time": "2017-07-07 11:42:54"
            }, {
                "0": "10",
                "id": "10",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "424",
                "Present_Value": "424",
                "7": "2017-07-07 11:42:55",
                "last_update_time": "2017-07-07 11:42:55"
            }, {
                "0": "11",
                "id": "11",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "891",
                "Present_Value": "891",
                "7": "2017-07-07 11:42:55",
                "last_update_time": "2017-07-07 11:42:55"
            }, {
                "0": "12",
                "id": "12",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "411",
                "Present_Value": "411",
                "7": "2017-07-07 11:42:57",
                "last_update_time": "2017-07-07 11:42:57"
            }, {
                "0": "13",
                "id": "13",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "266",
                "Present_Value": "266",
                "7": "2017-07-07 11:42:58",
                "last_update_time": "2017-07-07 11:42:58"
            }, {
                "0": "14",
                "id": "14",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "83.",
                "Present_Value": "83.",
                "7": "2017-07-07 11:42:58",
                "last_update_time": "2017-07-07 11:42:58"
            }, {
                "0": "15",
                "id": "15",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "-755",
                "Present_Value": "-755",
                "7": "2017-07-07 11:42:59",
                "last_update_time": "2017-07-07 11:42:59"
            }, {
                "0": "16",
                "id": "16",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "850",
                "Present_Value": "850",
                "7": "2017-07-07 11:43:00",
                "last_update_time": "2017-07-07 11:43:00"
            }, {
                "0": "17",
                "id": "17",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "839",
                "Present_Value": "839",
                "7": "2017-07-07 11:43:01",
                "last_update_time": "2017-07-07 11:43:01"
            }, {
                "0": "18",
                "id": "18",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "793",
                "Present_Value": "793",
                "7": "2017-07-07 11:43:03",
                "last_update_time": "2017-07-07 11:43:03"
            }, {
                "0": "19",
                "id": "19",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "751",
                "Present_Value": "751",
                "7": "2017-07-07 11:43:03",
                "last_update_time": "2017-07-07 11:43:03"
            }, {
                "0": "20",
                "id": "20",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "658",
                "Present_Value": "658",
                "7": "2017-07-07 11:43:04",
                "last_update_time": "2017-07-07 11:43:04"
            }, {
                "0": "21",
                "id": "21",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "273",
                "Present_Value": "273",
                "7": "2017-07-07 11:43:28",
                "last_update_time": "2017-07-07 11:43:28"
            }, {
                "0": "22",
                "id": "22",
                "1": "10",
                "device": "10",
                "2": "",
                "Object_Name": "",
                "3": "1001",
                "device_instance": "1001",
                "4": "0",
                "device_type": "0",
                "5": "01",
                "device_number": "01",
                "6": "76.",
                "Present_Value": "76.",
                "7": "2017-07-07 11:43:29",
                "last_update_time": "2017-07-07 11:43:29"
            }, {
                "0": "23",
                "id": "23",
                "1": "10",
                "device": "10",
                "2": "CH_B1_REQ",
                "Object_Name": "CH_B1_REQ",
                "3": "1001",
                "device_instance": "1001",
                "4": "2",
                "device_type": "2",
                "5": "01",
                "device_number": "01",
                "6": "628",
                "Present_Value": "628",
                "7": "2017-07-07 11:50:09",
                "last_update_time": "2017-07-07 11:50:09"
            },
            {
                "0": "24",
                "id": "24",
                "1": "10",
                "device": "10",
                "2": "CH_B1_REQ",
                "Object_Name": "CH_B1_REQ",
                "3": "1001",
                "device_instance": "1001",
                "4": "2",
                "device_type": "2",
                "5": "01",
                "device_number": "01",
                "6": "854",
                "Present_Value": "854",
                "7": "2017-07-07 11:50:09",
                "last_update_time": "2017-07-07 11:50:09"
            },
            {
                "0": "25",
                "id": "25",
                "1": "10",
                "device": "10",
                "2": "CH_B1_REQ",
                "Object_Name": "CH_B1_REQ",
                "3": "1001",
                "device_instance": "1001",
                "4": "2",
                "device_type": "2",
                "5": "01",
                "device_number": "01",
                "6": "541",
                "Present_Value": "541",
                "7": "2017-07-07 11:50:11",
                "last_update_time": "2017-07-07 11:50:11"
            }
        ]
        data = data.map(function(){
            console.log(arguments)
        })
        //Ext.chart.CartesianChart
        Ext.apply(me, {
            items: [{
                xtype: 'cartesian',
                reference: 'chart',
                width: '100%',
                height: 500,
                legend: {
                    type: 'sprite',
                    docked: 'right'
                },
                store: Ext.create("Ext.data.Store", {
                    fields: [
                        {
                            name: 'last_update_time',
                            type: 'date'
                        },
                        "key1", "key2", "key3", "key4", "key5", "key6", "key7", "key8",
                    ],
                    //data:data

                }),
                insetPadding: 40,
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['Present_Value'],
                        title: {
                            //text: 'SmartIO Data Record ',
                            text: "Present Value",
                            fontSize: 15
                        },
                        grid: true,
                    }, {
                        type: 'time',
                        grid: true,
                        //dateFormat: 'Y-m-d',
                        //visibleRange: [0, 1],
                        position: 'bottom',
                        fields: ['last_update_time'],
                        titleMargin: 12,
                        title: {
                            text: 'Time'
                        }
                    }],
                series: [
                    {
                        type: 'line',
                        style: {
                            stroke: 'rgba(0,0,0,0.8)',
                            lineWidth: 1
                        },
                        highlightCfg: {
                            scaling: 2
                        },
                        xField: 'last_update_time',
                        yField: 'Present_Value',
                        label: {
                            field: 'Object_Name',
                            display: 'over',
                            fontSize: 10,
                            translateY: 5, // lower label closer to the marker
                            renderer: function (val) {
                                //console.log(arguments)
                                return val
                            }
                        },
                        marker: {
                            type: 'circle',
                            fill: "white",
                            fx: {
                                duration: 200,
                                easing: 'backOut'
                            }
                        },
                        tooltip: {
                            trackMouse: true,
                            showDelay: 0,
                            dismissDelay: 0,
                            hideDelay: 0,
                            renderer: function (tooltip, record, item) {
                                var arr = ["Object Name :" + record.data.Object_Name,
                                    "Device Instance :" + record.data.device_instance,
                                    "Device Type :" + record.data.device_type,
                                    "Device Number :" + record.data.device_number,
                                    "Present Value :" + record.data.Present_Value,
                                    "Time :" + new Date(record.data.last_update_time).toLocaleString()]
                                if (record.data.message_number) {
                                    arr.push("message :" + record.data.message_number + "");
                                }
                                tooltip.setHtml(arr.join("<br>"))
                            }
                        }
                    }]
            }]
        })


        console.log("aaaaaa")

        me.callParent();
    },

})
;
