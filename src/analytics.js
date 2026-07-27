const measurementId = "G-HPH0NTQVX8";
const productionHost = "ai-slang.com";
const consentKey = "ai_slang_analytics_consent";
const consentGranted = "analytics_granted";
const consentDenied = "denied";
const validPlacements = new Set([
  "home_featured",
  "home_index",
  "related_terms",
  "article_dictionary",
  "quick_pick"
]);

function isProductionHost() {
  return window.location.hostname === productionHost;
}

function gtag(..._args) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
}

function readConsent() {
  try {
    return localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

function writeConsent(value) {
  try {
    localStorage.setItem(consentKey, value);
  } catch {
    // Consent still updates in memory when localStorage is unavailable.
  }
}

function setDefaultConsent() {
  ensureGtag();
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
}

function updateConsent(analyticsStorage) {
  ensureGtag();
  gtag("consent", "update", {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
}

function loadGoogleTag() {
  if (!isProductionHost() || document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
}

function configureAnalytics() {
  if (!isProductionHost()) return;
  ensureGtag();
  gtag("js", new Date());
  gtag("config", measurementId, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  loadGoogleTag();
}

function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sendEvent(name, params) {
  if (!isProductionHost() || readConsent() !== consentGranted) return;
  ensureGtag();
  gtag("event", name, { ...params, transport_type: "beacon" });
}

function showBanner() {
  document.body.classList.add("has-consent-banner");
  const banner = document.querySelector("[data-consent-banner]");
  if (banner) banner.hidden = false;
}

function hideBanner() {
  document.body.classList.remove("has-consent-banner");
  const banner = document.querySelector("[data-consent-banner]");
  if (banner) banner.hidden = true;
}

function renderConsentControls() {
  if (document.querySelector("[data-consent-banner]")) return;
  const banner = document.createElement("section");
  banner.className = "consent-banner";
  banner.dataset.consentBanner = "";
  banner.setAttribute("aria-label", "Analytics privacy choices");
  banner.innerHTML = `
    <div>
      <strong>Analytics choices</strong>
      <p>GA4 helps measure aggregate page visits, term navigation, and source clicks. It loads only after you accept analytics.</p>
    </div>
    <div class="consent-actions">
      <button type="button" class="plain-button" data-consent-reject>Reject</button>
      <button type="button" class="plain-button consent-primary" data-consent-accept>Accept analytics</button>
    </div>
  `;
  document.body.append(banner);
}

function grantAnalytics() {
  writeConsent(consentGranted);
  updateConsent("granted");
  configureAnalytics();
  hideBanner();
}

function denyAnalytics() {
  writeConsent(consentDenied);
  updateConsent("denied");
  hideBanner();
}

function bindPrivacyChoices() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-consent-accept]")) {
      grantAnalytics();
      return;
    }
    if (event.target.closest("[data-consent-reject]")) {
      denyAnalytics();
      return;
    }
    if (event.target.closest("[data-privacy-choices]")) {
      event.preventDefault();
      showBanner();
    }
  });
}

function placementForTermLink(link) {
  if (link.dataset.analyticsPlacement) return link.dataset.analyticsPlacement;
  if (link.closest(".related-grid")) return "related_terms";
  if (link.classList.contains("featured")) return "home_featured";
  if (link.classList.contains("term-card")) return "home_index";
  return "home_index";
}

function bindContentEvents() {
  document.addEventListener("click", (event) => {
    const termLink = event.target.closest("a[href^='/terms/'], button[data-word]");
    if (termLink?.dataset.analyticsTracked !== "false") {
      const slug = normalizeSlug(termLink.dataset.slug || termLink.dataset.word || termLink.getAttribute("href"));
      const placement = placementForTermLink(termLink);
      if (slug && validPlacements.has(placement)) {
        sendEvent("select_content", {
          content_type: "term",
          content_slug: slug,
          placement
        });
      }
      return;
    }

  });
}

function initialize() {
  setDefaultConsent();
  renderConsentControls();
  bindPrivacyChoices();
  bindContentEvents();

  if (readConsent() === consentGranted) {
    updateConsent("granted");
    configureAnalytics();
    hideBanner();
  } else if (readConsent() === consentDenied) {
    updateConsent("denied");
    hideBanner();
  } else {
    showBanner();
  }
}

window.aiSlangAnalytics = {
  trackSearch(hasResults) {
    sendEvent("site_search", { result_state: hasResults ? "has_results" : "no_results" });
  },
  trackShare(method) {
    if (["copy_link", "x", "reddit"].includes(method)) {
      sendEvent("share", { method });
    }
  }
};

initialize();
