// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {
  $('.directUpload').find("input:file").each(function(i, elem) {
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
      disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent),
      imageMaxWidth: 400,
      imageMaxHeight: 400,
      imageCrop: true, // Force cropped images

      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        progressBar.css('width', progress + '%')
      },
      start: function (e) {
        submitButton.prop('disabled', true); //disable submit button while image is loading

        progressBar.
          css('background', 'green').
          css('display', 'block').
          css('width', '0%').
          text("Loading...");
      },
      done: function(e, data) {
        submitButton.prop('disabled', false);
        progressBar.text("Uploading done");

        // extract key from S3 XML response and generate URL for image
        var key   = $(data.jqXHR.responseXML).find("Key").text();
        var url   = '//' + form.data('host') + '/' + key;

        // create hidden field containing image URL, which can then be stored in model
        var input = $("<input />", { type:'hidden', name: 'image_url[]', value: url })
        form.append(input);
      },
      fail: function(e, data) {
        submitButton.prop('disabled', false);

        progressBar.
          css("background", "red").
          text("Failed");
      }
    });
  });
});
