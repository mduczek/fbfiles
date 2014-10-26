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
    console.log('sending.. ' + groupId);

    FB.api(
            '/' + groupId + '/feed',
            'POST',
            {
                'message': $('#post').text() + '\n' + $('#link').text()
            },
            function(response) {
                console.log(response);
            }
          );
}
