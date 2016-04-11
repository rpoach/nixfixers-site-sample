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
    nfSite.app.controller('nfSiteMainMenuController',
                         ['$scope',
                          'nfSiteMainMenuInitService',
                function ($scope,
                          nfSiteMainMenuInitService) {

        //  If not initted yet
        if (!nfSiteMainMenuInitService.hasInitted()) {
            //  Init the view dependencies
            nfSiteMainMenuInitService.initIfNeeded($scope);
        }
    }]);

    nfSite.app.service('nfSiteMainMenuInitService',
                      ['$location',
             function ($location) {
        var that = this;
        var initted = false;
        that.hasInitted = function () {
            return initted;
        };
        that.initIfNeeded = function (scope) {
            var menuDiv, menuItemIn, menuItemOut, menuItemClick;

            if (!that.hasInitted()) {
                initted = true;

                //  Set up the menu
                menuDiv = jq.nc('#nf-site-menu');
                menuItemIn = function (event) {
                    var item = jq.nc(event.target);

                    //  Do not process event for already selected item
                    if (!item.hasClass('selected')) {
                        item.addClass('hovered');
                    }
                };
                menuItemOut = function (event) {
                    jq.nc('.nf-site-menu-item')
                          .removeClass('hovered');
                };
                menuItemClick = function (event) {
                    var item = jq.nc(event.target);
                    var route = item.attr('data-view-route');

                    //  Do not process event for already selected item
                    if (!item.hasClass('selected')) {
                        //  Display Menu Item
                        jq.nc('.nf-site-menu-item')
                              .removeClass('selected');
                        item.addClass('selected')
                            .removeClass('hovered');

                        //  Display View - wrap location path in scope apply because
                        //  call is within a jQuery handler
                        scope.$apply(function () {
                            $location.path(route);
                        });
                    }
                };

                //  Init menu event handlers
                menuDiv.on('mouseover', '.nf-site-menu-item', menuItemIn);
                menuDiv.on('mouseout', '.nf-site-menu-item', menuItemOut);
                menuDiv.on('click', '.nf-site-menu-item', menuItemClick);
            }
        };

        return that;
    }]);

    //  Insert the menu template
    nfSite.app.directive('nfSiteMainMenu', function () {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: '/html/nfSiteMainMenu.html',
        };
    });
});
