Ext.define('editpic.view.panel.SetPicPanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel-setpicpanel',
    itemmouseenter: function (grid, record, item, index, e, eOpts) {

        var img = document.getElementById(record.data.id);

        if (img) {
            img.style.border = "3px solid red"
            img.style.background = "#00FF00"
            setTimeout(function () {
                img.style.border = null;
                img.style.background = null;
            }, 5000)
        }
    },
    itemmouseleave: function (grid, record, item, index, e, eOpts) {
        var img = document.getElementById(record.data.id);
        if (img) {
            img.style.border = null;
            img.style.background = null;
        }
    },
    select: function (view, record, index, eOpts) {
        var me = this.view;
        console.log(record)
        var singleFormPanel = Ext.getCmp("singleFormPanel");
        if (singleFormPanel) {
            //me.up("panel").remove(me.singleFormPanel);
            singleFormPanel.close()
        }

        singleFormPanel=Ext.create("editpic.view.panel.SetAPicPanel",{
            flex:1,
            record:record
        })

        singleFormPanel.loadRecord(record);
        var win = me.up("panel");
        win.add(singleFormPanel);
        /*
         me.singleFormPanel = Ext.create("Ext.form.Panel", {
         title: "detail design",
         closable: true,
         border: true,
         //viewModel:Ext.create("editpic.view.panel.SetPicPanelModel"),
         viewModel: {
         type: 'panel-setpicpanel'
         },
         controller: me.controller,
         defaults: {},
         flex: 1,
         //margin: "0 0 0 10",
         bodyPadding: 10,
         draggable: true,
         constrain: true,
         //height: "100%",


         tools: [{
         type: 'refresh',
         handler: function () {
         delete record.data.r;
         delete record.data.g;
         delete record.data.b;
         record.data.refreshCanvas()
         Ext.data.StoreManager.lookup("picdatas").load()

         }
         }],

         defaultType: 'textfield',
         items: [
         {name: "id", xtype: "hiddenfield", reference: "imgid"},

         {
         xtype: 'slider',
         width: "100%",
         disabled: true,
         fieldLabel: "Style",
         minValue: -100,
         reference: "rgbSlider",
         dirty: true,
         publishes: {
         value: true
         },
         //bind:"{rgbSlider}",
         value: 0,
         maxValue: 100,
         increment: 1,
         publishOnComplete: false,
         listeners: {
         change: function (slider, newValue, thumb, eOpts) {
         console.log(arguments)
         }
         }
         },
         {
         name: "r",
         fieldLabel: "Effect",
         bind: "{rgbSlider.value}",
         value: 0,
         xtype: 'slider',
         minValue: -100,
         width: "100%",
         maxValue: 100,
         listeners: {
         change: function (field, newValue, oldValue) {
         record.data.r = newValue
         record.data.refreshCanvas();

         }
         }
         },
         {
         name: "g",
         fieldLabel: "Bright",
         bind: "{rgbSlider.value}",
         value: 0,
         xtype: 'slider',
         minValue: -100,
         width: "100%",
         maxValue: 100,
         listeners: {
         change: function (field, newValue, oldValue) {
         record.data.g = newValue
         record.data.refreshCanvas();

         }
         }
         },
         {
         name: "b",
         fieldLabel: "Color",
         //bind: "{rgbSlider.value}",
         value: 0,
         xtype: 'slider',
         minValue: -100,
         width: "100%",
         maxValue: 100,
         listeners: {
         change: function (field, newValue, oldValue) {
         record.data.b = newValue
         record.data.refreshCanvas();

         }
         }
         },
         {
         name: "language", fieldLabel: "language", xtype: 'combo',
         store: ["中文", "English"]
         },
         {
         xtype: "container",
         defaults: {
         margin: "0 4 5 0"

         },
         items: [
         {
         xtype: "container",
         layout: "column",
         items: [
         {
         xtype: "checkbox",
         fieldLabel: "x",
         width: 130,
         handler: "checkedHandler"
         },
         {
         name: "x", fieldLabel: "x", xtype: 'numberfield',
         hideLabel: true,
         itemId: "checkfield",
         columnWidth: 1,
         //flex: 1,
         step: 10,
         listeners: {
         change: function (field, newValue, oldValue) {
         if (record.data) {
         var value = newValue + panel.body.getX();
         record.data.setX(value)
         }
         }
         }
         },
         ]
         },
         {
         xtype: "container",
         layout: "column",
         items: [
         {
         xtype: "checkbox",
         fieldLabel: "y",
         width: 130,
         handler: "checkedHandler"

         },
         {
         name: "y", fieldLabel: "y", xtype: 'numberfield',
         hideLabel: true,
         columnWidth: 1,
         itemId: "checkfield",
         step: 10,
         listeners: {
         change: function (field, newValue, oldValue) {
         if (record.data) {
         var value = newValue + panel.body.getY();
         record.data.setY(value)
         }
         }
         }
         }
         ]

         },
         {
         xtype: "container",
         layout: "column",
         items: [
         {
         xtype: "checkbox",
         fieldLabel: "width",
         width: 130,
         handler: "checkedHandler"
         },
         {
         name: "width", fieldLabel: "width", xtype: 'numberfield',
         step: 10,
         hideLabel: true,
         columnWidth: 1,
         itemId: "checkfield",
         minValue: 1,
         listeners: {
         change: function (field, newValue, oldValue) {
         if (record.data) {
         record.data.setWidth(newValue)
         }
         }
         }
         }
         ]
         },
         {
         xtype: "container",
         layout: "column",
         items: [
         {
         xtype: "checkbox",
         fieldLabel: "height",
         width: 130,
         handler: "checkedHandler"
         },
         {
         name: "height", fieldLabel: "height", xtype: 'numberfield',
         step: 10,
         hideLabel: true,
         columnWidth: 1,
         minValue: 1,
         itemId: "checkfield",
         listeners: {
         change: function (field, newValue, oldValue) {
         if (record.data) {
         record.data.setHeight(newValue)
         }
         }
         }
         },
         ]
         },
         ]
         },
         {
         name: "zIndex", fieldLabel: "Layer", value: 0, minValue: 0, xtype: 'numberfield',
         listeners: {
         change: function (field, newValue, oldValue) {
         if (record.data) {
         record.data.el.dom.style.zIndex = newValue;
         }
         }
         }
         }
         ]
         })
         */
    }
});
