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

//  Configure RequireJS to work with jQuery and AngularJS
require.config({
    paths: {
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min',
        'angular': '//code.angularjs.org/1.5.2/angular.min',
        'angular-route': '//code.angularjs.org/1.5.2/angular-route.min',
        'angular-animate': '//code.angularjs.org/1.5.2/angular-animate.min',
        'angular-cookies': '//code.angularjs.org/1.5.2/angular-cookies.min'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular'],
        },
        'angular-animate': {
            deps: ['angular'],
        },
        'angular-cookies': {
            deps: ['angular'],
        }
    }
});



//  Configure jQuery and AngularJS to work with RequireJS
require(['configJquery', 'configNfSite'], function () {
    require(['configAngular'], function () {
        require(['nfSiteLoad']);
    });
});
