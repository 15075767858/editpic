Ext.define('editpic.view.img.CanvasImgController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.img-canvasimg',
    resize: function (width,height) {
        var me = this.view;
        if(!width||!height)
        {
            return ;
        }
        console.log(arguments)
        me.refreshCanvas();
    },
    close:function () {
        var me = this.view;
        delete me.linkValue;
        me.clearInterval();
        var panel = me.up("picpanel");
        panel.getImages()

    }

});
