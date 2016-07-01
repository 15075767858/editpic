/**
 * Created by liuzhencai on 16/7/1.
 */
Ext.define("editpic.store.PicDatas", {
    extend: "Ext.data.Store",
    fields: [
        'text',
        'width',
        'height',
        'src',
        "zIndex",
        "picId",
        {
            name: "src", calculate: function (data) {
            console.log(arguments)
        }
        },
        {
            name: "x", mapping: function (data) {

//            console.log(arguments)
            return data.getX() - data.up().getX();
        }
        },
        {
            name: "y", mapping: function (data) {

//            console.log(arguments)
            return data.getY() - data.up().getY();
        }
        }
    ]

})