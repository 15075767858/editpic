Ext.define('editpic.view.img.GifImg', {
    extend: 'editpic.view.img.CanvasImg',

    /*requires: [
     'editpic.view.img.GifImgController',
     'editpic.view.img.GifImgModel'
     ],*/
    /*initComponent:function(){
     var me=this;

     me.callParent()
     },*/
    init: function (data) {
        var me = this;
        me.callParent(arguments)

        me.dynamicSrc = data.dynamicSrc;
        //console.log(data)

        //me.callParent
    },
    getInitData: function () {
        var me = this;
        var data = me.callParent()
        data.dynamicSrc = me.dynamicSrc;
        data.itype = me.itype;

        return data;
    },
    refreshCanvas: function () {

        var me = this;
        me.callParent(arguments)
        //console.log(me)

        var img = new Image()

        if (me.getLinkValue()) {
            img.src = me.dynamicSrc
        } else {
            img.src = me.src;
        }
        var beforeImg = me.el.dom.querySelector("img")

        if (beforeImg) {
            beforeImg.parentNode.removeChild(beforeImg);
        }

        var canvas = me.el.dom.querySelector("canvas")
        //console.log(canvas)
        canvas.style.display = "none"
        if (canvas) {
            canvas.style.zIndex = -10;
            canvas.style.left = me.width;

            img.style.width = me.width + "px"
            img.style.height = me.height + "px"
            canvas.parentNode.appendChild(img)
        }

    }
    /*

     controller: 'img-gifimg',
     viewModel: {
     type: 'img-gifimg'
     },
     */


});
