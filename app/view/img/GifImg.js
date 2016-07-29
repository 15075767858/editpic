Ext.define('editpic.view.img.GifImg', {
    extend: 'editpic.view.img.CanvasImg',

    requires: [
        'editpic.view.img.GifImgController',
        'editpic.view.img.GifImgModel'
    ],
    /*initComponent:function(){
     var me=this;

     me.callParent()
     },*/
    init: function (data) {
        var me = this;
        console.log(data)
        console.log(me)

        me.dynamicSrc = data.dynamicSrc;
        me.callParent(arguments)
        //me.callParent
    },
    refreshCanvas: function () {

        var me = this;
        me.callParent(arguments)
        console.log(me)

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
        //canvas.style.display = "none"
        if(canvas){
        canvas.style.zIndex = -1;
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
