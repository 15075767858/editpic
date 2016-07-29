Ext.define('editpic.view.img.CanvasImgController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.img-canvasimg',
    resize: function () {
        var me = this.view;
        console.log(arguments)
        me.refreshCanvas();
        /*var surface = me.getSurface();
        surface.removeAll()
        var context = surface.contexts[0];
        var img = new Image();
        img.src = me.src;
        img.onload = function () {

            context.drawImage(img, 0, 0, me.width, me.height);
            var imgData = context.getImageData(0, 0, me.width, me.height)
            var pixeData = imgData.data;

            console.log(pixeData)

            for (var i = 0; i < me.width * me.height; i++) {
                var r = pixeData[i * 4 + 0]
                var g = pixeData[i * 4 + 1]
                var b = pixeData[i * 4 + 2]
                if(me.r)
                pixeData[i * 4 + 0] = r*(me.r/100)
                if(me.g)
                pixeData[i * 4 + 1] = g*(me.g/100)
                if(me.b)
                pixeData[i * 4 + 2] = b*(me.b/100)
            }
            surface.removeAll()
            context.putImageData(imgData, 0, 0, 0, 0, me.width, me.height);
        }
        me.renderFrame();*/
    },
    destroy:function () {
        var me = this.view;
        delete me.linkValue;
        me.clearInterval();
        Ext.data.StoreManager.lookup("picdatas").load()
    }

});
