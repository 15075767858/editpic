Ext.define('editpic.view.EventAlarm.SelectKeyWinodwModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eventalarm-selectkeywinodw',
    data: {
        name: 'editpic',
        filterKey: "111",
        filterObj: "222",
    },
    formulas: {
        store: {
            get: function (get) {
                console.log(arguments)
                console.log(this)
                return Ext.create("Ext.data.TreeStore", {

                    filters: [function (item) {
                        console.log(item)
                        return true;
                    }],
                    autoLoad: true,
                    url: EventRootUrl + "graph/resources/main.php?par=nodes",
                    proxy: {
                        type: "ajax",
                        url: EventRootUrl + "graph/resources/main.php?par=nodes&ip=" + "127.0.0.1" + "&port=" + "6379" + "",
                        reader: {
                            type: "json"
                        }
                    }
                })
            }
        }
    }

});
