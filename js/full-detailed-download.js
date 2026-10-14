var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/landing/sections/Download/download.template.ts
function renderDownload() {
  return `
        <section class="section-wrapper section-download" id="download">
            <!-- Multi-Strata Fluid Wave Parallax Background (Todo-3) -->
            <div class="section-parallax-bg" aria-hidden="true">
                <div class="parallax-layer layer-waves-far" id="parallax-layer-waves-far">
                    <img src="static/svg/abstract-waves-far.svg" class="parallax-svg" alt="" loading="lazy" />
                </div>
                <div class="parallax-layer layer-waves-mid" id="parallax-layer-waves-mid">
                    <img src="static/svg/abstract-waves-mid.svg" class="parallax-svg" alt="" loading="lazy" />
                </div>
                <div class="parallax-layer layer-waves-near" id="parallax-layer-waves-near">
                    <img src="static/svg/abstract-waves-near.svg" class="parallax-svg" alt="" loading="lazy" />
                </div>
            </div>

            <div class="container download-container">
                <header class="section-header">
                    <span class="section-kicker" data-i18n="downloadKicker">Download Extension</span>
                    <h2 class="section-title download-main-title" data-i18n="downloadTitle">Get the ParaFlow - Browser Extenion</h2>
                    <p class="section-subtitle" data-i18n="downloadSubtitle">
                        Paraflow is a browser extension that is sandboxed in your browser of choice which enables a secure environment and your decicsion on which pages the extension are used.
                    </p>
                </header>

                <!-- Browser Extensions Hero Card -->
                <div class="download-card platform-card">
                    <div class="platform-card-header">
                        <h3 class="platform-heading" data-i18n="platformHeading">Browser Extensions</h3>
                        <p class="platform-subheading" data-i18n="platformSubheading">
                            ParaFlow is available for the following browsers as an extension.
                        </p>
                    </div>

                    <div class="browser-grid">
                        <!-- Temporary non-covering overlay noting Coming Soon -->
                        <div class="coming-soon-overlay browser-grid-overlay" aria-hidden="true">
                            <span class="coming-soon-pill">
                                <span class="coming-soon-pulse" aria-hidden="true"></span>
                                <span class="coming-soon-text" data-i18n="comingSoon">Coming Soon</span>
                            </span>
                        </div>

                        <!-- Toggle off Coming Soon for an individual button by removing 'is-coming-soon' -->
                        <a href="https://apps.apple.com/safari" target="_blank" rel="noopener noreferrer" class="browser-btn btn-safari is-coming-soon" data-coming-soon="true" aria-label="Download for Apple Safari (Coming Soon)">
                            <span class="browser-icon" aria-hidden="true">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none" />
                                </svg>
                            </span>
                            <span class="browser-text">
                                <span class="browser-action" data-i18n="browserDownloadPrefix">Download for</span>
                                <span class="browser-name">Apple Safari</span>
                            </span>
                            <span class="btn-coming-soon-tag" aria-hidden="true" data-i18n="comingSoon">Coming Soon</span>
                        </a>

                        <!-- Toggle off Coming Soon for an individual button by removing 'is-coming-soon' -->
                        <a href="https://chromewebstore.google.com" target="_blank" rel="noopener noreferrer" class="browser-btn btn-chrome is-coming-soon" data-coming-soon="true" aria-label="Download for Google Chrome (Coming Soon)">
                            <span class="browser-icon" aria-hidden="true">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="4" />
                                    <line x1="21.17" y1="8" x2="12" y2="8" />
                                    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                                    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                                </svg>
                            </span>
                            <span class="browser-text">
                                <span class="browser-action" data-i18n="browserDownloadPrefix">Download for</span>
                                <span class="browser-name">Google Chrome</span>
                            </span>
                            <span class="btn-coming-soon-tag" aria-hidden="true" data-i18n="comingSoon">Coming Soon</span>
                        </a>

                        <!-- Toggle off Coming Soon for an individual button by removing 'is-coming-soon' -->
                        <a href="https://addons.mozilla.org" target="_blank" rel="noopener noreferrer" class="browser-btn btn-firefox is-coming-soon" data-coming-soon="true" aria-label="Download for Mozilla Firefox (Coming Soon)">
                            <span class="browser-icon" aria-hidden="true">
                                <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.807 9.776c0.011 0 0.005 0 0 0zM8.109 7.927c0.011 0 0.005 0 0 0zM30.229 10.781c-0.667-1.604-2.021-3.333-3.079-3.885 0.865 1.692 1.365 3.396 1.552 4.661l0.005 0.027c-1.739-4.329-4.681-6.073-7.088-9.871-0.12-0.192-0.24-0.385-0.36-0.588-0.063-0.104-0.115-0.208-0.172-0.319-0.099-0.192-0.171-0.395-0.224-0.609 0-0.020-0.015-0.036-0.036-0.041-0.011 0-0.021 0-0.031 0l-0.005 0.005c-0.005 0-0.011 0.005-0.011 0.005s0-0.005 0.005-0.011c-3.417 2-4.828 5.505-5.193 7.729-1.057 0.063-2.088 0.328-3.041 0.776-0.183 0.093-0.265 0.303-0.197 0.489 0.077 0.213 0.317 0.319 0.525 0.224 0.833-0.391 1.729-0.625 2.651-0.687l0.089-0.011c0.125-0.005 0.255-0.011 0.38-0.011 0.745-0.005 1.489 0.099 2.203 0.307l0.125 0.037c0.12 0.036 0.235 0.077 0.355 0.12 0.083 0.031 0.172 0.063 0.255 0.099 0.068 0.025 0.136 0.057 0.203 0.083 0.105 0.048 0.209 0.1 0.313 0.152l0.14 0.067c0.104 0.053 0.204 0.109 0.303 0.167 0.063 0.037 0.125 0.073 0.187 0.115 1.111 0.688 2.037 1.641 2.683 2.776-0.817-0.572-2.287-1.145-3.697-0.895 5.52 2.76 4.036 12.265-3.615 11.905-0.683-0.025-1.355-0.156-1.995-0.385-0.156-0.057-0.308-0.12-0.453-0.183-0.088-0.041-0.177-0.083-0.26-0.124-1.876-0.969-3.423-2.803-3.615-5.027 0 0 0.708-2.64 5.072-2.64 0.475 0 1.824-1.319 1.849-1.699-0.011-0.125-2.683-1.187-3.724-2.213-0.557-0.547-0.817-0.812-1.052-1.011-0.125-0.109-0.26-0.208-0.401-0.301-0.348-1.224-0.364-2.521-0.041-3.751-1.579 0.719-2.803 1.855-3.693 2.855h-0.009c-0.609-0.771-0.563-3.313-0.532-3.844-0.005-0.036-0.453 0.229-0.511 0.271-0.536 0.385-1.041 0.813-1.5 1.287-0.525 0.531-1.004 1.104-1.437 1.719-0.984 1.396-1.687 2.979-2.057 4.645-0.005 0.021-0.145 0.647-0.249 1.417-0.021 0.12-0.037 0.24-0.052 0.359-0.043 0.292-0.073 0.589-0.089 0.881l-0.005 0.047c-0.009 0.172-0.020 0.339-0.031 0.511v0.077c0 8.48 6.875 15.355 15.355 15.355 7.593 0 13.9-5.516 15.135-12.756 0.027-0.197 0.047-0.395 0.068-0.593 0.307-2.631-0.031-5.401-0.995-7.713z"/>
                                </svg>
                            </span>
                            <span class="browser-text">
                                <span class="browser-action" data-i18n="browserDownloadPrefix">Download for</span>
                                <span class="browser-name">Mozilla Firefox</span>
                            </span>
                            <span class="btn-coming-soon-tag" aria-hidden="true" data-i18n="comingSoon">Coming Soon</span>
                        </a>
                    </div>
                    <a href="https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/releases" class="browser-btn direct-download-pill" target="_blank" rel="noopener noreferrer" data-i18n="directDownloadPill">
                        Or download directly
                    </a>
                </div>

                <!-- Community Feature Addition Cards (Todo-2 Slingshot Mechanics) -->
                <div class="download-action-row" id="download-action-row">
                    <!-- Left Action Card: Feature Idea -->
                    <a href="https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/discussions" target="_blank" rel="noopener noreferrer" class="action-card card-feature-idea" id="btn-feature-idea" aria-label="Feature Idea: Add an Idea for possible future release">
                        <div class="action-card-content">
                            <span class="action-card-kicker" data-i18n="featureIdeaKicker">\u2605 Feature Idea \u2605</span>
                            <h4 class="action-card-title" data-i18n="featureIdeaTitle">Have an idea with potential? Submit a feature request by clicking here!</h4>
                            <span class="action-card-cta" data-i18n="featureIdeaCta">Communicate with the Team!</span>
                        </div>
                        <div class="slingshot-icon-stage" aria-hidden="true">
                            <div class="slingshot-icon-wrapper icon-feature">
                                <svg class="slingshot-svg svg-feature" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.04 24" fill="currentColor">
                                    <path class="slingshot-path slingshot-rate-base slingshot-feature-head" d="M6.758 10.68c-2.634-.0356-5.167 1.741-6.026 4.232-.8518 2.314-.2217 5.081 1.564 6.785 1.981 1.98 5.302 2.37 7.699.9314 1.948-1.11 3.163-3.304 3.177-5.534.1157-2.391-1.276-4.823-3.494-5.786-.9142-.4122-1.917-.6231-2.919-.6281zm2.819 3.475c.7931-.0437 1.348.9658.8721 1.607-.4144.692-1.562.5797-1.84-.1753-.2925-.6597.2475-1.455.9677-1.432zm-5.623 0c.7931-.0437 1.348.9658.8721 1.607-.4144.692-1.562.5797-1.84-.1753-.2925-.6597.2475-1.455.9677-1.432zm7.055 3.804c-.2457 2.057-2.172 3.732-4.244 3.684-2.106.0502-4.081-1.693-4.247-3.799.0423-.497.5867-.4845.9603-.4666 2.374.0071 4.749-.0143 7.122.0107.257.0467.4527.3104.4079.571z"/>
                                    <path class="slingshot-path slingshot-rate-mid slingshot-feature-bulb" id="feature-bulb-rays" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".9743" d="M6.722.9935v.4871m3.444.9402-.3459.3459m-6.542-.3459.3459.3459m5.534 3.098c.0836-1.854-2.258-3.12-3.763-2.035-1.327.7976-1.409 2.698-.4054 3.775.3264.4987.2687 1.104.2719 1.67.0037.5005.5274.5038.8878.4871.5475-.0058 1.096.0119 1.643-.0094.3655-.0595.4182-.4516.3921-.7532-.0257-.6234.0784-1.276.5331-1.746a2.404 2.404 0 0 0 .4412-1.389z"/>
                                    <path class="slingshot-path slingshot-rate-high slingshot-feature-plus" d="M16.68 11.94h-1.915v1.915h-1.618V11.94h-1.915v-1.636h1.915V8.407h1.618v1.897h1.915z"/>
                                </svg>
                            </div>
                        </div>
                    </a>

                    <!-- Right Action Card: Issue Report -->
                    <a href="https://github.com/ParaFlow-Speed-Reader/Paraflow-Landing/issues" target="_blank" rel="noopener noreferrer" class="action-card card-issue-report" id="btn-issue-report" aria-label="Issue? Please visit Paraflow's Github to submit a report for fixing">
                        <div class="action-card-content">
                            <h4 class="action-card-title" data-i18n="issueReportTitle">Report an Issue: Click Here! To submit a report for response.</h4>
                            <span class="action-card-cta" data-i18n="issueReportCta">Notify the team.</span>
                        </div>
                        <div class="slingshot-icon-stage" aria-hidden="true">
                            <div class="slingshot-icon-wrapper icon-issue">
                                <svg class="slingshot-svg svg-issue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" fill="currentColor">
                                    <path class="slingshot-path slingshot-rate-base slingshot-issue-horn" d="M4.135 15.7c-1.718-.6046-2.848-2.816-2.558-5.007.2361-1.786 1.237-3.173 2.624-3.635 1.896-.6321 3.868 1.071 4.207 3.635.2253 1.704-.4649 3.607-1.635 4.508-.7534.5799-1.829.7836-2.637.4994zm1.983-1.043c.4206-.2478 1.032-.9033 1.032-1.106 0-.196-.4883-.8324-.7898-1.029-.2324-.1517-.3925-.3461-.7706-.1267-.7126.4135-.542.354-1.14 0-.328-.0432-.514-.0203-.7429.0916-.3119.1524-.8733.8352-.8733 1.062 0 .1586.5386.7966.8449 1.001.4644.3097.7831.392 1.418.366.5-.0203.7064-.0725 1.022-.2583zm1.171-5.27c0-.2101-.7494-1.038-1.166-1.287-.3565-.2138-.4808-.2399-1.131-.2378-.663.0022-.7698.0265-1.149.2616-.4357.2704-1.149 1.055-1.149 1.264 0 .0991.4169-.3304 2.303-.3304s2.292.4295 2.292.3304zM16.58 4.419c-.3247.0068-.6277.2952-.8886.8727-.5474.8412-1.801 2.31-2.678 2.141-.3724-.079-.5153.1445-.5153.8063.4723 2.339.4934 1.684-1.457 2.432.2087.3099.4146.504.6834.7953.4561-.438.9981-.3308 1.359-.18.3749.2429.3548.0554.5297.0269.4437-.0723.8279-.4192 1.271-.4943.7019-.0893 1.395-.2132 2.018.0768.7494.3967 1.304.5446 1.658-.2392.1593-.3599.1736-.4778.1681-1.377-.0075-1.213-.169-1.983-.6523-3.109-.5017-1.169-1.022-1.76-1.497-1.75zm1.015 1.307c.9756 1.568 1.124 5.604-.0427 5.049-1.354-1.023-2.035-3.989-1.511-5.407.3834-1.097.9923-.4575 1.553.3582zm-2.048.5506c-.0387.48-.0172.9653.0506 1.49-.0236.0343-2.632.9434-2.733.9527-.1327-.2058-.0871-.4023-.0871-.6821.9956-.4916 2.083-1.061 2.77-1.76zm-3.086.9322c-.2969.0216-1.665.4974-1.781.6295-.1148.1296-.0391 1.778.1049 2.286.0644.2273.1548.411.2013.4082.5684-.1774 1.044-.2866 1.612-.5529-.0733-.7231-.5648-1.979-.1128-2.534.1567-.1889.1571-.1942.0206-.2346q-.0146-.0043-.0445-.002zm-.3123.3568c-.1343.2356-.1414.6068-.07 1.357-.317.0339-.548-.948-.7157-1.114.21-.1707.5756-.2216.7857-.2435zm-1.76.6214c-.4347.1861-.9612.426-1.168.8005-.2712.5024.2467 2.194.6774 2.643.5654.3071.7002.2776 1.506.036-.8184-.861-1.025-2.104-1.023-2.796zm-.2036.6124c-.0128.2139.0518.601-.1709.6887-.2995.1179-.7013.2003-.7523.2002-.0132-.4657.5996-.8549.9233-.8889zm4.497 2.273c-.1894-.0061-.8598.3618-.8598.4718.2832.3997.2366.8571-.072 1.106-.2087.1608-.2963.1799-.6423.1404-.3589-.041-.4007-.0305-.4007.1008 0 .177.151.4556.3843.5173.582-.2278 2.088-.9619 2.113-1.597 0-.3195-.2459-.7297-.5228-.7386zm-2.302.1736c-.1201.0006-1.462 1.223-1.553 1.415-.0661.8031.3083 1.266.3 2.149-.6266.9913-1.341 1.285-.9741 1.892.4345.7181 1.92.9449 2.518.018.4095-.5572 1.367-.514.7564-1.357-.1427-.0619-.3154-.4798-.2681-.6484-.0677-.3855-.4031-.597-.3565-.9397.0463-.3856-.1753-.4593-.3043-.7569 0-.1402-.0625-.147-.3264-.0358-.2445-.0088.1909-.3505.3614-.5414l.3912.0832c.2152.0457.4734.0597.5739.0312.2332-.0661.3908-.3419.3419-.5619-.2747-.497-.9699-.6262-1.46-.7473zm2.549 1.414c-.637.468-1.276.6275-1.922 1.13-.0566.1651.2506.7285.4465.7234 1.022-.4675 1.34-.4757 1.857-.9546.2554-.403.033-1.202-.381-.8983zm-.7219 1.728c-.8067.2987-.7818.2318-.4146 1.118.1967.4571.5265.2374.814.1228.5459-.3271.5553-.7196.5662-.9435-.2077-.7142-.4978-.47-.9657-.2976zM21.14 10.19c-.4755-.4541-.5057-.7535-.0442-.438.1985.1358.2917.1465.265.0304-.0524-.228.0333-.1954.5878.2235.4679.3534.5559.6437.1525.5032-.1273-.0444-.3016-.0446-.3874-.0004-.0876.045-.3392-.0947-.5737-.3187zm-1.606-6.792c.1363-.5204.2279-.6729.3734-.6222.1061.037.2187-.0265.2503-.141s.1264-.2282.2106-.2527c.0936-.0272.0825.2119-.0285.6142-.1258.456-.235.6402-.3549.5984-.0953-.0332-.2763.064-.4024.2162-.2004.2418-.2065.1899-.0486-.4129zM19.25 5.894c.005-.0614.3301-.302.7228-.5346.6582-.3899.6946-.4434.4658-.685-.2024-.2138-.2085-.2866-.0332-.3954.3055-.1895 2.779-.6617 2.863-.5465.0383.0527-.284.2796-.7165.5041-.7368.3827-.7725.429-.5693.7388.1192.1818.187.3572.1505.3898-.1446.1294-2.891.6331-2.883.5287zM19.6 7.423c.0162.0411.3315.1383.7007.2161.6189.1303.6594.1594.5189.3727-.1243.1887-.115.2399.0509.278.289.0664 2.418-.1245 2.464-.2209.021-.044-.2892-.1325-.6894-.1965-.6822-.1091-.7207-.1334-.6147-.388.0622-.1494.0832-.2838.0468-.2985-.1446-.0586-2.505.1674-2.477.2373z"/>
                                    <path class="slingshot-path slingshot-rate-mid slingshot-issue-horn-tip" d="M.9864 6.46C.5676 5.8441.5489 4.789.9445 4.097c.7401-1.293 1.927.2478 1.445 1.876-.4664-.6014-1.022.1791-1.403.4865zm6.785.1409c-.6706-.4324-.5333-2.274.092-2.792.3442-.2854.4822-.2883.8097-.0167.4774.3959.6581 1.352.4125 2.182-.7975-.5865-.9043-.214-1.314.6275z"/>
                                    <path class="slingshot-path slingshot-rate-high slingshot-issue-details" d="M16.51 5.759c-.062.004-.119.0366-.1666.1083-.1812.4449-.1439 1.008-.1511 1.38.026.2198.1204.8787.2367 1.3.158.5923.509 1.302 1.062 1.631.4658.1921.5232-1.199.4084-1.845-.1137-.6571-.2881-1.334-.6238-1.882-.1299-.1893-.4966-.7092-.7657-.6922zm-.3177 1.489c-.026-.2198-.0072.3726 0 0m1.122-.004c.2268 0 .4466.4086.447.8305.0004.5286-.2384.6667-.4827.279-.0793-.1256-.1442-.2718-.1442-.3246 0-.0679-.0666-.0792-.2264-.0382-.3804.0975-.4998.0861-.5243-.0502-.017-.095.0708-.1653.3257-.261.2178-.0817.365-.188.3917-.283.027-.096.1059-.1525.2133-.1525z"/>
                                    <path class="slingshot-path slingshot-rate-max slingshot-issue-waves" d="M17.62 11.18c-.5958-.8291-.9738-1.914-1.265-2.991-.2218-1.148-.3949-2.421-.0729-3.553.1717-.6272.7517-.9943 1.179-.5502.8064.7231 1.238 1.997 1.544 3.201.2518 1.16.4426 2.481.0652 3.618-.478.8677-.9888.7746-1.45.2763zm.0278-6.446c-.531-.8384-.8611-.4769-1.007-.154-.6483 1.765.047 4.187.735 5.621.2316.5345.6029.9857 1.058 1.021 1.067-.5501.4472-3.397.4169-3.533-.103-.4618-.29-1.513-1.203-2.955z"/>
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
  `.trim();
}

// src/landing/layout/MotionToggle/MotionToggleController.ts
function safeGetStorage(key) {
  try {
    return typeof window !== "undefined" && window.localStorage ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}
function safeSetStorage(key, val) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, val);
    }
  } catch {
  }
}
var _MotionToggleController = class _MotionToggleController {
  constructor() {
    __publicField(this, "motionBtn", null);
    __publicField(this, "jumpToTopBtn", null);
    __publicField(this, "host", null);
    __publicField(this, "isReduced", false);
    __publicField(this, "lastScrollY", 0);
    __publicField(this, "isScrollTicking", false);
    __publicField(this, "lengthyTimeout");
    _MotionToggleController.instance = this;
    this.motionBtn = document.getElementById("btn-motion-toggle");
    this.jumpToTopBtn = document.getElementById("btn-jump-to-top");
    this.host = document.querySelector(".accessibility-btns-host");
    if (typeof window !== "undefined") {
      window.__PARAFLOW_MOTION_CONTROLLER__ = this;
    }
    this.initMotionState();
    this.bindEvents();
    this.initScrollDynamics();
  }
  static getInstance() {
    return _MotionToggleController.instance;
  }
  /**
   * Static query to check current motion state anywhere in the application
   */
  static isReducedMotion() {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute(_MotionToggleController.ROOT_ATTR);
      if (attr === "true") return true;
      if (attr === "false") return false;
    }
    const saved = safeGetStorage(_MotionToggleController.STORAGE_KEY);
    if (saved === "disabled") return true;
    if (saved === "enabled") return false;
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const osReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isTouch || osReduced;
    }
    return false;
  }
  /**
   * Register a listener callback for motion state mutations
   */
  static addMotionListener(callback) {
    _MotionToggleController.listeners.add(callback);
    return () => {
      _MotionToggleController.listeners.delete(callback);
    };
  }
  /**
   * Determine initial motion state based on localStorage, touch capabilities, or OS preferences
   */
  initMotionState() {
    const savedPref = safeGetStorage(_MotionToggleController.STORAGE_KEY);
    if (savedPref === "disabled") {
      this.isReduced = true;
    } else if (savedPref === "enabled") {
      this.isReduced = false;
    } else {
      const isTouch = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const osReduced = typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      this.isReduced = isTouch || osReduced;
    }
    this.applyMotionState(this.isReduced, false);
  }
  /**
   * Bind click and keyboard toggle events
   */
  bindEvents() {
    if (!this.motionBtn) return;
    this.motionBtn.addEventListener("click", () => {
      this.toggleMotion();
    });
    if (this.jumpToTopBtn) {
      this.jumpToTopBtn.addEventListener("click", () => {
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      });
    }
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener?.("change", (e) => {
        const hasSaved = safeGetStorage(_MotionToggleController.STORAGE_KEY) !== null;
        if (!hasSaved) {
          this.applyMotionState(e.matches, false);
        }
        if (this.lengthyTimeout) clearTimeout(this.lengthyTimeout);
        this.motionBtn?.classList.toggle("timed-out", false);
        this.lengthyTimeout = setTimeout(() => {
          this.motionBtn?.classList.add("timed-out");
        }, 1e4);
      });
      this.lengthyTimeout = setTimeout(() => {
        this.motionBtn?.classList.add("timed-out");
      }, 1e4);
    }
  }
  /**
   * Toggle between motion enabled and motion paused
   */
  toggleMotion() {
    const nextState = !this.isReduced;
    this.applyMotionState(nextState, true);
  }
  /**
   * Apply motion state to DOM, attributes, and notify listeners
   */
  applyMotionState(reduced, persist = true) {
    this.isReduced = reduced;
    if (typeof document !== "undefined") {
      if (reduced) {
        document.documentElement.setAttribute(_MotionToggleController.ROOT_ATTR, "true");
      } else {
        document.documentElement.removeAttribute(_MotionToggleController.ROOT_ATTR);
      }
    }
    if (persist) {
      safeSetStorage(
        _MotionToggleController.STORAGE_KEY,
        reduced ? "disabled" : "enabled"
      );
    }
    if (this.motionBtn) {
      if (reduced) {
        this.motionBtn.classList.add("is-paused");
        this.motionBtn.setAttribute("aria-pressed", "true");
        this.motionBtn.setAttribute("aria-label", "Resume page motion and animations");
        this.motionBtn.setAttribute("title", "Resume page motion");
      } else {
        this.motionBtn.classList.remove("is-paused");
        this.motionBtn.setAttribute("aria-pressed", "false");
        this.motionBtn.setAttribute("aria-label", "Pause page motion and animations");
        this.motionBtn.setAttribute("title", "Pause page motion");
      }
    }
    _MotionToggleController.listeners.forEach((cb) => {
      try {
        cb(reduced);
      } catch (err) {
        console.warn("[MotionToggleController] Listener error:", err);
      }
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("paraflow:motion-change", {
          detail: { isReduced: reduced }
        })
      );
    }
  }
  initScrollDynamics() {
    if (typeof window === "undefined" || !this.host) return;
    this.lastScrollY = window.scrollY || 0;
    this.handleScrollUpdate();
    window.addEventListener(
      "scroll",
      () => {
        if (!this.isScrollTicking) {
          this.isScrollTicking = true;
          const raf = typeof window.requestAnimationFrame === "function" ? (cb) => window.requestAnimationFrame(cb) : (cb) => setTimeout(cb, 16);
          raf(() => {
            this.handleScrollUpdate();
            this.isScrollTicking = false;
          });
        }
      },
      { passive: true }
    );
  }
  handleScrollUpdate(customScrollY) {
    if (!this.host) return;
    const currentScrollY = customScrollY !== void 0 ? customScrollY : (typeof window !== "undefined" ? window.scrollY : 0) || 0;
    const delta = currentScrollY - this.lastScrollY;
    if (currentScrollY <= 60) {
      this.host.classList.add("is-top-scrolled");
      this.host.classList.remove("is-scrolled-down", "is-scrolling-down");
    } else {
      this.host.classList.remove("is-top-scrolled");
      this.host.classList.add("is-scrolled-down");
      if (delta > 8) {
        this.host.classList.add("is-scrolling-down");
        this.host.classList.remove("is-scrolling-up");
      } else if (delta < -8) {
        this.host.classList.remove("is-scrolling-down");
        this.host.classList.add("is-scrolling-up");
      }
    }
    this.lastScrollY = currentScrollY;
  }
};
__publicField(_MotionToggleController, "STORAGE_KEY", "paraflow_motion");
__publicField(_MotionToggleController, "ROOT_ATTR", "data-reduce-motion");
__publicField(_MotionToggleController, "listeners", /* @__PURE__ */ new Set());
__publicField(_MotionToggleController, "instance", null);
var MotionToggleController = _MotionToggleController;

// src/landing/sections/Download/DownloadSlingshotController.ts
var DownloadSlingshotController = class {
  constructor() {
    __publicField(this, "featureCard");
    __publicField(this, "issueCard");
    __publicField(this, "actionRow");
    __publicField(this, "prefersReducedMotion", false);
    this.featureCard = document.getElementById("btn-feature-idea");
    this.issueCard = document.getElementById("btn-issue-report");
    this.actionRow = document.getElementById("download-action-row");
    if (!this.featureCard || !this.issueCard || !this.actionRow) {
      return;
    }
    this.prefersReducedMotion = MotionToggleController.isReducedMotion();
    MotionToggleController.addMotionListener((reduced) => {
      this.prefersReducedMotion = reduced;
      if (reduced) {
        this.handleLeave();
      }
    });
    this.init();
  }
  init() {
    if (!this.featureCard || !this.issueCard || !this.actionRow) return;
    this.featureCard.addEventListener("pointerenter", () => this.handleFeatureEnter(), { passive: true });
    this.featureCard.addEventListener("pointerleave", () => this.handleLeave(), { passive: true });
    this.featureCard.addEventListener("focus", () => this.handleFeatureEnter(), { passive: true });
    this.featureCard.addEventListener("blur", () => this.handleLeave(), { passive: true });
    this.issueCard.addEventListener("pointerenter", () => this.handleIssueEnter(), { passive: true });
    this.issueCard.addEventListener("pointerleave", () => this.handleLeave(), { passive: true });
    this.issueCard.addEventListener("focus", () => this.handleIssueEnter(), { passive: true });
    this.issueCard.addEventListener("blur", () => this.handleLeave(), { passive: true });
  }
  handleFeatureEnter() {
    if (!this.actionRow || !this.featureCard || this.prefersReducedMotion) return;
    this.actionRow.classList.remove("pulling-right");
    this.actionRow.classList.add("pulling-left");
    this.featureCard.classList.add("is-active-hover");
    this.retriggerAnimation(this.featureCard);
  }
  handleIssueEnter() {
    if (!this.actionRow || !this.issueCard || this.prefersReducedMotion) return;
    this.actionRow.classList.remove("pulling-left");
    this.actionRow.classList.add("pulling-right");
    this.issueCard.classList.add("is-active-hover");
    this.retriggerAnimation(this.issueCard);
  }
  handleLeave() {
    if (!this.actionRow) return;
    this.actionRow.classList.remove("pulling-left", "pulling-right");
    if (this.featureCard) this.featureCard.classList.remove("is-active-hover");
    if (this.issueCard) this.issueCard.classList.remove("is-active-hover");
  }
  retriggerAnimation(card) {
    const iconWrapper = card.querySelector(".slingshot-icon-wrapper");
    if (!iconWrapper) return;
    iconWrapper.style.animation = "none";
    void iconWrapper.offsetWidth;
    iconWrapper.style.animation = "";
  }
};
export {
  DownloadSlingshotController,
  renderDownload
};
