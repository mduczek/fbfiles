function filter() {
    var query = $('#search_box').val();
    var regex = new RegExp(query, 'i');

    $('.folder').remove();
    var newList = new Array();

    var groups = JSON.parse(localStorage.getItem('groups'));
    for (var groupId in groups) {
        var group = groups[groupId];
        if (group['name'].match(regex) || filter == null) {
            var nameTag = $('<div>', {class: 'name'});
            nameTag.html(group['name']);

            var updateTag = $('<div>', {class: 'date'});
            updateTag.html(group['date']);

            var idTag = $('<div>', {class: 'folder', id: group['id']});
            var iconTag = $('<div>', {class: 'icon'});

            var newGroup = idTag
                .append(iconTag)
                .append(nameTag)
                .append(updateTag);
            
            // Stars go to the beginning, the rest to the end
            if (group['starred']) {
                newList.unshift(newGroup);
            } else {
                newList.push(newGroup);
            }
        }
    }

    $('.grid').append(newList.join(''));
}

$(document).ready(function() {
    $('#search_box').keyup(filter);
});


