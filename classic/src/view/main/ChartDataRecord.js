
Ext.define('graph.view.chart.ChartDataRecord',{
    extend: 'Ext.chart.CartesianChart',
    alias:"ChartDataRecord",
    requires: [
        'graph.view.chart.ChartDataRecordController',
        'graph.view.chart.ChartDataRecordModel'
    ],

    controller: 'chart-chartdatarecord',
    viewModel: {
        type: 'chart-chartdatarecord'
    },
    reference: 'chart',
    width: "100%",
    height: 500,
    insetPadding: 40,
    innerPadding: {
        left: 18,
        right: 18,
        top: 18
    },
    tbar: {
        itemId: "toolbar",
        items: [
            '->',
            {
                hidden: true,
                text: 'Refresh',
                handler: 'onRefresh'
            },
            {
                hidden: true,
                text: 'Switch Theme',
                handler: 'onThemeSwitch'
            },
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
    animation: {
        duration: 200
    },
    listeners: {
        itemhighlightchange: function (chart, newHighlightItem, oldHighlightItem) {
            this.setSeriesLineWidth(newHighlightItem, 3, "#FF1111");
            this.setSeriesLineWidth(oldHighlightItem, 2, "#30BDA7");
            //console.log(arguments)
        },
        afterrender: function () {
            //console.log(this)
            var chart = this;
            var toolbar = this.getComponent('toolbar');
            console.log(toolbar)
            var panzoom = chart.getInteractions()[0];
            panzoom.getModeToggleButton()

            toolbar.add(panzoom.getModeToggleButton());
        }
    },
    setSeriesLineWidth: function (item, lineWidth, stroke) {
        if (item) {
            item.series.setStyle({
                lineWidth: lineWidth,
                //stroke:stroke
            });
        }
    },
    sprites: [{
        type: 'text',
        text: 'SmartIO Tools Data Record ',
        fontSize: 22,
        width: 100,
        height: 30,
        x: 40, // the sprite x position
        y: 30  // the sprite y position
    }],
    interactions: [
        {
            type: 'panzoom',
            zoomOnPan: true
        }
        //'itemhighlight'
    ],

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
        fields: ['last_update_time', "Object_Name"],
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
                    arr.push("message :"+record.data.message_number+"");
                }
                tooltip.setHtml(arr.join("<br>"))
            }
        }
    }]
});
