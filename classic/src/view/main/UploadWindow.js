/**
 * Created by liuzhencai on 16/8/13.
 */
Ext.define("editpic.view.window.UploadWindow", {
    extend: "Ext.window.Window",
    alias: "uploadwindow",
    requires: [
        "Ext.grid.column.*",
        'Ext.ProgressBarWidget',
        "Ext.grid.*"
    ],

    layout: "border",
    title: "Upload Files",
    autoShow: true,
    width: 800,
    height: 600,
    initUpload: function () {
        var me = this;

        me.uploader = new plupload.Uploader({
            browse_button: 'UploadWindowSelectFiles', //触发文件选择对话框的按钮，为那个元素id
            //url: 'resources/main.php?par=uploadGraphFiles', //服务器端的上传页面地址
            url: me.url||'/upload.php?par=upload', //服务器端的上传页面地址
            flash_swf_url: 'resources/js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
            silverlight_xap_url: 'resources/js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
            drop_element: me.getId(),
            filters: {
                max_file_size: '2mb',
                prevent_duplicates: false,
                mime_types: [
                    //{title : "Image files", extensions : "jpg,gif,png"},
                    //{title : "Zip files", extensions : "zip"}
                    //{title : "Tar files", extensions : "tar"}
                ]
            }
        });
        me.uploader.init();
        var store;
        var filesData = [];
        store = Ext.create("Ext.data.Store", {
            storeId: "UploadWindowSelectFilesStore",
            fields: ["loaded", "name", "loaded",
                {
                    name: "progress", calculate: function (data) {
                    return data.loaded / data.size;
                }
                }, "lastModifiedDate", "size", "status", "type"],
            data: filesData
        })
        //绑定各种事件，并在事件监听函数中做你想做的事
        me.uploader.bind('FilesAdded', function (uploader, files) {
            console.log(arguments)
            for (var i = 0; i < files.length; i++) {
                console.log(files[i].getSource())
                console.log(files[i].getNative())
                filesData.push(files[i]);
            }
            store.reload(filesData)
            console.log(files)
            me.down("grid").setStore(store)
            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        });

        me.uploader.bind('UploadProgress', function (uploader, file) {
            console.log(file)

            //var store = Ext.data.StoreManager.lookup('UploadWindowSelectFilesStore');
            store.getById(file.id).set("loaded", file.loaded)
            store.reload()

            //每个事件监听函数都会传入一些很有用的参数，
            //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
        });

        me.uploader.bind("FileUploaded",me.fieuploaded||function(){
             console.log("FileUploaded")
             console.log(arguments)
            }
        )
        me.uploader.bind("UploadComplete", me.uploadcomplete||function(){
                console.log("UploadComplete")
                console.log(arguments)
            }
        )
    },
    listeners: {
        boxready: function () {
            this.initUpload()
        },
        destroy: function () {
            this.uploader.destroy()
        }
    },
    initComponent: function () {
        this.tbar = [
            {text: "Select Files", id: "UploadWindowSelectFiles"}
        ]
        this.buttons = [

            {
                text: "Upload", id: "UploadWindowUpdataFiles", scope: this, handler: function () {
                var me = this;
                me.uploader.start()
            }
            },
            {
                text: "Close", scope: this, handler: function () {
                this.close()
            }
            }
        ]

        this.items = [
            {
                xtype: "grid",
                width: "100%",
                height: "100%",
                region: 'center',
                selModel: {
                    type: 'spreadsheet'
                },
                columns: [
                    {text: 'name', dataIndex: 'name', flex: 1},

                    {
                        text: 'size', dataIndex: 'size', flex: 1, renderer: function (val) {
                        return Ext.util.Format.fileSize(val)
                    }
                    },
                    {
                        text: 'lastModifiedDate', dataIndex: 'lastModifiedDate', flex: 1, renderer: function (val) {
                        return new Date(val).toLocaleString()
                    }
                    },
                    {text: 'type', dataIndex: 'type', flex: 1},
                    {
                        text: 'progress', dataIndex: 'progress', xtype: "widgetcolumn", flex: 1, renderer: function () {
                        return "20"
                    }, widget: {
                        xtype: 'progressbarwidget',
                        textTpl: [
                            '{percent:number("0")}%'
                        ]
                    }
                    }
                ]
            }
        ]
        this.callParent();
    }
});


