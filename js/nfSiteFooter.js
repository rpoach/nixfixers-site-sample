/*

Copyright (c) 2016, #!/nixfixers
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
   this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

'use strict;'

define(['configJquery', 'configNfSite'], function (jq, nfSite) {
    //  Insert the footer template
    nfSite.app.directive('nfSiteFooter', function () {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: '/html/nfSiteFooter.html'
        };
    });

    nfSite.app.controller('nfSiteFooterController',
                         ['$scope', 
                function ($scope) {
        //  Set up the audio easter egg
        var currDate = new Date();
        var audio = jq.nc('#nf-site-audio-ee')[0];
        var audioIn = function () {
            //  Play sound
            audio.play();
        };
        var audioOut = function () {
            //  Pause sound
            audio.pause();
        };

        //  Interpolation values
        $scope.currYear = currDate.getFullYear();

        //  Init the audio easter egg
        jq.nc('.nf-site-audio-activate')
             .hover(audioIn, audioOut);
    }]);
});
