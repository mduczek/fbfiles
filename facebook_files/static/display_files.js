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
        $(this).empty();

        for (var i = 0; i < files.length; i++) {
            var div;
            if (isGoogleDriveFile(files[i].link)) {
                div = prepareGooglePreview(files[i]);
            } else {
                div = prepareOtherFilePreview(files[i]);
            }
            $(this).append(div);
        }
        $(this).fadeIn();

    });
}
$(function() {
    $(".folder").click(function () {
        var group_id = $(this).attr("id");
        var group_name = $(this).find(".name").text();
        $("h1").text(group_name);

        displayFolder(group_id);
    });
    $(document).on("click", ".file", function () {
        window.open($(this).attr("id"), "_blank"); 
    });
});
