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
    nfSite.app.controller('nfSiteMainViewSkillsController',
                         ['$scope',
                          '$rootScope',
                          'nfSiteMainViewSkillsInitService',
                function ($scope,
                          $rootScope,
                          nfSiteMainViewSkillsInitService) {
        var skillSubmitted;

        //  If not initted yet
        if (!nfSiteMainViewSkillsInitService.hasInitted()) {
            //  Init the view dependencies
            nfSiteMainViewSkillsInitService.initIfNeeded();
        }

        $scope.matchString = '';
        $scope.skillIn = nfSiteMainViewSkillsInitService.getSkillIn();
        $scope.skillOut = nfSiteMainViewSkillsInitService.getSkillOut();
        $scope.skillClicked = nfSiteMainViewSkillsInitService.getSkillClicked();
        nfSiteMainViewSkillsInitService.setSkillsToScope($scope);
        nfSiteMainViewSkillsInitService.setSkillSubmittedToScope($scope);
        $scope.skillSubmitted = nfSiteMainViewSkillsInitService.getSkillSubmitted();

        //  If a previous query, load it
        if ($rootScope.lastQuery) {
            nfSiteMainViewSkillsInitService.loadSkillToScope($scope, $rootScope.lastQuery);
        }

        //  If backend change notification needed
        if (nfSiteMainViewSkillsInitService.isNotifyNeeded()) {
            nfSiteMainViewSkillsInitService.notifyIfNeeded($scope);
        }
    }]);

    nfSite.app.service('nfSiteMainViewSkillsInitService',
                      ['$rootScope',
                       '$timeout',
                       'nfSiteMainViewSkillsDataService',
                       'nfSiteMainViewProjectsDataService',
                       'nfSiteMainBackendService',
             function ($rootScope,
                       $timeout,
                       nfSiteMainViewSkillsDataService,
                       nfSiteMainViewProjectsDataService,
                       nfSiteMainBackendService) {
        var that = this
        var funcsInitted = false;
        var dataInitted = false;
        var notifyNeeded = true;

        that.hasInitted = function () {
            return funcsInitted && dataInitted;
        };
        that.initIfNeeded = function () {
            var index, route, skillsPromise;

            if (!that.hasInitted()) {
                index = nfSite.routeIndexHash['/skills'];

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
                            });

                            //  Grab the skill data once (handling our own caching)
                            skillsPromise = nfSiteMainViewSkillsDataService.getSkills();
                        }
                        if (!funcsInitted) {
                            funcsInitted = true;

                            //  Set up the events
                            that.getSkillIn = function () {
                                return function (event) {
                                    angular.element(event.currentTarget)
                                           .addClass('hovered');
                                };
                            };
                            that.getSkillOut = function () {
                                return function (event) {
                                    angular.element(event.currentTarget)
                                           .removeClass('hovered');
                                };
                            };
                            that.getSkillClicked = function () {
                                return function (event, skill) {
                                    if (that.skillSubmitted) {
                                        that.skillSubmitted(event, skill.skill);
                                    }
                                }
                            };
                            //  Set up the data callbacks
                            that.setSkillsToScope = function (scope) {
                                skillsPromise.then(function (resp) {
                                    scope.skills = resp.data.data.skills;
                                });
                            }
                            that.loadSkillToScope = function (scope, skill) {
                                var projectsPromise =
                                        nfSiteMainViewProjectsDataService.getProjects(skill);

                                projectsPromise.then(function(resp) {
                                    var locations = resp.data.data.locations;
                                    var records = parseInt(resp.data.data.numRecords)
                                    var location, index, project;

                                    $rootScope.lastQuery = skill;
                                    scope.query = skill;
                                    scope.locations = locations
                                    scope.result = true;

                                    //  If there were no records returned
                                    if (isNaN(records) || (records <= 0)) {
                                        scope.result = false;
                                    }
                                });
                            };
                            that.setSkillSubmittedToScope = function (scope) {
                                that.skillSubmitted = function (event, matchString) {
                                    var projectsPromise;

                                    //  Grab the input element
                                    var input = angular.element(event.currentTarget)
                                                       .parent()
                                                       .parent()
                                                       .find('input');

                                    //  Set the value to empty
                                    input.val('');

                                    //  Trigger the change event
                                    input.triggerHandler('change');

                                    //  Load the match string to the scope
                                    that.loadSkillToScope(scope, matchString);
                                };
                            };
                            that.getSkillSubmitted = function () {
                                return that.skillSubmitted;
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
                    notifyDiv = jq.nc('#nf-site-skills-view-notify-backend');
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

    nfSite.app.service('nfSiteMainViewSkillsDataService',
                      ['$http',
                       '$q',
                       'nfSiteMainBackendService',
             function ($http,
                       $q,
                       nfSiteMainBackendService) {
        var that = this;

        that.getSkills = function () {
            var deferred = $q.defer();
            var filename = nfSiteMainBackendService.resolveFileBaseName(
                                                'nfSiteMainViewSkillsSkillData');

            $http.get(filename).then(function (resp) {
                deferred.resolve(resp);
            });

            return deferred.promise;
        };

        return that;
    }]);

    nfSite.app.service('nfSiteMainViewProjectsDataService',
                      ['$http',
                       '$q',
                       'nfSiteMainBackendService',
             function ($http,
                       $q,
                       nfSiteMainBackendService) {
        var that = this;
        that.getProjects = function (skill) {
            var filename = nfSiteMainBackendService.resolveFileBaseName(
                                                'nfSiteMainViewSkillsProjectData');

            var deferred = $q.defer();

            $http({ method: 'POST',
                    url: filename,
                    data: 'skill=' + encodeURIComponent(skill),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).then(function (resp) {
                deferred.resolve(resp);
            });

            return deferred.promise;
        };

        return that;
    }]);

    nfSite.app.filter('skillFilter',
             function() {
        return function (skills, match) {
            var filtered = [];
            var charArray, escaped, regex, index, skill;

            if (match && match.length) {
                //  Regex escape the match chars
                charArray = match.split('');
                escaped = charArray.map(function (chr) { return '[' + chr + ']'; }).join('');

                regex = new RegExp('^' + escaped, 'i');

                for (index in skills) {
                    skill = skills[index];

                    if (regex.test(skill.skill)) {
                        filtered.push(skill);
                    }
                }
            }

            return filtered.sort();
        };
    });
});
