
function pageinit(){
    $('#dynamic-table').dataTable({
        "bJQueryUI": true,
        "processing": true,
        "bServerSide": true,
        "bSearchable":true,
        "sAjaxSource": "/member/list",
        "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
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
        }, {
            "mDataProp" : "nickname",
            "sDefaultContent" : "",
            "sClass" : "center"
        }, {
            "mDataProp" : "phone",
            "sDefaultContent" : "",
            "sClass" : "center"
        }, {
            "mDataProp" : "age",
            "sDefaultContent" : ""
        }]
    });

}

$(function($) {
    pageinit();
});