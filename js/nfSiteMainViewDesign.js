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
    nfSite.app.controller('nfSiteMainViewDesignController',
                         ['$scope',
                          'nfSiteMainViewDesignInitService',
                function ($scope,
                          nfSiteMainViewDesignInitService) {
        //  If not initted yet
        if (!nfSiteMainViewDesignInitService.hasInitted()) {
            //  Init the view dependencies
            nfSiteMainViewDesignInitService.initIfNeeded();
        }

        nfSiteMainViewDesignInitService.setSetBackendToScope($scope);
        nfSiteMainViewDesignInitService.setCookiesEnabledToScope($scope);
        nfSiteMainViewDesignInitService.applyCurrentBackend($scope);
    }]);

    nfSite.app.service('nfSiteMainViewDesignInitService',
                      ['$rootScope',
                       'nfSiteMainBackendService',
             function ($rootScope,
                       nfSiteMainBackendService) {
        var that = this
        var initted = false;

        that.hasInitted = function () {
            return initted;
        };
        that.initIfNeeded = function () {
            var index, route, switchTo, index, backend;

            if (!that.hasInitted()) {
                index = nfSite.routeIndexHash['/design'];

                //  If a valid route sussed from path
                if (index || (index === 0)) {
                    route = nfSite.routes[index];

                    if (route) {
                        initted = true;

                        that.setSetBackendToScope = function (scope) {
                            //  Set the backend if cookies are still enabled
                            scope.setBackend = function (dirext) {
                                //  Ensure cookies are still enabled
                                if (that.setCookiesEnabledToScope(scope)) {
                                    nfSiteMainBackendService.setBackend(dirext);
                                    that.applyCurrentBackend(scope);
                                    $rootScope.$broadcast('backendChanged');
                                }
                            };
                        };
                        that.setCookiesEnabledToScope = function (scope) {
                            scope.cookiesEnabled = nfSiteMainBackendService.areCookiesEnabled();
                            return scope.cookiesEnabled;
                        };
                        that.applyCurrentBackend = function (scope) {
                            //  Cache the current backend object
                            scope.currBackend = nfSiteMainBackendService.getBackend();

                            //  Cache a list of the unused backend objects
                            scope.switchBackends = [];
                            for (index in nfSite.backends) {
                                backend = nfSite.backends[index];
                                if (backend !== scope.currBackend) {
                                    scope.switchBackends.push(backend);
                                }
                            }
                        };
                    }
                }
            }
        };

        return that

    }]);
});
