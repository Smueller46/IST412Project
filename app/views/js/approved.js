var list =[];
$(document).ready(function(){
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
        if(button == 'rejected' && list.length > 0){
            for(var i =0; i <list.length; i++){
                console.log("id's to be rejected:" + list[i]);
            }
            $.post("/admin/internships", {
                rejectList: list,
                status: 'rejected'
            });
        } else if (button == 'approved' && list.length > 0){
            for(var i =0; i <list.length; i++){
                console.log("id's to be approved:" + list[i]);
            }
            $.post("/admin/internships", {
                approveList: list,
                status: 'approved'
            });
        }
        $('input:checkbox[name=select]').attr('checked',false);
        list.splice(0,list.length);
    });
}); 


