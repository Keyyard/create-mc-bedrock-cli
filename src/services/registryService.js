import https from 'https';

/**
 * Fetch the latest published version of a package from the npm registry.
 *
 * Returns a caret-prefixed range string (e.g. `^1.2.3`). On network/parse
 * failure or HTTP non-200 (including 404 for unpublished packages), returns
 * the supplied `fallback` so scaffolding can proceed offline or for not-yet-
 * published packages.
 *
 * Uses native `https` (no extra dep) and follows redirects (301/302).
 *
 * @param {string} pkgName  npm package name, including scope (e.g. `@minecraft/server`)
 * @param {string} [fallback='^0.0.0']  range to return if the lookup fails
 * @returns {Promise<string>} caret-prefixed range, e.g. `^1.2.3`
 */
export async function getLatestVersion(pkgName, fallback = '^0.0.0') {
  // Encode scope (`/`) for registry URL: `@minecraft/server` -> `@minecraft%2Fserver`
  const encoded = pkgName.replace('/', '%2F');
  const url = `https://registry.npmjs.org/${encoded}/latest`;

  try {
    const version = await fetchJsonField(url, 'version');
    if (typeof version !== 'string' || version.trim() === '') {
      return fallback;
    }
    return `^${version}`;
  } catch (_err) {
    // Network failure, 404 (unpublished), parse error — fall back silently.
    return fallback;
  }
}

/**
 * GET a JSON document over HTTPS, follow redirects, and return a single field.
 * @param {string} url
 * @param {string} field
 * @returns {Promise<unknown>}
 */
function fetchJsonField(url, field) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'create-mc-bedrock'
        }
      },
      (response) => {
        // Follow 301/302/307/308 redirects.
        if (
          [301, 302, 307, 308].includes(response.statusCode) &&
          response.headers.location
        ) {
          response.resume();
          fetchJsonField(response.headers.location, field).then(resolve, reject);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Registry returned ${response.statusCode} for ${url}`));
          response.resume();
          return;
        }
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed?.[field]);
          } catch (err) {
            reject(err);
          }
        });
        response.on('error', reject);
      }
    );
    req.on('error', reject);
    req.setTimeout(10_000, () => {
      req.destroy(new Error(`Registry request timed out: ${url}`));
    });
  });
}
