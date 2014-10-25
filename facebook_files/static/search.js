$(document).ready(function() {
    $('#search_box').keyup(filter);
});

function filter() {
    var query = $('#search_box').val();
    var regex = new RegExp(query, 'i');

    $('.list').empty();
    var newList = new Array();

    var groups = localStorage.getItem('groups');
    for (var groupId in groups) { // (id, (name, date, starred))
        var group = groups[groupId];
        if (group['name'].match(regex) || filter == null) {
            var nameTag = $('<div>', {class: 'name'});
            nameTag.html(group['name']);

            var updateTag = $('<div>', {class: 'date'});
            updateTag.html(group['date']);

            var idTag = $('<div>', {class: 'folder', id: group['id']});
            var iconTag = $('<div>', {class: 'icon'});

            var newGroup = idTag.append(iconTag, nameTag, updateTag);
            
            // Stars go to the beginning, the rest to the end
            if (group['starred']) {
                newList.unshift(newGroup);
            } else {
                newList.push(newGroup);
            }
        }
    }

    $('.list').append(newList.join(''));
}

