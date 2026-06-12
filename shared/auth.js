/**
 * Lightweight client-side admin session helper (shared by login.html + dashboard.html).
 *
 * IMPORTANT: This is a *client-side gate*, not real security. The credential hashes
 * live in the page and anyone can read the source or open dashboard.html directly.
 * It's a convenience lock for a personal admin area on a static (GitHub Pages) site —
 * not a substitute for server-side auth.
 *
 * Session = a flag in localStorage with an expiry. No password is ever stored.
 */
(function (global) {
  'use strict';

  var KEY = 'pdftools_admin_session';
  var TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

  var AdminAuth = {
    /** Mark the user as signed in for TTL_MS. */
    setSession: function (user) {
      var now = Date.now();
      try {
        localStorage.setItem(KEY, JSON.stringify({ user: user, ts: now, exp: now + TTL_MS }));
      } catch (e) { /* storage unavailable */ }
    },

    /** Return the live session object, or null if missing/expired. */
    getSession: function () {
      try {
        var s = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (!s || !s.exp || Date.now() > s.exp) {
          if (s) this.logout();
          return null;
        }
        return s;
      } catch (e) { return null; }
    },

    isAuthed: function () { return !!this.getSession(); },

    logout: function () {
      try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    },

    /** Bounce to login if not authed. Returns true when authed. */
    guard: function (loginUrl) {
      if (this.isAuthed()) return true;
      location.replace(loginUrl || 'login.html');
      return false;
    }
  };

  global.AdminAuth = AdminAuth;
})(window);
