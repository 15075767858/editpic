/**
 * Created by liuzhencai on 16/7/1.
 */
Ext.define("graph.store.HistoryStore", {
    extend: "Ext.data.Store",
    //groupField: "Group",
    fields: [
        "ip",
        'port',
        'tablename',
        'keys',
    ],
    constructor: function (config) {
        var store = this;
        store.callParent([config]);
        store.setFilters([
            function (item) {
                if (store.filterIp) {
                    if (item.data.ip == store.filterIp) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            }
        ])
    },
    autoLoad: true,
    proxy: {
        type: "ajax",
        url: "resources/file.php?fileName=/mnt/nandflash/HistoryTable.xml&par=get",
        reader: {
            type: "xml",
            record: "item"
        }
    },

    // proxy:{

    // },
    //record:"item",
    listeners: {
        load: function (store, records, successful, operation, eOpts) {

        }
    }

})