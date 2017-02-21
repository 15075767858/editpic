Ext.define('editpic.view.EventAlarm.ListenGrid', {
    extend: 'Ext.grid.Panel',
    alias: "ListenGrid",
    requires: [
        'editpic.view.EventAlarm.ListenGridController',
        'editpic.view.EventAlarm.ListenGridModel'
    ],

    controller: 'eventalarm-listengrid',
    viewModel: {
        type: 'eventalarm-listengrid'
    },
    height: 340,
    maxHeight: 340,
    closeListener: false,
    initComponent: function () {
        var me = this;
        me.initPrintSettring()

        me.initStore();
        me.audioInit();
        me.callParent();
        me.runListen();
        setTimeout(function () {
            me.initListenerNormal();
        }, 3000)
    },

    initPrintSettring: function () {
        var me = this;
        var m = Ext.createByAlias("PrintSettingModel")
        m.loadPrintSettingData(function () {
            me.printSettingModel = m;
        })
    },

    printLogs: function () {
        var me = this;
        var store = me.store;
        var items = store.data.items;

        var alarmModels = items.filter(function (v) {
            if (v.data.status == "alarm") {
                return true;
            } else {
                return false;
            }
        })
        console.log(alarmModels);
        return
        items.sort(function (a, b) {
            return a.data.time > b.data.time;
        })

        var number = me.printSettingModel.data.number
        var mode = me.printSettingModel.data.mode
        var printArr = [];
        for (var i = 0; i < number; i++) {

        }
        store.data.length;
    },
    initStore: function () {
        var me = this
        me.store = Ext.create("Ext.data.XmlStore", {
            model: Ext.createByAlias("ListenModel"),
            autoLoad: true,
            sorters: [
                {
                    sorterFn: function (record1, record2) {
                        var status1 = record1.data.status;
                        var status2 = record2.data.status;
                        var weights = {
                            hold: 1,
                            alarm: 0,
                            normal: -1
                        }
                        var w1 = weights[status1];
                        var w2 = weights[status2];
                        return (w1 > w2) ? 1 : (w1 === w2) ? 0 : -1;
                    },
                    direction: 'DESC'
                }
                , {
                    property: 'time',
                    direction: 'DESC'
                }
            ],
            proxy: {
                type: 'ajax',
                url: EventAlarmUrl + "?par=getAlarmhisXml",
                reader: {
                    type: 'xml',
                    record: "log",
                    rootProperty: "logs"
                }
            },
            listeners: {
                load: function (store, records) {

                },
                add: function (store, records) {
                    me.playAlarm()
                    me.printLogs();
                    console.log(this)
                }
            }
        })
    },
    getNormalModel: function () {

        var me = this, store = this.store, items = this.store.data.items;
        var models = items.filter(function (v, index) {
            if (v.data.status == 'normal') {
                return true;
            } else {
                return false;
            }
        })
        var arr = []
        for (var i = 0; i < models.length; i++) {
            var exist = arr.find(function (v, index) {
                if (models[i].comparisonModel(v)) {
                    return true;
                } else {
                    return false;
                }
            })
            if (!exist) {
                arr.push(models[i])
            }
        }
        return arr;
    },

    initListenerNormal: function () {
        var me = this;
        var store = me.store;
        //presentValueIs1
        setInterval(function () {

            var models = me.getNormalModel();
            for (var i = 0; i < models.length; i++) {
                store.getAt(i).getCloneModel(function (model) {
                    if (model) {
                        console.log(model)
                        store.add(model)
                    }
                })
            }
        }, 1800000)
        //30分钟1800000
    },
    tbar: [
        {
            text: "STOP", icon: EventRootUrl + "graph/resources/icons/alarm_24px.png", handler: function (button) {
            button.up("grid").pauseAlarm()
        }
        }, {
            text: "Print Setting",
            disabled: true,
            icon: EventRootUrl + "graph/resources/icons/print_24px.png",
            handler: "printSetting"
        }, {
            text: "DELETE",
            hidden: true,
            icon: EventRootUrl + "graph/resources/icons/delete_Trash_23.6px.png",
            handler: function (button) {
                var grid = button.up("grid")
                var selModels = grid.getSelection()
                if (selModels[0]) {
                    var selModel = selModels[0];
                    selModel.delLog(function (response) {
                        try {
                            var resJson = Ext.decode(response.responseText);
                            if (resJson.success) {
                                Ext.Msg.alert("Massage", "Delete ok " + resJson.info)
                                grid.store.remove(selModel);
                            }
                        } catch (e) {
                            console.log(e)
                            Ext.Msg.alert("Maasage", e)
                        }
                    })
                }
            }
        }, "->"
        , {
            text: "Event Alarm Setting", handler: function () {
                Ext.createByAlias("EventAlarmSetting")
            }
        }
    ],
    listeners: {
        boxready: function (grid) {
        },
        itemcontextmenu: "itemcontextmenu"
    },

    runListen: function () {
        var me = this;
        setInterval(function () {
            if (me.closeListener) {
                return;
            }
            me.getDiffJson()
        }, 3000)
    },
    getDiffJson: function () {
        var me = this;
        me.getAlarmconfJson(function (oldArr) {

            me.saveAlarmhisJsonfunction(function (length) {

                me.getAlarmconfJson(function (newArr) {
                    var diffArr = [];
                    for (var i = 0; i < oldArr.length; i++) {
                        newArr.find(function (json, index) {
                            if (json.ip == oldArr[i].ip & json.port == oldArr[i].port & json.key == oldArr[i].key & json.presentvalue != oldArr[i].presentvalue) {
                                diffArr.push(json);
                                //console.log(json)
                            }
                        })
                    }
                    if (diffArr.length > 0) {
                        console.log(diffArr)
                        me.addListenModels(diffArr)
                    }
                })
            })
        })
    },
    addListenModels: function (arr) {
        var me = this;
        for (var i = 0; i < arr.length; i++) {
            me.addListenModel(arr[i])
        }
    },

    addListenModel: function (json) {
        var me = this;
        json.time = new Date().getTime();
        var lm = Ext.createByAlias("ListenModel", json);
        lm.addLog(function (response) {
            try {
                var resJson = Ext.decode(response.responseText);
                me.store.insert(0, lm)
            } catch (e) {
                Ext.Msg.alert("Maasage", e)
            }
        })
        /*Ext.Ajax.request({
         url: EventAlarmUrl + "?par=addLog",
         params: json
         }).then(function (response) {
         console.log(response);
         try {
         var resJson = Ext.decode(response.responseText);
         me.store.insert(0, lm)
         } catch (e) {
         Ext.Msg.alert("Maasage", e)
         }
         })*/
        /*lm.save({
         callback: function (record, operation, success) {
         if (success) {
         me.store.insert(0, lm)
         //me.playAlarm();
         } else {
         Ext.Msg.alert("Maasage", operation.error)
         }
         console.log(arguments)
         // do something whether the save succeeded or failed
         }
         })*/
    },
    saveAlarmhisJsonfunction: function (success) {
        Ext.Ajax.request({
            url: EventAlarmUrl,
            params: {
                par: "saveAlarmhisJson"
            }
        }).then(function (response) {
            success(response.responseText)
        })
    },
    getAlarmconfJson: function (success) {
        var me = this;
        Ext.Ajax.request({
            url: EventRootUrl + "graph/alarmconf.json",
        }).then(function (response) {
            try {
                var resArr = Ext.decode(response.responseText);
                if (response.status == 200) {
                    success(resArr);
                }
            } catch (e) {
                //console.log(e)
                throw new Error(e)
                ///Ext.Msg.alert("Error", e)
            }
        })
    },
    viewConfig: {
        getRowClass: function (record, index, rowParams, store) {
            return record.data.status;
        }
    },
    columns: [
        {text: "ip", dataIndex: "ip", flex: 1},
        {text: "port", dataIndex: "port", flex: 1},
        {text: "key", dataIndex: "key", flex: 1},
        {text: "object name", dataIndex: "objectname", flex: 1},
        {text: "present value", dataIndex: "presentvalue", flex: 1},
        {
            text: "alarmtxt", dataIndex: "alarmtxt", flex: 1, renderer: function (v) {
            return Ext.util.Base64.decode(v);
        }
        },
        {
            text: "normaltxt", dataIndex: "normaltxt", flex: 1, renderer: function (v) {
            return Ext.util.Base64.decode(v);
        }
        },
        {
            text: "time", dataIndex: "time", flex: 2, renderer: function (v) {
            return new Date(v).toLocaleString()
        }
        },
        /*{
         text: "status", dataIndex: "status", renderer: function (value, metaData) {
         console.log(arguments)
         metaData.css="red";
         metaData.tdStyle = 'color:red';
         return value;
         }
         }*/
    ],
    audioInit: function () {
        /*<audio id="audio">
         <source src="http://ossweb-img.qq.com/images/lol/m/act/a20160315live/shake_sound_male.mp3" type="audio/mpeg">
         Your browser does not support the audio tag.
         </audio>*/
        var me = this;
        var alarmAudio = document.createElement("audio");
        var alarmSource = document.createElement("source");
        alarmAudio.id = "alarmAudio";
        alarmSource.src = "resources/audio/alarm.mp3";
        alarmSource.type = "audio/mpeg"
        alarmAudio.appendChild(alarmSource);
        alarmAudio.loop = true;
        document.body.appendChild(alarmAudio);
        me.alarmAudio = alarmAudio;
        var eventAudio = document.createElement("audio")
        eventAudio.id = "eventAudio";
        eventAudio.src = "resources/audio/event.mp3";
        eventAudio.loop = true;
        document.body.appendChild(eventAudio);
        me.eventAudio = eventAudio;
    },
    playAlarm: function () {
        var me = this;
        var win = me.up("window")
        console.log(win)
        win.show()
        win.expand()
        //win.toggleCollapse()
        this.alarmAudio.play()
    },
    pauseAlarm: function () {
        this.alarmAudio.pause()
    },
    playEvent: function () {
        this.eventAudio.play()
    },
    pauseEvent: function () {
        this.alarmAudio.pause()
    }
});
