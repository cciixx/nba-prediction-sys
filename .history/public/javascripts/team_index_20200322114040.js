$(document).ready(function(){
    $.ajax({
        url:'http://locolhost:3000/team_index',
        type:'get' ,
        dataType: 'json',
        success: function(data){
        for(var i=0;i<data.length;i++){
            var img_src;
            var team_name;
            img_src = data[i].logo_path
            team_name = data[i].names
            $("#title").append("<a href = 'team.html?t_code="+team_name+"' target='_blank'><div class='A_team'><img src='" + img_src +"'> <div class='name_T'>"+ team_name+"</div></div></a>")
        }
        }
    })
})

/*{ <a href = 'team.html?t_name=team_name' target='_blank'>
    <div class='A_team'>
    <img src='" + img_src +"'> 
<div class='name_T'>"+ team_name+"</div>
</div></a>} */