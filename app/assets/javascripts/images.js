$(document).ready(function() {

  $('#select_file').on('change', function(e){
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#preview').attr('src', e.target.result); // insert preview image
          $('#preview').cropper() // initialize cropper on preview image
        };
      reader.readAsDataURL(e.target.files[0]); // triggers code above
    };
  });

  $('#crop_btn').on('click', function(){
    $('#preview').cropper('getCroppedCanvas').toBlob(function (blob){
      var fileInput = $('#select_file')
      var croppedFile = new File([blob], fileInput[0].files[0].name);
      $('#uploadbutton').on('click', function(){
        $('#file_upload').fileupload('send', {files: [croppedFile]});
      });
    });
  });

  function setPreview(src, preview) {
    document.getElementById(src).on('change', function(e){
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(preview).attr('src', e.target.result); // insert preview image
            document.getElementById(preview).cropper() // initialize cropper on preview image
          };
        reader.readAsDataURL(e.target.files[0]); // triggers code above
      };
    });
  };

  function uploadCroppedImage(cropBtn, preview, src, uploadBtn) {
    document.getElementById(cropBtn).on('click', function(){
      document.getElementById(preview).cropper('getCroppedCanvas').toBlob(function (blob){
        var fileInput = document.getElementById(src)
        var croppedFile = new File([blob], fileInput[0].files[0].name);
        document.getElementById(uploadBtn).on('click', function(){
          $('#file_upload').fileupload('send', { files: [croppedFile] });
        });
      });
    });
  };

  $(function () {
    var fileInput    = $('#file_upload');
    var form         = $(fileInput.parents('form:first'));
    var submitButton = form.find('input[type="submit"]');
    var progressBar  = $("<div class='bar'></div>");
    var barContainer = $("<div class='progress'></div>").append(progressBar);
    fileInput.after(barContainer);

    fileInput.fileupload({
      fileInput:        fileInput,
      url:              form.data('url'), //read AWS config via form attributes
      type:             'POST',
      autoUpload:       false, // prevent upload start on file selection
      formData:         form.data('form-data'), //read AWS config via form attributes
      paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
      dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
      replaceFileInput: false,

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
