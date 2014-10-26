$(document).ready(function() {
        $('#notify').click(send_notification);

        populate_groups();
});

function populate_groups() {
    var groupdown = $('#groupdown');
    var groups = JSON.parse(localStorage.getItem('groups'));
    $.each(groups, function(id, group) {
        groupdown.append($('<option />').val(id).text(group.name));
    });
}

function send_notification() {
    var groupId = $('#groupdown').val();
    var fullMsg = $('#post').text() + '\n' + $('#link').text();
    console.log('sending.. ' + groupId);
    console.log(fullMsg);

    FB.api(
            '/' + groupId + '/feed',
            'POST',
            {
                'message': fullMsg
            },
            function(response) {
                console.log(response.error);
            }
          );
}
