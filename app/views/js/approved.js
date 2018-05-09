var list =[];
$(document).ready(function(){
    var type = null;
    var route = null;
    var title = $(document).find("title").text();
    if(title == 'Admin_internship') {
        type = 'internship';
        route = 'internship';
    }
    else if (title == 'Admin_account') {
        type ="user";
        route = "user";
    }
    else if (title == 'Admin_scholarship') {
        type = 'scholarship';
        route = 'scholarship';
    }
    $('input:checkbox[name=select]').change( function () {
        var isChecked = $(this).is(":checked");        
        if(isChecked) {
            var objectID = $(this).closest('tr').children('td.objectID').text();
            list.push(objectID);
        } else {
            var objectID = $(this).closest('tr').children('td.objectID').text();
            var index = list.indexOf(objectID);
            list.splice(index,1);
        }
        console.log(list.length);
    });
    $('button').click(function(){
        var button = $(this).val();
        console.log(route + " " + type)
        if(button == 'rejected' && list.length > 0){
            for(var i =0; i <list.length; i++){
                console.log("id's to be rejected:" + list[i]);
            }
            $.post("/admin/" + route, {
                rejectList: list,
                status: 'rejected',
                type: type
            });
        } else if (button == 'approved' && list.length > 0){
            for(var i =0; i <list.length; i++){
                console.log("id's to be approved:" + list[i]);
            }
            $.post("/admin/" + route, {
                approveList: list,
                status: 'approved',
                type: type
            });
        }
        $('input:checkbox[name=select]').attr('checked',false);
        list.splice(0,list.length);
    });
}); 


