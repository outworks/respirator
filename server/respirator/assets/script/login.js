
function pageinit(){
    $("form").submit(function(){
        var queryString = $('form').serialize();
        alert(queryString);
        $.post("admin/login",queryString,
            function(data){
                if(!data.success){
                    $(".modal-title").html(data.msg);
                    $("#showmodel").click();
                }else{
                    console.log(data.msg); //  2pm
                    location.href ="home"
                }
            }, "json");
        return false;
    });

}

$(function($) {
    pageinit();
});