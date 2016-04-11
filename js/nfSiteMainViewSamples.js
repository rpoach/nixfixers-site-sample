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
    nfSite.app.controller('nfSiteMainViewSamplesController',
                         ['nfSiteMainViewSamplesInitService',
                function (nfSiteMainViewSamplesInitService) {
        //  If not initted yet
        if (!nfSiteMainViewSamplesInitService.hasInitted()) {
            //  Init the view dependencies
            nfSiteMainViewSamplesInitService.initIfNeeded();
        }
    }]);

    nfSite.app.service('nfSiteMainViewSamplesInitService',
                      ['$log',
             function ($log) {
        var that = this;
        var initted = false;

        that.hasInitted = function () {
            return initted;
        };
        that.initIfNeeded = function () {
            var index, route;

            if (!that.hasInitted()) {
                index = nfSite.routeIndexHash['/samples'];

                //  If a valid route sussed from path, load the puzzle and set the swap handlers
                if (index || (index === 0)) {
                    route = nfSite.routes[index];

                    if (route) {
                        //  Get the slidepuzzle namespace and init the slidepuzzle
                        require(['nfSlidePuzzle'], function () {
                            var cache = undefined;
                            initted = true;

                            try {
                                nfSite.spNs = getSlidePuzzleNs();
                            }
                            catch (err) {
                                $log.error('Can not initialize slide puzzle:' + err);
                            }
                            if (nfSite.spNs) {
                                //  Load an init the game
                                nfSite.spNs.load(jq.nc);
                                nfSite.spNs.init();

                                //  When view is swap out, all game html and data is removed.
                                //  Set the swap handlers to cache and replace it
                                route.willSwapIn = function () {
                                    if (cache) {
                                        jq.nc('#nf-slide-puzzle').append(cache.children());
                                    }
                                };
                                route.willSwapOut = function () {
                                    //  Pause or quit the game
                                    if (nfSite.spNs.state.getIsPlaying()) {
                                        nfSite.spNs.actions.pause();
                                    }
                                    else if (nfSite.spNs.state.getIsShuffling()) {
                                        nfSite.spNs.actions.quit();
                                    }
                                    //  Cache the game state
                                    cache = jq.nc('#nf-slide-puzzle').clone(true, true);
                                };
                            }
                        });
                    }
                }
            }
        };

        return that;
    }]);
});
