$(function() {
    $(".folder").click(function () {
        var group_id = $(this).attr("id");

        var files = displayFolder(group_id);

        $("#view").fadeOut(function() {
            $(this).empty();

            for (var i = 0; i < files.length; i++) {
                var div = $("<div/>").addClass("file").append("<div class=\"icon\"></div>");
                var name = $("<div/>").text("File name").attr("id", files[i].link).addClass("name");
                div.append(name);
                var date = $("<div/>").text(files[i].date).addClass("date");
                div.append(date);
                $(this).append(div);
            }
            $(this).fadeIn();

        });
    });
});
