
function pageinit(){
    $('#dynamic-table').dataTable({
        "bJQueryUI": true,
        "processing": true,
        "bServerSide": true,
        "bSearchable":true,
        "sAjaxSource": "/monidata/list",
        "sPaginationType": "bootstrap",
        "iDisplayLength":10,
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page",
            "oPaginate": {
                "sPrevious": "Prev",
                "sNext": "Next"
            }
        },
        "aoColumnDefs": [{
            'bSortable': false,
            'aTargets': [0]
        }
        ],
        "aoColumns" : [{
            "mDataProp" : "mid",
            "sDefaultContent" : ""//此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
        },{
            "mDataProp" : "username",
            "sDefaultContent" : "" //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
        },{
            "mDataProp" : "saveTime",
            "sDefaultContent" : "" //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
        },{
            "mDataProp" : "pef",
            "sDefaultContent" : "" //此列默认值为""，以防数据中没有此值，DataTables加载数据的时候报错
        }, {
            "mDataProp" : "fev1",
            "sDefaultContent" : ""
        }, {
            "mDataProp" : "fvc",
            "sDefaultContent" : ""
        }]
    });

}

$(function($) {
    pageinit();
});