function present_files(files) {
    $("#view").fadeOut(function() {
        $(this).empty();

        for (var i = 0; i < files.length; i++) {
            $.ajax({
                url: files[0].link,
                success: function(data) {
                    var matches = data.match(/<title>(.*?)<\/title>/);
                    var div = $("<div/>").addClass("file").append("<div class=\"icon\"></div>");
                    var name = $("<div/>").text(matches[0]).attr("id", files[i].link).addClass("name");
                    div.append(name);
                    var date = $("<div/>").text(files[i].date).addClass("date");
                    div.append(date);
                    $(this).append(div);
                }   
            });
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
