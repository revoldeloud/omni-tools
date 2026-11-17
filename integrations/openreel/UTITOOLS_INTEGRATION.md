# OpenReel in Utitools

This directory vendors the OpenReel Video web editor source under its MIT license (see LICENSE). Utitools builds the app separately and serves it from /openreel/. The primary action on the video category opens that local app path.

The Vite base path, icons, PWA manifest, and service worker are scoped to /openreel/ so they do not overlap with Utitools. Cloudflare Pages sets cross-origin isolation headers for the editor assets.

Upstream: https://github.com/Augani/openreel-video
