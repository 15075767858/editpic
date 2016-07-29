Ext.define('editpic.view.panel.ToolsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: "toolspanel",
    requires: [
        'editpic.view.panel.ToolsPanelController',
        'editpic.view.panel.ToolsPanelModel'
    ],
    title:"Tools",
    controller: 'panel-toolspanel',
    viewModel: {
        type: 'panel-toolspanel'
    },
    width:100,
    bodyPadding:10,
    resizable:true,
    initComponent: function () {
        var me = this;
        Ext.define('Image', {
            extend: 'Ext.data.Model',
            fields: [
                { name:'src', type:'string' },
                { name:'caption', type:'string' }
            ]
        });

        Ext.create('Ext.data.Store', {
            id:'imagesStore',
            model: 'Image',
            data: [
                { src:'resources/icons/input_tablet_48px.png', caption:'input' },
                { src:'resources/icons/slider_16px.png', caption:'slider' },
                { src:'resources/icons/url_48px.png', caption:'url' },
                { src:'resources/icons/link.png', caption:'link' },
            ]
        });
        var imageTpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div style="text-align: center;margin:0 0 20px 0;" class="thumb-wrap">',
            '<img style="width: 40px" src="{src}" />',
            '<br/><span>{caption}</span>',
            '</div>',
            '</tpl>'
        );

        me.items=Ext.create('Ext.view.View', {
            store: Ext.data.StoreManager.lookup('imagesStore'),
            tpl: imageTpl,

            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images available',
            renderTo: Ext.getBody()
        });

        me.callParent()
    }
});

