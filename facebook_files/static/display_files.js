function present_files(files) {
    $("#view").fadeOut(function() {
        $(this).empty();

        for (var i = 0; i < files.length; i++) {
            var div = $("<div/>").addClass("file");
            var iframe = $("<iframe/>").attr("src", files[0].link).addClass("iframe");
            div.append(iframe);
            var date = $("<div/>").text(files[i].date).addClass("date");
            div.append(date);
            var link = $("<div/>").text("Show");
            div.append(link);
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
        window.open($(this).find(".name").attr("id"), "_blank"); 
    });
});
