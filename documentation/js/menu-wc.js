'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">a45081-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AnalysisModule.html" data-type="entity-link" >AnalysisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' : 'data-bs-target="#xs-controllers-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' :
                                            'id="xs-controllers-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' }>
                                            <li class="link">
                                                <a href="controllers/AnalysisController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalysisController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' : 'data-bs-target="#xs-injectables-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' :
                                        'id="xs-injectables-links-module-AnalysisModule-b2690b29d898b478c9ed8011502a16e0f81e9c397a9a715b418b35e5dd07f69a206cbf11712142eb7879ecff648df58a12a41306bfbf7c70ec9111b0a4672701"' }>
                                        <li class="link">
                                            <a href="injectables/AnalysisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalysisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' : 'data-bs-target="#xs-controllers-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' :
                                            'id="xs-controllers-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' : 'data-bs-target="#xs-injectables-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' :
                                        'id="xs-injectables-links-module-AppModule-c56b7c46e53a6f8857950ef757d3309d0497abb0ba5bce1ce7fb497e589e84c80788dffb4ecd77bce098dde0e74728a706bc1ebd333bdea52ee697ab65b79487"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' :
                                            'id="xs-controllers-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' :
                                        'id="xs-injectables-links-module-AuthModule-582bfe9ac65e1656931a4f0c6dc20494e7678a2f6a04d46653c4392340858a3cb27ea46ec1b7e63c1e7a7f6a0355c81925c7204c3a35bf955aed9d369c4fe0d1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PatientInformationModule.html" data-type="entity-link" >PatientInformationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' : 'data-bs-target="#xs-controllers-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' :
                                            'id="xs-controllers-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' }>
                                            <li class="link">
                                                <a href="controllers/PatientInformationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientInformationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' : 'data-bs-target="#xs-injectables-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' :
                                        'id="xs-injectables-links-module-PatientInformationModule-2cf3abecf3d51ad4e29c17f67f8b6c7b33f584f5ec69c57d84c9662415851a878e53ddf6bd00aa581ebf367ba15312aa264ff61711aeee7b782039b13f8b65ae"' }>
                                        <li class="link">
                                            <a href="injectables/PatientInformationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientInformationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipelinesModule.html" data-type="entity-link" >PipelinesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PipelinesModule-690a408e836427e312786095e20eb6b2f0fe98ccd28ec706b394716fec569b8fa77f02a67ebdb9823e9854f6de8c1af144c41dfebc5c5f9119f6a2460c2a9d09"' : 'data-bs-target="#xs-injectables-links-module-PipelinesModule-690a408e836427e312786095e20eb6b2f0fe98ccd28ec706b394716fec569b8fa77f02a67ebdb9823e9854f6de8c1af144c41dfebc5c5f9119f6a2460c2a9d09"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PipelinesModule-690a408e836427e312786095e20eb6b2f0fe98ccd28ec706b394716fec569b8fa77f02a67ebdb9823e9854f6de8c1af144c41dfebc5c5f9119f6a2460c2a9d09"' :
                                        'id="xs-injectables-links-module-PipelinesModule-690a408e836427e312786095e20eb6b2f0fe98ccd28ec706b394716fec569b8fa77f02a67ebdb9823e9854f6de8c1af144c41dfebc5c5f9119f6a2460c2a9d09"' }>
                                        <li class="link">
                                            <a href="injectables/PipelinesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PipelinesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SamplesModule.html" data-type="entity-link" >SamplesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' : 'data-bs-target="#xs-controllers-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' :
                                            'id="xs-controllers-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' }>
                                            <li class="link">
                                                <a href="controllers/SamplesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SamplesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' : 'data-bs-target="#xs-injectables-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' :
                                        'id="xs-injectables-links-module-SamplesModule-0ce97f8b31d582a2c30b77baf037af9ceabefbc63c523fee81dcedd76530c9121a3d89ca6b455f8a3af4cd6fb22e4a62401e4f1a8ad2459c12745b64a260cb6c"' }>
                                        <li class="link">
                                            <a href="injectables/SamplesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SamplesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' : 'data-bs-target="#xs-controllers-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' :
                                            'id="xs-controllers-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' }>
                                            <li class="link">
                                                <a href="controllers/UploadsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' :
                                        'id="xs-injectables-links-module-UploadsModule-22045c18bd469286eb740e9fe28d2309149deb20ba08c01c11e7dea8137c3aacf562a67c599b0a7fba52c7e3f3c8aa6c6a8162916ac1c8c0b8885ef1c813928d"' }>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' :
                                            'id="xs-controllers-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' :
                                        'id="xs-injectables-links-module-UsersModule-f7b3bbfb9612a7819435ed7f826329201f1755eafe2ff8484f142f416c0036fa9d299677d8416721f41ce029d1bf948a73acb47fa159cf7b3a14bbf71951d9b1"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkspacesModule.html" data-type="entity-link" >WorkspacesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' : 'data-bs-target="#xs-controllers-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' :
                                            'id="xs-controllers-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' }>
                                            <li class="link">
                                                <a href="controllers/WorkspacesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkspacesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' : 'data-bs-target="#xs-injectables-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' :
                                        'id="xs-injectables-links-module-WorkspacesModule-d2fb97592e099cea404e949506c46708326c0d4745e229a281ecd303bfd228ad7e7db67bc976e1df1f5a7005b189aa0fb5912a4b61e62b4bd9dd1163fea95666"' }>
                                        <li class="link">
                                            <a href="injectables/WorkspacesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkspacesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PipelinesController.html" data-type="entity-link" >PipelinesController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Analysis.html" data-type="entity-link" >Analysis</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GeneClinicalSynopsis.html" data-type="entity-link" >GeneClinicalSynopsis</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PatientInformation.html" data-type="entity-link" >PatientInformation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Pipelines.html" data-type="entity-link" >Pipelines</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Samples.html" data-type="entity-link" >Samples</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Uploads.html" data-type="entity-link" >Uploads</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Users.html" data-type="entity-link" >Users</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Workspaces.html" data-type="entity-link" >Workspaces</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateAnalysisDto.html" data-type="entity-link" >CreateAnalysisDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePatientInformationDto.html" data-type="entity-link" >CreatePatientInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePipelineDto.html" data-type="entity-link" >CreatePipelineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSampleDto.html" data-type="entity-link" >CreateSampleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUploadDto.html" data-type="entity-link" >CreateUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWorkspaceDto.html" data-type="entity-link" >CreateWorkspaceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatientInformation.html" data-type="entity-link" >PatientInformation</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAnalysisDto.html" data-type="entity-link" >UpdateAnalysisDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePatientInformationDto.html" data-type="entity-link" >UpdatePatientInformationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePipelineDto.html" data-type="entity-link" >UpdatePipelineDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSampleDto.html" data-type="entity-link" >UpdateSampleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUploadDto.html" data-type="entity-link" >UpdateUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateWorkspaceDto.html" data-type="entity-link" >UpdateWorkspaceDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});