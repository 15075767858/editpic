Ext.define('editpic.view.panel.PicPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel-picpanel',

    boxready: function (panel, width, height, eOpts) {
        var me = this;

        console.log(arguments)
        var marginTop = panel.el.getXY()[1];
        var marginLeft = panel.el.getXY()[0];
        console.log(marginTop)
        console.log(marginLeft)
        this.PanelDropTarget = new Ext.dd.DropTarget(panel.id, {
            ddGroup: "picgroup",
            notifyEnter: function (ddSource, e, data) {
                console.log(arguments)
            },
            notifyDrop: function (ddSource, e, data) {
                var selectRecord = ddSource.dragData.records[0].data;
                var url = selectRecord.url;
                console.log(arguments)
                var imgWidth = 25;
                var imgHeight = 25;
                var img = Ext.create('Ext.Img', {
                    src: url,
                    width: imgWidth,
                    height: imgHeight,
                    maxWidth: 200,
                    minWidht: 3,
                    maxHeight: 200,
                    minHeight: 3,
                    x: e.pageX - marginLeft - imgWidth / 2,
                    y: e.pageY - marginTop - imgHeight / 2,
                    draggable: true,
                    resizable: true,
                    //resizeHandles:"n",
                    zIndex: 1000
                })
                //console.log(img.getZIndex())
                panel.add(img)
                console.log(img)
                var imgEl = img.el;
                imgEl.dom.parentNode.style.zIndex = panel.maxIndex;
                imgEl.on({
                    click: function (e, t, eOpts) {
                        t.parentNode.style.zIndex = panel.maxIndex += 1;
                    },
                    mousemove: function (e, t, eOpts) {
                        //console.log(e)
                        console.log(this)
                        var text = [
                            "<div>width:" + img.width + "</div>",
                            "<div>height:" + img.height + "</div>",
                            "<div>left:" + parseInt(img.getX(true) - marginLeft) + "</div>",
                            "<div>top:" + parseInt(img.getY(true) - marginTop) + "</div>"
                        ].join("")

                        Ext.tip.QuickTipManager.register({
                            target: t.id, // Target button's ID
                            hideDelay: 0,
                            showDelay: 1,
                            trackMouse: true,
                            dismissDelay: 10000,
                            title: selectRecord.text,  // QuickTip Header
                            text: text
                        });

                    }
                })

                return true;
            }
        })
    },
    maxIndex: function () {
        console.log(arguments)
        console.log(this)
        return 1000;
    },
    onRemoveAll: function () {
        var me = this.view;
        console.log(arguments)
        console.log(this)
        me.removeAll();

    }


});
/*var surface = panel.getSurface();
 var img = Ext.create("Ext.draw.sprite.Image",{
 fillStyle: '#79BB3F',
 x: e.pageX-marginLeft-imgWidth/2,
 y: e.pageY-marginTop-imgHeight/2,
 src:selectRecord.url,
 height:imgWidth,
 width:imgHeight
 })
 console.log(img)
 surface.add(img)
 surface.renderFrame();*/

