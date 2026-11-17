#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git clone --depth 1 https://github.com/Augani/openreel-video.git "$tmp/openreel"
mkdir -p "$root/integrations/openreel"
rsync -a --delete \
  --exclude='/.git/' --exclude='/.serena/' --exclude='/.superpowers/' \
  --exclude='/icons/' --exclude='/**/node_modules/' --exclude='/**/dist/' \
  "$tmp/openreel/" "$root/integrations/openreel/"

python3 - "$root/integrations/openreel" <<'PY'
import json
import pathlib
import sys

base = pathlib.Path(sys.argv[1])

def replace_once(path, old, new):
    file = base / path
    text = file.read_text()
    if old not in text:
        raise SystemExit(f"Expected integration anchor not found: {path}: {old}")
    file.write_text(text.replace(old, new, 1))

replace_once("apps/web/vite.config.ts", 'base: isDesktop ? "./" : "/",', 'base: isDesktop ? "./" : "/openreel/",')
replace_once("apps/web/src/services/service-worker.ts", 'register("/sw.js", {', 'register("/openreel/sw.js", {')
replace_once("apps/web/src/services/service-worker.ts", 'scope: "/",', 'scope: "/openreel/",')

html = base / "apps/web/index.html"
text = html.read_text()
for old, new in [
    ('href="/favicon.svg"', 'href="/openreel/favicon.svg"'),
    ('href="/icons/', 'href="/openreel/icons/'),
    ('href="/manifest.json"', 'href="/openreel/manifest.json"'),
]:
    if old not in text:
        raise SystemExit(f"Expected integration anchor not found: apps/web/index.html: {old}")
    text = text.replace(old, new)
html.write_text(text)

manifest_path = base / "apps/web/public/manifest.json"
manifest = json.loads(manifest_path.read_text())
manifest["start_url"] = "/openreel/"
for icon in manifest.get("icons", []):
    if icon.get("src", "").startswith("/"):
        icon["src"] = "/openreel" + icon["src"]
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")

sw = base / "apps/web/public/sw.js"
text = sw.read_text()
for old, new in [
    ('const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];', 'const STATIC_ASSETS = ["/openreel/", "/openreel/index.html", "/openreel/manifest.json"];'),
    ('caches.match("/index.html")', 'caches.match("/openreel/index.html")'),
]:
    if old not in text:
        raise SystemExit(f"Expected integration anchor not found: apps/web/public/sw.js: {old}")
    text = text.replace(old, new, 1)
sw.write_text(text)

(base / "UTITOOLS_INTEGRATION.md").write_text("""# OpenReel in Utitools

This directory vendors the OpenReel Video web editor source under its MIT license (see LICENSE). Utitools builds the app separately and serves it from /openreel/. The primary action on the video category opens that local app path.

The Vite base path, icons, PWA manifest, and service worker are scoped to /openreel/ so they do not overlap with Utitools. Cloudflare Pages sets cross-origin isolation headers for the editor assets.

Upstream: https://github.com/Augani/openreel-video
""")
PY
