// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


$(function () {
  $('#fileupload').find("input:file").each(function(i, elem) {
    var fileInput    = $(elem);
    console.log(fileInput);
    var form         = $(fileInput.parents('form:first'));
    var submitButton = form.find('input[type="submit"]');
    var progressBar  = $("<div class='bar'></div>");
    var barContainer = $("<div class='progress'></div>").append(progressBar);
    fileInput.after(barContainer);

    fileInput.fileupload({
        fileInput:        fileInput,
        url:              form.data('url'), //read from AWS config via form attribute
        type:             'POST',
        autoUpload:       true, // begin upload when user selects file
        formData:         form.data('form-data'), //read from AWS config via form attribute
        paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
        dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
        replaceFileInput: false,
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        }
    });
});
});

// data: { 'form-data' => (@s3_direct_post.fields), 'url' => @s3_direct_post.url,
// 'host' => URI.parse(@s3_direct_post.url).host }
