// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function() {
  $('.directUpload').on('change', function(e, data){
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#target').attr('src', e.target.result); // insert preview image
          $('#target').cropper() // initialize cropper on preview image
        };
      reader.readAsDataURL(e.target.files[0]); // triggers code above (?)
    };
  })

  $('#uploadart').on('click', function(){
    var canvas = document.getElementById('cropped_img')
    var ctx = canvas.getContext("2d");
    var img = $('#target').cropper('getCroppedCanvas');
    ctx.drawImage(img, 10, 10);
    // $('#target').cropper('getCroppedCanvas').toBlob(function (blob){
    //   var file = new File([blob], 'cropped.png')
    //   console.log(file)
      // console.log(canvas)
    // })

  })
  var uploader = new qq.s3.FineUploader({
    debug: true,
    element: document.getElementById('fine-uploader'),
    request: {
        endpoint: 'http://s3easel.s3.amazonaws.com',
        accessKey: 'AKIAIJYNQYAR2LMBMWBA'
    },
    signature: {
        endpoint: '/s3/signature'
    },
    uploadSuccess: {
        endpoint: '/s3/success'
    },
    iframeSupport: {
        localBlankPagePath: '/success.html'
    }
  })
});
//   $('.directUpload').find("input:file").each(function(i, elem) {
//     var fileInput    = $(elem);
//     var form         = $(fileInput.parents('form:first'));
//     var submitButton = form.find('input[type="submit"]');
//     var progressBar  = $("<div class='bar'></div>");
//     var barContainer = $("<div class='progress'></div>").append(progressBar);
//     // fileInput.after(barContainer);
//     fileInput.fileupload({
//       // fileInput:        fileInput,
//       url:              form.data('url'), //read AWS config via form attributes
//       type:             'POST',
//       autoUpload:       false, // prevent upload start on file selection
//       formData:         form.data('form-data'), //read AWS config via form attributes
//       paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
//       dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
//       // replaceFileInput: false,
//
//       add: function (e, data) {
//         if (data.files && data.files[0]) {
//           var reader = new FileReader();
//           reader.onload = function(e) {
//               $('#target').attr('src', e.target.result); // insert preview image
//               $('#target').cropper() // initialize cropper on preview image
//             };
//             // console.log(e)
//           reader.readAsDataURL(data.files[0]); // triggers code above (?)
//         };
//
//         $('#uploadart').on('click', function(){
//           $('#target').cropper('getCroppedCanvas').toBlob(function (blob){
//               var file = new File([blob], 'cropped.png')
//               console.log(blob)
//               console.log(file)
//               data.originalFiles[0] = file
//               data.files[0] = file
//               data.fileInput[0].files[0] = blob
//               console.log(data.fileInput[0].files[0])
//           })
//           console.log(data)
//           file.submit();
//         });
//         console.log(data)
//       },
//
//       progressall: function (e, data) {
//         var progress = parseInt(data.loaded / data.total * 100, 10);
//         progressBar.css('width', progress + '%')
//       },
//
//       start: function (e) {
//         submitButton.prop('disabled', true); //disable submit button while image is loading
//
//         progressBar.
//           css('background', 'green').
//           css('display', 'block').
//           css('width', '0%').
//           text("Loading...");
//       },
//
//       done: function(e, data) {
//         submitButton.prop('disabled', false);
//         progressBar.text("Uploading done");
//
//         // extract key from S3 XML response and generate URL for image
//         var key   = $(data.jqXHR.responseXML).find("Key").text();
//         var url   = '//' + form.data('host') + '/' + key;
//
//         // create hidden field containing image URL, which can then be stored in model
//         var input = $("<input />", { type:'hidden', name: 'image_url[]', value: url })
//         form.append(input);
//       },
//
//       fail: function(e, data) {
//         submitButton.prop('disabled', false);
//
//         progressBar.
//           css("background", "red").
//           text("Failed");
//       }
//     });
//   });
// });
