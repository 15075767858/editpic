/**
 * Created by liuzhencai on 16/7/1.
 */
Ext.define("graph.store.HistoryRecord", {
    extend: "Ext.data.Store",
    //groupField: "Group",
    storeId: 'HistoryRecord',
    fields: [
        "ip",
        "port",
        "tablename",
        {
            name: "last_update_time",
            convert: function (val) {
                return new Date(val).getTime();
            }
        },
        "key1",
        "key2",
        "key3",
        "key4",
        "key5",
        "key6",
        "key7",
        "key8",
        "key1_value",
        "key2_value",
        "key3_value",
        "key4_value",
        "key5_value",
        "key6_value",
        "key7_value",
        "key8_value",
        
        'keys',
    ],
    constructor: function (config) {
        var store = this;
        store.callParent([config]);
       
    },
    autoLoad: true,
    
    listeners: {
        load: function (store, records, successful, operation, eOpts) {

        }
    }

})

function abcd(val) {
    //console.log(arguments)
}