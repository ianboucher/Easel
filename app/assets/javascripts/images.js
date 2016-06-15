// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// $(function () {
//     var fileInput = $('#fileupload');
//     var form = $(fileInput.parents('form:first'));
//     console.log(fileInput);
//     // console.log(form.data);
//     console.log(form.data('url'));
//     console.log(form.data('form-data'));
//     fileInput.fileupload({
//         fileInput:        fileInput,
//         url:              form.data('url'), //read from AWS config via form attribute
//         type:             'POST',
//         autoUpload:       true, // begin upload when user selects file
//         formData:         form.data('form-data'), //read from AWS config via form attribute
//         paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
//         dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
//         replaceFileInput: false,
//
//         submit: function (e, data) {
//           console.log('in submit')
//         },
//
//         start: function (e){
//           console.log('in start')
//         },
//
//         add: function (e, data) {
//           console.log('in add')
//           $('#uploadbutton').on('click', function(){
//             data.submit();
//           });
//         },
//
//         done: function (e, data) {
//           console.log(data)
//             $.each(data.result.files, function (index, file) {
//                 $('<p/>').text(file.name).appendTo(document.body);
//             });
//         }
//     });
// });
