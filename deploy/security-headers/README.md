# Security headers

## Where things stand

brunelcs.org is hosted on **GitHub Pages, which does not let a site set its own HTTP response headers**. So `.htaccess` and `_headers` files do nothing there. What GitHub Pages already gives us, and what the site now does by itself:

| Control | Status on GitHub Pages today |
| --- | --- |
| HTTPS + redirect from HTTP | ✅ Enable **Settings → Pages → Enforce HTTPS** |
| Content-Security-Policy | ✅ Set by a `<meta http-equiv>` tag in every page. Scripts are `'self'` only, with no inline script, `eval` or inline styles |
| Referrer-Policy | ✅ Set by a `<meta name="referrer">` tag |
| HSTS (`Strict-Transport-Security`) | ❌ Header only. `<meta>` can't set it |
| Clickjacking (`X-Frame-Options` / `frame-ancestors`) | ❌ Header only. `<meta>` can't set it |
| `X-Content-Type-Options: nosniff` | ❌ Header only |

**An A+ on [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory) is not possible on GitHub Pages alone**, because HSTS and frame protection must be real headers. To reach A+, use one of these options.

## Option A: put Cloudflare in front (keeps GitHub Pages, free)

1. Add `brunelcs.org` to a free Cloudflare account and switch the domain's nameservers to Cloudflare. Keep the existing GitHub Pages DNS records, proxied (orange cloud).
2. **SSL/TLS → Overview:** set mode to **Full (strict)**.
3. **SSL/TLS → Edge Certificates:** turn on **Always Use HTTPS**, and enable **HSTS** with a max-age of 6 months or more, *include subdomains* and *preload*. Only turn on preload once you're sure every subdomain serves HTTPS (see below).
4. **Rules → Transform Rules → Modify Response Header:** create a rule for *All incoming requests* that **sets** every header listed under `/*` in [`_headers`](./_headers) (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy, Cross-Origin-Resource-Policy).

## Option B: move hosting to Cloudflare Pages or Netlify

Copy [`_headers`](./_headers) into `frontend/` so it's published at the site root. Both hosts read it automatically. Point the build output directory at `frontend/` and add `node tools/build-calendar.mjs` as the build command so `/events.ics` is generated.

## Option C: Apache hosting

Copy [`.htaccess`](./.htaccess) into the web root. It needs `mod_headers` and `mod_rewrite`.

## Before you enable HSTS preload

`preload` asks browsers to hard-code HTTPS for **brunelcs.org and every subdomain**, and removing a domain from the preload list takes months. Start with `max-age=300` and no `preload`, check that nothing breaks, then raise it to `63072000; includeSubDomains; preload` and submit the domain at <https://hstspreload.org>.

## Changing the CSP

The policy is written in three places, and they must match:

- the `<meta http-equiv="Content-Security-Policy">` tag in every page in `frontend/`
- `_headers`
- `.htaccess`

(The header versions also add `frame-ancestors 'none'`.) If you add a third-party resource, such as a new font host, an embed or analytics, add its origin to the right directive, or the browser will block it. Open DevTools → Console on each page after a change: blocked resources are reported there.
