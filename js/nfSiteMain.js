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
    nfSite.app.controller('nfSiteMainController',
                         ['$scope',
                          'nfSiteMainInitService',
                function ($scope,
                          nfSiteMainInitService) {
        //  If not initted yet
        if (!nfSiteMainInitService.hasInitted()) {
            //  Init the view dependencies
            nfSiteMainInitService.initIfNeeded();
        }

        //  Interpolation values
        $scope.items = nfSite.routes;
    }]);

    nfSite.app.service('nfSiteMainInitService',
                      ['$location',
                       '$rootScope',
             function ($location,
                       $rootScope) {
        var that = this;
        var initted = false;

        that.hasInitted = function () {
            return initted;
        };
        that.initIfNeeded = function () {
            var index, route, isMenuDataReady, isReviewDataReady, menuIsReady, pageIsReady;

            if (!that.hasInitted()) {
                //  If a valid route sussed from path
                index = nfSite.routeIndexHash[$location.path()];
                if (index || (index === 0)) {
                    route = nfSite.routes[index];
                    if (route) {
                        initted = true;

                        $rootScope.$on('nfSiteIsReady', function () {
                            var isSiteReady = false;

                            return function () {
                                var bgFader, currView;

                                if (!isSiteReady) {
                                    isSiteReady = true;

                                    bgFader = jq.nc('#nf-site-bg-fader');
                                    currView = jq.nc('#' + route.viewId);

                                    //  Init the animation and any data
                                    bgFader.hide();
                                    currView.hide();
                                    if (route.willSwapIn) {
                                        route.willSwapIn();
                                    }

                                    //  Make the page visible
                                    jq.nc('body').addClass('visible');
                                    bgFader.fadeIn(nfSite.faderMsecs);
                                    currView.fadeIn(nfSite.faderMsecs);
                                }
                            }
                        }());
                    }
                }
            }
        };

        return that;
    }]);

    //  Insert the main template
    nfSite.app.directive('nfSiteMain', function () {
        return {
            replace: true,
            restrict: 'A',
            templateUrl: '/html/nfSiteMain.html',
        };
    });

    //  Declare a service for tracking which backend language to use
    nfSite.app.service('nfSiteMainBackendService',
                      ['$log',
                       '$cookieStore',
             function ($log,
                       $cookieStore) {
        var that = this;
        var hasInitted = false;
        var currBackend = undefined;
        var cookiesEnabled = false;
        var cookieName = 'NfBackend';
        var ensureCookiesEnabled = function () {
            var testName = 'NfTestCookie';
            var putVal = 'test';
            var getVal;

            //  Try to place and retrieve a cookie
            $cookieStore.put(testName, putVal);
            getVal = $cookieStore.get(testName);
            if (getVal && (getVal === putVal)) {
                cookiesEnabled = true;
                $cookieStore.remove(testName);
            }
            else {
                cookiesEnabled = false;
            }

            return cookiesEnabled;
        };
        var getBackendIndexCookie = function () {
            var index = 0;
            var getVal;

            if (ensureCookiesEnabled()) {
                getVal = $cookieStore.get(cookieName);

                if (getVal) {
                    getVal = parseInt(getVal);

                    //  If a valid cookie value
                    if (!isNaN(getVal) && (getVal >=0) && (getVal < nfSite.backends.length)) {
                        index = getVal;
                    }
                }
            }

            return index;
        }
        var setBackendIndexCookie = function (index) {
            if (ensureCookiesEnabled()) {
                $cookieStore.put(cookieName, index);
            }
        }
        var initServiceIfNeeded = function () {
            if (!hasInitted) {
                if (nfSite.backends.length) {
                    currBackend = nfSite.backends[getBackendIndexCookie()];
                    hasInitted = true;
                }
            }
        };

        that.areCookiesEnabled = function () {
            return ensureCookiesEnabled();
        }
        that.resolveFileBaseName = function (name) {
            var retName = undefined;

            initServiceIfNeeded();
            if (hasInitted) {
                retName = ['/',
                           currBackend.dirext,
                           '/',
                           name,
                           '.',
                           currBackend.dirext].join('');

                $log.info('Accessing ' + currBackend.name + ' backend');
            }

            return retName;
        };
        that.getBackend = function () {
            var backend = null;

            initServiceIfNeeded();
            if (hasInitted) {
                backend = currBackend;
            }

            return backend;
        };
        that.setBackend = function (dirext) {
            initServiceIfNeeded();
            if (hasInitted) {
                var index = nfSite.dirextIndexHash[dirext];
                var backend = nfSite.backends[index];

                if (backend) {
                    currBackend = backend;
                    if (ensureCookiesEnabled()) {
                        setBackendIndexCookie(index);
                    }
                }
            }
        };

        return that;
    }]);
});
