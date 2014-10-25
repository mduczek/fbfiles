var EMBEDLY_KEY = "0b64e3ab10db4b17ae716b327dafeb55";   

function isGoogleDriveFile(url) {
    if (url.search("google.com") !== -1)
        return true;
    return false;
}

function prepareGooglePreview(file) {
    var div = $("<div/>").addClass("file").attr("id", file.link);
    var iframe = $("<iframe/>").attr("src", file.link).addClass("iframe");
    div.append(iframe);
    var date = $("<div/>").text(file.date).addClass("date");
    div.append(date);
    var link = $("<div/>").text("Show");
    div.append(link);
    return div;
}

function prepareOtherFilePreview(file) {
    var div = $("<div/>").addClass("file").attr("id", file.link);
    var a = $("<a/>").attr("href", file.link);
    a.embedly({
        key: EMBEDLY_KEY
    });
    div.append(a);
    var date = $("<div/>").text(file.date).addClass("date");
    div.append(date);
    var link = $("<div/>").text("Show");
    div.append(link);
    return div;
}

function present_files(files) {
    $("#view").fadeOut(function() {

        for (var i = 0; i < files.length; i++) {
            var div;
            if (isGoogleDriveFile(files[i].link)) {
                div = prepareGooglePreview(files[i]);
            } else {
                div = prepareOtherFilePreview(files[i]);
            }
            $("#view_files").append(div);
        }
        $("#view_files").fadeIn();

    });
}
function present_folders(folders) {
    for (var i = 0; i < folders.length; i++) {
        var div = $("<div/>").addClass("folder").attr("id", folders[i].id);
        var icon = $("<div/>").addClass("icon");
        div.append(icon);
        var name = $("<div/>").addClass("name").text(folders[i].name);
        div.append(name);
        $("#view").append(div);
    }
}
function show_content() {
    var hash = window.location.hash;
    if (hash.length > 1) {
        var group_id = hash.substring(1);
        var group_name = $(hash).find(".name").text();
        var before = $("<a/>").attr("href", "#").text("Show all folders").addClass("back_to_root");

        $("h1").text(group_name).before(before);
        displayFolder(group_id);
    } else {
        $("#view_files").fadeOut(function () {
            $(this).empty();
            $("h1").text("Your group folders");
            $("#view").fadeIn();
            getGroups();
        });
        $(".back_to_root").remove();
    }
}
$(function() {
    show_content();

    $(window).on("hashchange", function() {
        show_content();
    });

    $(document).on("click", ".file", function () {
        window.open($(this).attr("id"), "_blank"); 
    });
});
