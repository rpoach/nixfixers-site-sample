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

define(function () {
    return {
        appName: 'nfSiteApp',
        controllerName: 'nfSiteController',
        faderMsecs: 500,
        routes: [
            {
                controller: undefined,
                itemId: 'nf-site-welcome-item',
                itemLabel: 'Welcome',
                route: '/welcome',
                viewId: 'nf-site-welcome-view',
                viewImage: '/jpg/nfViewWelcome.wm.jpg',
                viewJs: undefined,
                viewTitle: 'Welcome to #!/nixfixers',
                viewUrl: '/html/nfSiteMainViewWelcome.html',
            },
            {
                controller: undefined,
                itemId: 'nf-site-personnel-item',
                itemLabel: 'Personnel',
                route: '/personnel',
                viewId: 'nf-site-personnel-view',
                viewImage: '/jpg/nfViewHeadshot.wm.jpg',
                viewJs: undefined,
                viewTitle: '#!/nixfixers Personnel',
                viewUrl: '/html/nfSiteMainViewPersonnel.html',
            },
            {
                controller: 'nfSiteMainViewSkillsController',
                itemId: 'nf-site-skills-item',
                itemLabel: 'Skills',
                route: '/skills',
                viewId: 'nf-site-skills-view',
                viewImage: '/jpg/nfViewSkills.wm.jpg',
                viewJs: '/js/nfSiteMainViewSkills.js',
                viewTitle: '#!/nixfixers Skills',
                viewUrl: '/html/nfSiteMainViewSkills.html',
            },
            {
                controller: 'nfSiteMainViewSamplesController',
                itemId: 'nf-site-samples-item',
                itemLabel: 'Samples',
                route: '/samples',
                viewId: 'nf-site-samples-view',
                viewImage: '/jpg/nfViewSamples.wm.jpg',
                viewJs: '/js/nfSiteMainViewSamples.js',
                viewTitle: '#!/nixfixers Samples',
                viewUrl: '/html/nfSiteMainViewSamples.html',
            },
            {
                controller: 'nfSiteMainViewDesignController',
                itemId: 'nf-site-design-item',
                itemLabel: 'Design',
                route: '/design',
                viewId: 'nf-site-design-view',
                viewImage: '/jpg/nfViewDesign.wm.jpg',
                viewJs: '/js/nfSiteMainViewDesign.js',
                viewTitle: '#!/nixfixers Site Design',
                viewUrl: '/html/nfSiteMainViewDesign.html',
            },
            {
                controller: 'nfSiteMainViewReviewsController',
                itemId: 'nf-site-reviews-item',
                itemLabel: 'Reviews',
                route: '/reviews',
                viewId: 'nf-site-reviews-view',
                viewImage: '/jpg/nfViewReviews.wm.jpg',
                viewJs: '/js/nfSiteMainViewReviews.js',
                viewTitle: '#!/nixfixers Reviews',
                viewUrl: '/html/nfSiteMainViewReviews.html',
            },
            {
                controller: undefined,
                itemId: 'nf-site-contact-item',
                itemLabel: 'Contact',
                route: '/contact',
                viewId: 'nf-site-contact-view',
                viewImage: '/jpg/nfViewContact.wm.jpg',
                viewJs: undefined,
                viewTitle: 'Contact #!/nixfixers',
                viewUrl: '/html/nfSiteMainViewContact.html',
            }
        ],
        routeIndexHash: {
            '/welcome': 0,
            '/personnel': 1,
            '/skills': 2,
            '/samples': 3,
            '/design': 4,
            '/reviews': 5,
            '/contact': 6
        },
        idIndexHash: {
            'nf-site-welcome-view': 0,
            'nf-site-personnel-view': 1,
            'nf-site-skills-view': 2,
            'nf-site-samples-view': 3,
            'nf-site-design-view': 4,
            'nf-site-reviews-view': 5,
            'nf-site-contact-view': 6
        },
        backends: [
            { 
                dirext: 'php',
                name: 'PHP'
            },
            { 
                dirext: 'py',
                name: 'Python'
            },
            { 
                dirext: 'pl',
                name: 'Perl'
            }
        ],
        dirextIndexHash: {
            'php': 0,
            'py': 1,
            'pl': 2
        }
    };
});
