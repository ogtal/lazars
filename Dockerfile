FROM node:20-bookworm-slim

RUN useradd -m -u 1050 lazar
USER lazar
WORKDIR /home/lazar

COPY --chown=lazar package* ./
RUN npm ci

COPY --chown=lazar assets ./assets
COPY --chown=lazar components ./components
COPY --chown=lazar composables ./composables
COPY --chown=lazar pages ./pages
COPY --chown=lazar public ./public
COPY --chown=lazar server ./server
COPY --chown=lazar utils ./utils
COPY --chown=lazar app.vue .
COPY --chown=lazar nuxt.config.ts .
COPY --chown=lazar tailwind.config.ts .
COPY --chown=lazar tsconfig.json .

RUN npm run build

CMD [ "node", ".output/server/index.mjs" ]