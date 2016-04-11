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
    nfSite.app.controller('nfSiteMainViewReviewsController', 
                         ['$scope',
                          'nfSiteMainViewReviewsInitService',
                function ($scope,
                          nfSiteMainViewReviewsInitService) {
        var promise, reviews, index, review, citeName;

        //  If not initted yet
        if (!nfSiteMainViewReviewsInitService.hasInitted()) {
            //  Init the view dependencies
            nfSiteMainViewReviewsInitService.initIfNeeded();
        }

        //  Set the scope vars
        nfSiteMainViewReviewsInitService.setReviewsToScope($scope);

        //  If backend change notification needed
        if (nfSiteMainViewReviewsInitService.isNotifyNeeded()) {
            nfSiteMainViewReviewsInitService.notifyIfNeeded($scope);
        }
    }]);

    nfSite.app.directive('nfSiteMainViewReviewsReview',
                        ['$location',
                         '$rootScope',
               function ($location,
                         $rootScope) {
        return {
            link: function () {
                var hasBroadcast = false;

                return function (scope, elem, attrs) {
                    if (!hasBroadcast) {
                        //  If the last review created
                        if (scope.$last === true) {
                            //  Wait until the id value is filled in
                            attrs.$observe('id', function () {
                                var index, route;

                                index = nfSite.routeIndexHash[$location.path()];
                                if (index || (index === 0)) {
                                    route = nfSite.routes[index];
                                    //  If the current route is our route
                                    if (route && (route.route === '/reviews')) {
                                        hasBroadcast = true;
                                        $rootScope.$broadcast('nfSiteIsReady');
                                    }
                                }
                            });
                        }
                    }
                };
            }(),
            replace: true,
            restrict: 'A',
            templateUrl: '/html/nfSiteMainViewReviewsReview.html'
        };
    }]);

    nfSite.app.service('nfSiteMainViewReviewsInitService',
                      ['$rootScope',
                       '$timeout',
                       'nfSiteMainViewReviewsDataService',
                       'nfSiteMainViewReviewsSwapService',
                       'nfSiteMainBackendService',
             function ($rootScope,
                       $timeout,
                       nfSiteMainViewReviewsDataService,
                       nfSiteMainViewReviewsSwapService,
                       nfSiteMainBackendService) {
        var that = this;
        var funcsInitted = false;
        var dataInitted = false;
        var notifyNeeded = true;

        that.hasInitted = function () {
            return funcsInitted && dataInitted;
        };
        that.initIfNeeded = function () {
            var index, route, promise;

            if (!that.hasInitted()) {
                index = nfSite.routeIndexHash['/reviews'];

                //  If a valid route sussed from path
                if (index || (index === 0)) {
                    route = nfSite.routes[index];

                    if (route) {
                        if (!dataInitted) {
                            dataInitted = true;

                            //  Allow backend changes to reload skill data
                            $rootScope.$on('backendChanged', function (event) {
                                dataInitted = false;
                                notifyNeeded = true;
                                nfSiteMainViewReviewsSwapService.reinit();
                            });

                            //  Grab the review data once (handling our own caching)
                            promise = nfSiteMainViewReviewsDataService.getReviews();
                        }
                        if (!funcsInitted) {
                            funcsInitted = true;

                            //  Set up the data callbacks
                            that.setReviewsToScope = function (scope) {
                                promise.then(function (resp) {
                                    //  Process each review
                                    var reviews, index, review, citeName
                                    reviews = resp.data.data.reviews;
                                    for (index in reviews) {
                                        review = reviews[index];
                                        citeName = [];
                                        if (review.title) {
                                            citeName.push(review.title);
                                        }
                                        citeName = citeName.concat([review.first_name,
                                                                    review.last_name]);
                                        review.citeName = citeName.join(' ');
                                        review.citeRole = [review.orig_role,
                                                           'at',
                                                           review.location].join(' ');
                                        if (review.curr_role && review.curr_location) {
                                            review.citeCurrRole = ['Currently',
                                                                   review.curr_role,
                                                                   'at',
                                                                   review.curr_location].join(' ');
                                        }
                                    }
                                    scope.reviews = reviews;
                                });
                            }

                            //  Signal the review swapper
                            route.willSwapIn = function () {
                                nfSiteMainViewReviewsSwapService.play();
                            };
                            route.willSwapOut = function () {
                                nfSiteMainViewReviewsSwapService.pause();
                            };
                        }
                    }
                }
            }
        };
        that.isNotifyNeeded = function () {
            return notifyNeeded;
        }
        that.notifyIfNeeded = function (scope) {
            var backend = nfSiteMainBackendService.getBackend();
            var notifyDiv, waitUntilNotifyDiv;

            if (that.isNotifyNeeded()) {
                //  Wait for the div to exist
                waitUntilNotifyDiv = function () {
                    notifyDiv = jq.nc('#nf-site-reviews-view-notify-backend');
                    if (!notifyDiv.children('.nf-view-notify-backend-message').length) {
                        $timeout(waitUntilNotifyDiv, 0);
                    }
                    else {
                        //  Show the div and then fadeout
                        notifyDiv.show();
                        $timeout(function () {
                            notifyDiv.fadeOut(1000);
                        }, 2000);
                    }
                }

                scope.backendName = backend.name;
                notifyNeeded = false;
                waitUntilNotifyDiv();
            }
        }

        return that;
    }]);

    nfSite.app.service('nfSiteMainViewReviewsDataService',
                      ['$http',
                       '$q',
                       'nfSiteMainBackendService',
             function ($http,
                       $q,
                       nfSiteMainBackendService) {
        var that = this;

        that.getReviews = function () {
            var deferred = $q.defer();
            var filename = nfSiteMainBackendService.resolveFileBaseName(
                                                'nfSiteMainViewReviewsData');

            $http.get(filename).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        return that;
    }]);

    nfSite.app.service('nfSiteMainViewReviewsSwapService',
                      ['$interval',
             function ($interval) {
        var that = this;
        var hasInitted = false;
        var reviewIds = [];
        var numReviews = undefined;
        var currReviewIndex = undefined;
        var promise = undefined;
        var holdMsecs = 10000;
        var serviceInit = function () {
            if (!hasInitted) {
                jq.nc('.nf-view-review').each(function () {
                    var id = jq.nc(this).attr('id');
                    reviewIds.push(id);
                });
                if (reviewIds.length) {
                    numReviews = reviewIds.length;
                    //  If first pass set the index to the beginning
                    if (currReviewIndex === undefined) {
                        currReviewIndex = 0;
                    }
                    //  Else ensure the index will not overrun current length
                    else {
                        currReviewIndex %= reviewIds.length;
                    }
                    isSwapping = false;
                    hasInitted = true;
                }
            }
        };
        var serviceSwap = function () {
            //  Swap out
            jq.nc('#' + reviewIds[currReviewIndex]).fadeOut(nfSite.faderMsecs, function () {
                //  Increment the review
                currReviewIndex = (currReviewIndex + 1) % numReviews;

                //  Swap in
                jq.nc('#' + reviewIds[currReviewIndex]).fadeIn(nfSite.faderMsecs);
            });
        }

        that.reinit = function () {
            hasInitted = false;
        }

        that.pause = function () {
            if (!hasInitted) {
                serviceInit();
            }
            if (hasInitted && promise) {
                //  Clear the interval
                $interval.cancel(promise);
                promise = undefined;

                //  Final swap out
                jq.nc('#' + reviewIds[currReviewIndex]).fadeOut(nfSite.faderMsecs);
            }
        };

        that.play = function () {
            if (!hasInitted) {
                serviceInit();
            }
            if (hasInitted && !promise) {
                //  Initial swap in
                jq.nc('#' + reviewIds[currReviewIndex]).fadeIn(nfSite.faderMsecs);
                
                //  Set the interval
                promise = $interval(serviceSwap, holdMsecs);
            }
        };

        return that;
    }]);
});
