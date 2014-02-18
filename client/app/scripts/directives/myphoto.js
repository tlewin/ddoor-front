'use strict';

angular.module('clientApp')
  .directive('myPhoto', function ($rootScope) {
    var
      localStream = null,
      photoWidth  = null,
      photoHeight = null,
      $canvas     = null,
      $img        = null,
      $video      = null;

    // Find out getUserMedia implementation
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    // Find out URL object  
    window.URL = window.URL || window.webkitURL;

    return {
      restrict: 'E',
      controller: function($scope) {
        $scope.myphoto = {
          startCamera: function() {
            if(localStream) {
              $img.hide();
              $video.show();
            } else {
              navigator.getUserMedia({audio: false, video: true}, function(stream) {
                  localStream = stream;
                  $video.show();
                  $video.attr('src', window.URL.createObjectURL(localStream));
                  $img.hide();
                },
                function() {
                  $scope.$emit('photo-fail');
                }
              );
            }
          },

          stopCamera: function() {
            if(localStream) {
              localStream.stop();
              localStream = null;
            }
          },

          snapshot: function() {
            var
              ctx = $canvas[0].getContext('2d'),
              vw  = $video[0].videoWidth,
              vh  = $video[0].videoHeight,
              vp  = vw/vh,
              ip  = photoWidth/photoHeight,
              fw  = 0,
              fh  = 0;
            
            // Rescale image
            if(ip > vp) {
              fh = photoHeight;
              fw = Math.round(fh*vp);
            } else {
              fw = photoWidth;
              fh = Math.round(fw*Math.pow(vp,-1));
            }
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, photoWidth, photoHeight);
            ctx.drawImage($video[0], (photoWidth-fw)/2, (photoHeight-fh)/2, fw, fh);
            $video.hide();
            $img.attr('src', $canvas[0].toDataURL('image/png'));
            $img.show();
            $scope.myphoto.stopCamera();
          },

          isCameraEnable: function() {
            return !!(navigator.getUserMedia && window.URL);
          }
        };
      },
      link: function(scope, element, attrs) {
        var parent  = element.parent();

        photoWidth   = parent.width();
        photoHeight  = parent.height();
        $canvas = element.find('canvas');
        $video  = element.find('video');
        $img    = element.find('img');

        if(!scope.myphoto.isCameraEnable()) {
          scope.$emit('photo-fail');
        } else {
          $video.hide();
          $canvas.hide();
          angular.forEach([$video, $canvas, $img], function(element) {
            element.attr({
              width: photoWidth,
              height: photoHeight
            });
          });
          $video.attr('autoplay', true);
        }
      },
      templateUrl: 'views/myphoto.html'
    };
  });
