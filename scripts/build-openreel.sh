#!/usr/bin/env bash
set -euo pipefail

pnpm -C integrations/openreel install --frozen-lockfile
pnpm -C integrations/openreel build
mkdir -p dist/openreel
cp -R integrations/openreel/apps/web/dist/. dist/openreel/
