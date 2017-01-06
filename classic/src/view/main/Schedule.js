
Ext.define('graph.view.window.Schedule',{
    extend: 'Ext.window.Window',

    requires: [
        'graph.view.window.ScheduleController',
        'graph.view.window.ScheduleModel'
    ],

    controller: 'window-schedule',
    viewModel: {
        type: 'window-schedule'
    },
    items:[
        {
            xtype:"tab",
            item:[
                {title:"aaa"},
                {title:"aaa"},
                {title:"aaa"},
            ]
        }
    ]
});
