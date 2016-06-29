
/**
 * This example shows how to create a scatter chart with custom icons.
 */
Ext.define('KitchenSink.view.charts.scatter.CustomIcons', {
    extend: 'Ext.panel.Panel',
    xtype: 'scatter-custom-icons',
    controller: 'scatter-custom-icons',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: 'fit',
    width: 650,

    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: 'onRefresh'
        },
        {
            text: 'Switch Theme',
            handler: 'onThemeSwitch'
        }
    ],

    items: [
        {
        xtype: 'cartesian',
        reference: 'chart',
        width: '100%',
        height: 500,

        axes: [
            {
                type: 'numeric',
                position: 'left',
                fields: ['g1', 'g2', 'g3', 'g4'],
                label: {
                    rotate: {
                        degrees: -30
                    }
                }
            },
            {
                type: 'category',
                position: 'bottom',
                fields: 'id'
            }
        ]
    }
    ]

});