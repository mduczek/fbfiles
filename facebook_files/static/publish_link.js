$(document).ready(function() {
        $('#notify').click(send_notification);

        populate_groups();
});

function populate_groups() {
    var groupdown = $('#groupdown');
    var groups = JSON.parse(localStorage.getItem('groups'));
    $.each(groups, function(key, value) {
        groupdown.append($('<option />').val(key).text(value));
    });
}

function send_notification() {
    var groupId = $('#groupdown').val();
    console.log('sending.. ' + groupId);

    
}
