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
    //  Insert the menu item template
    nfSite.app.directive('nfSiteMainMenuItem',
                        ['$location',
               function ($location) {
        return {
            link: function (scope, elem, attrs) {
                //  Watch for the item name replacement, and then set the menu item width
                scope.$watch(function () { return elem.html() },
                             function () {
                                 var jqElem = jq.nc(elem);
                                 var width;

                                 jqElem.addClass('hovered');
                                 width = Math.ceil(jqElem.width());
                                 jqElem.removeClass('hovered')
                                       .width(width);
                             });
      
                //  If the element's view path is the current location path, set to selected
                attrs.$observe('viewRoute', function (currVal) {
                    //  If the menu item for the current path
                    if (currVal === $location.path()) {
                        jq.nc(elem).addClass('selected');
                    }
                });
            },
            replace: true,
            restrict: 'A',
            templateUrl: '/html/nfSiteMainMenuItem.html'
        };
    }]);
});
