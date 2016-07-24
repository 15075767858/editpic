Ext.define('editpic.view.img.CanvasImg', {
    extend: 'Ext.draw.Container',
    xtype: "canvasimg",
    requires: [
        'editpic.view.img.CanvasImgController',
        'editpic.view.img.CanvasImgModel',
        'Ext.draw.plugin.SpriteEvents'
    ],
    draggable: true,
    resizable: true,
    controller: 'img-canvasimg',
    viewModel: {
        type: 'img-canvasimg'
    },
    plugins: 'spriteevents',
    initComponent: function () {
        var me = this;
        me.callParent();


    },
    bodyStyle: {
        background: "transparent"
    },
    sprites: [],
    linkData:function(nodename,type){
        var me=this;
        me.linkName=nodename;
        me.linkType=type;

        clearInterval(me.interval);
        me.interval = setInterval(function(){
            My.Ajax("resources/main.php?par=gettypevalue&nodename="+nodename+"&type="+type,function(response){
              me.linkValue=response.responseText;
                me.b=response.responseText;
                me.refreshCanvas();
            })
            Ext.data.StoreManager.lookup("picdatas").load()

        },1000)
    },
    refreshCanvas: function () {
        var me = this;
        var surface = me.getSurface();
        surface.removeAll()
        var context = surface.contexts[0];
        var img = new Image();
        img.src = me.src;
        img.onload = function () {

            context.drawImage(img, 0, 0, me.width, me.height);
            var imgData = context.getImageData(0, 0, me.width, me.height)
            var pixeData = imgData.data;

            //console.log(pixeData)

            for (var i = 0; i < me.width * me.height; i++) {
                var r = pixeData[i * 4 + 0]
                var g = pixeData[i * 4 + 1]
                var b = pixeData[i * 4 + 2]

                if(!me.block){
                var grey = r * 0.3 + g * 0.59 + b * 0.11
                pixeData[i * 4 + 0] = grey
                pixeData[i * 4 + 1] = grey
                pixeData[i * 4 + 2] = grey
                }

                if(me.r)
                    pixeData[i * 4 + 0] = r*((100-me.r)/100)
                if(me.g)
                    pixeData[i * 4 + 1] = g*((100-me.g)/100)
                if(me.b)
                    pixeData[i * 4 + 2] = b*((100-me.b)/100)
            }
            surface.removeAll()
            context.putImageData(imgData, 0, 0, 0, 0, me.width, me.height);
        }
        me.renderFrame();
    },
    listeners: {
        resize: "resize",
        spriteclick: function () {
            console.log(arguments)
        }

    }
});
