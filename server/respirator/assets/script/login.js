
function pageinit(){
    $("form").submit(function(){
        var queryString = $('form').serialize();
        $.post("admin/login",queryString,
            function(data){
                if(!data.success){
                    $(".modal-title").html(data.msg);
                    $("#showmodel").click();
                }else{
                    console.log(data.msg); //  2pm
                    location.href ="/"
                }
            }, "json");
        return false;
    });

}

$(function($) {
    pageinit();
});