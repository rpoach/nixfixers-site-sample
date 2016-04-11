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
    nfSite.app.controller('nfSiteMainViewController',
                         ['$scope',
                          '$location',
                function ($scope,
                          $location) {
        var index = nfSite.routeIndexHash[$location.path()];
        var route;

        //  Set the scope vars if a valid route sussed from path
        $scope.viewId = $scope.viewTitle = $scope.viewImage = '';
        if (index || (index === 0)) {
            route = nfSite.routes[index];

            if (route) {
                $scope.viewId = route.viewId;
                $scope.viewTitle = route.viewTitle;
                $scope.viewImage = route.viewImage;
            }
        }
        $scope.isNfSiteReadyClass = 'is-nf-site-ready'
    }]);

    //  Transclude the view template
    nfSite.app.directive('nfSiteMainView',
                        ['$location',
               function ($location) {
        return {
            link: function (scope, elem, attrs) {
                //  Justify any view headings to max
                var max = 0;
                var headings = jq.nc(elem).find('.nf-view-heading');

                //  Get the max width of all headers
                headings.each(function () {
                    var width = jq.nc(this).width();
                    max = Math.max(max, width);
                });

                //  Set all headers to the max width
                headings.width(max);
            },
            replace: true,
            restrict: 'A',
            templateUrl: '/html/nfSiteMainView.html',
            transclude: true
        };
    }]);

    //  Transclude the view template
    nfSite.app.directive('nfSiteMainViewReady',
                        ['$location',
                         '$rootScope',
               function ($location,
                         $rootScope) {
        return {
            link: function () {
                var hasBroadcast = false;

                return function (scope, elem, attrs) {
                    if (!hasBroadcast) {
                        //  Wait until the class value is filled in
                        attrs.$observe('class', function () {
                            hasBroadcast = true;
                            $rootScope.$broadcast('nfSiteIsReady');
                        });
                    }
                };
            }(),
            restrict: 'A',
        };
    }]);

    nfSite.app.animation('.nf-site-views',
                        ['$timeout',
               function ($timeout) {
        var lastTimeout = undefined;
        var bgFader = jq.nc('#nf-site-bg-fader');

        return {
            enter: function (elem, done) {
                var element, index, route;

                //  If a valid element
                if (elem && elem[0] && elem[0].children && elem[0].children[0]) {
                    //  Hide the panel to be swapped in (stops auto fade-in)
                    element = jq.nc(elem[0].children[0]);
                    element.hide();

                    //  If still an active timeout, clear it
                    if (lastTimeout) {
                        $timeout.cancel(lastTimeout);
                        lastTimeout = undefined;
                    }

                    //  Grab the current route info
                    index = nfSite.idIndexHash[element.attr('id')];
                    if (index || (index === 0)) {
                        route = nfSite.routes[index];
                    }

                    if (route) {
                        //  If the route changed by browser, menu needs updating
                        jq.nc('#' + route.itemId).addClass('selected');
                    }

                    //  Wait until the leaving panel fades
                    lastTimeout = $timeout(function () {
                        lastTimeout = undefined;

                        //  Call the willSwapIn if defined
                        if (route && route.willSwapIn) {
                            route.willSwapIn();
                        }

                        //  Fade in the new panel
                        bgFader.fadeIn(nfSite.faderMsecs);
                        element.fadeIn(nfSite.faderMsecs, function () {
                            done();
                        });
                   }, nfSite.faderMsecs);
                }
            },
            leave: function (elem, done) {
                var element, index, route;

                //  If a valid element
                if (elem && elem[0] && elem[0].children && elem[0].children[0]) {
                    element = jq.nc(elem[0].children[0]);

                    //  Grab the current route info
                    index = nfSite.idIndexHash[element.attr('id')];
                    if (index || (index === 0)) {
                        route = nfSite.routes[index];
                    }

                    if (route) {
                        //  Call the willSwapIn if defined
                        if (route.willSwapOut) {
                            route.willSwapOut();
                        }

                        //  If the route changed by browser, menu needs updating
                        jq.nc('#' + route.itemId).removeClass('selected');
                    }


                    //  Fade out the old panel
                    bgFader.fadeOut(nfSite.faderMsecs);
                    element.fadeOut(nfSite.faderMsecs, function () {
                        done();
                    });
                }
            }
        };
    }]);
});
