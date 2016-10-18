Ext.define('editpic.view.panel.ToolsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: "toolspanel",
    requires: [
        'editpic.view.panel.ToolsPanelController',
        'editpic.view.panel.ToolsPanelModel'
    ],
    title: "Tools",
    controller: 'panel-toolspanel',
    viewModel: {
        type: 'panel-toolspanel'
    },
    id:"toolPanel",
    width: 100,
    bodyPadding: 10,
    resizable: true,
    scrollable:"y",
    collapsible:true,
    collapsed:true,

    //collapsed:true,
    initComponent: function () {
        var me = this;


        /*       me.items=Ext.create('Ext.view.View', {
         store:Ext.create('Ext.data.Store', {
         id:'imagesStore',
         model: 'Image',
         fields:["src",'caption'],

         }),
         tpl: new Ext.XTemplate(
         '<tpl for=".">',
         '<div style="text-align: center;margin:0 0 20px 0;" class="thumb-wrap">',
         '<img style="width: 40px" src="{src}" />',
         '<br/><span>{caption}</span>',
         '</div>',
         '</tpl>'
         ),
         itemSelector: 'div.thumb-wrap',
         emptyText: 'No images available',
         });*/

        me.callParent()
    },
    listeners: {
        boxready: function () {
            var me = this;
            var data = [
                {src: 'resources/icons/input2.png', caption: 'input',itype:2,disabled:false},
                {src: 'resources/icons/logview.png', caption: 'link',type:0,itype:3,disabled:false},
                {src: 'resources/icons/text_48px.png', caption: 'text',itype:4,disabled:false},
                {src: 'resources/icons/dynamictext2.png', caption: 'dynamic text',itype:5,disabled:false},
                //{src: 'resources/icons/slider_16px.png', caption: 'slider',itype:6,disabled:true},
                {src: 'resources/icons/url2.png', caption: 'url',type:0,itype:7,disabled:true},
                {src: 'resources/icons/clock.png', caption: 'clock',itype:8,disabled:false},
                {src: 'resources/icons/OnOff.png', caption: 'on off',itype:10,disabled:true},
                {src: 'resources/icons/path.png', caption: 'path',itype:11,disabled:true},
                {src: 'resources/icons/schdule.png', caption: 'schdule',itype:12,disabled:false},
                {src: 'resources/icons/time.png', caption: 'time',itype:13,disabled:false},
                {src: 'resources/icons/video.png', caption: 'video',itype:14,disabled:true},
                {src: 'resources/icons/weather.png', caption: 'weather',itype:15,disabled:true},
                {src: 'resources/icons/devices_48px.png', caption: 'devices',itype:16,disabled:false}
            ]

            for (var i = 0; i < data.length; i++) {
                var panel = Ext.create("Ext.panel.Panel", {
                    margin:"10",
                    height:75,
                    disabled:data[i].disabled,

                    html: [
                        "<div  style='text-align: center;'><image style='width: 40px;' src=" + data[i].src + "></div>",
                        "<div style='text-align: center;'>" + data[i].caption + "</div>"
                    ],
                })

                me.add(panel)
                var dd = new Ext.dd.DragSource(panel.el.dom, {
                    ddGroup: "picgroup",
                    isTarget: false,
                    dragData:{
                        itype:data[i].itype
                    }
                })
                dd.afterDrag=function(){
                    console.log(arguments)
                }


            }
        }
    }
});

