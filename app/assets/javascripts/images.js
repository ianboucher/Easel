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

  $('#crop_btn').on('click', function(e, data){
    $('#preview').cropper('getCroppedCanvas').toBlob(function (blob){
      var fileInput = $('#select_file')
      var croppedFile = new File([blob], fileInput[0].files[0].name);
      $('#uploadbutton').on('click', function(){
        $('#file_upload').fileupload('send', {files: [croppedFile]});
      });
    });
  });

  $(function () {
    $("img").draggable({
      snap: '#makeDroppable',
      snapMode: 'inner',
      snapTolerance: 50,
      revert: 'invalid'
    })
    $("#makeDroppable").droppable({
      drop: handleDropEvent
    })
  })

  $(document.forms[0]).on('submit', function(){
    var url = document.getElementById('preview1').src
    var xPos = document.getElementById('preview1').x
    var yPos = document.getElementById('preview1').y

    var posY = $("<input />", { type:'hidden', name: 'image_posY[]', value: yPos })
    var posX = $("<input />", { type:'hidden', name: 'image_posX[]', value: xPos })
    var input = $("<input />", { type:'hidden', name: 'image_url[]', value: url })
    $(document.forms[0]).append(input)
    $(document.forms[0]).append(posX)
    $(document.forms[0]).append(posY)
    // console.log(input)
  })

  function handleDropEvent( event, ui ) {
    // var offsetXPos = parseInt( ui.offset.left );
    // var offsetYPos = parseInt( ui.offset.top );
    // alert( "Drag stopped!\n\nOffset: (" + offsetXPos + ", " + offsetYPos + ")\n");
    // var form = $($('#select_file').parents('form:first'));
    // var posY = $("<input />", { type:'hidden', name: 'image_posY[]', value: offsetYPos })
    // var posX = $("<input />", { type:'hidden', name: 'image_posX[]', value: offsetXPos })
    // console.log($('#preview'))
    // form.append(posY);
    // form.append(posX);
  }


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
        // var input = $("<input />", { type:'hidden', name: 'image_url[]', value: url })
        // form.append(input);
        $('#preview1').attr('src', url );
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
