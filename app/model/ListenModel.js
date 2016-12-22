Ext.define('editpic.model.ListenModel', {
    extend: 'Ext.data.Model',
    alias:"ListenModel",
    fields: [
        {name: "ip", type: "string"},
        {name: "port", type: "string"},
        {name: "key", type: "string"},
        {name: "objectname", type: "string"},
        {name: "presentvalue", type: "string"},
        {name: "alarmtxt", type: "string"},
        {name: "normaltxt", type: "string"},
        {
            name: "time", type: "int"
        }
    ],
    proxy: {
        type: 'post',
        url: EventAlarmUrl + "?par=addLog"
    }
});
