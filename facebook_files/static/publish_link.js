$(document).ready(function() {
        $('#notify').click(send_notification);

        populate_groups();
});

function populate_groups() {
    var groupdown = $('#groupdown');
    var groups = JSON.parse(localStorage.getItem('groups'));
    $.each(groups, function() {
        groupdown.append($('<option />').val(this.id).text(this.name));
    });
}

function send_notification() {
    console.log('siema');
}
