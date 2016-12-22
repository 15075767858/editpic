Ext.define('editpic.model.MonitorModel', {
    extend: 'Ext.data.Model',
    alias:"MonitorModel",
    fields: [
        {
            name: "ip", type: "string", defaultValue: location.host
        }, {
            name: "port", type: "int", defaultValue: "6379"
        }, {
            name: "key", type: "string"
        }, {
            name: "objectname", type: "string"
        },
        /*{
         name: "presentvalue", type: "string"
         },*/
        {
            name: "alarmtxt", type: "string", defaultValue: "ararmtxt"
        }, {
            name: "normaltxt", type: "string", defaultValue: "normaltxt"
        }
    ],

    getPresentValue: function () {
        var __this = this;
        Ext.Ajax.request({
            url: EventAlarmUrl,
            params: {
                par: "gettypevalue",
                ip: __this.get("ip"),
                port: __this.get("port"),
                nodename: __this.get("key"),
                type: "Present_Value"
            }
        }).then(function (response) {
            //console.log(response)
            if (response.status == 200) {
                __this.set("presentvalue", response.responseText);
            } else {
                __this.set("presentvalue", "unlink")
            }
        })
    },
    getObjcetName: function () {
        var __this = this;
        //console.log(__this.getValidation())
        Ext.Ajax.request({
            url: EventAlarmUrl,
            params: {
                par: "gettypevalue",
                ip: __this.get("ip"),
                port: __this.get("port"),
                nodename: __this.get("key"),
                type: "Object_Name"
            }
        }).then(function (response) {
            //console.log(response)
            if (response.status == 200) {
                __this.set("objectname", response.responseText);
            } else {
                __this.set("objectname", "unlink")
            }
        })
    },
    validators: {
        ip: {
            type: "format",
            matcher: /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
        },
        port: {
            type: "format",
            matcher: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        },
        key: {type: "length", min: "7", max: "7"}
    },
});
