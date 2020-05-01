FROM node:12-alpine AS build
# `gettext` 為使用 `envsubst` 需要
RUN apk add --update --no-cache ca-certificates \ 
  openssl \
  gettext \
  yarn

COPY . /app

# build backend
WORKDIR /app

RUN yarn install
RUN yarn build

##########################################################
FROM node:12-alpine
# `gettext` 為使用 `envsubst` 需要
RUN apk add --update --no-cache ca-certificates \ 
  openssl \
  bash \
  gettext \
  yarn

# 建立使用者
RUN addgroup -S systalk && adduser -S systalk -G systalk

# 設定工作目錄為 /app
WORKDIR /app
COPY --chown=systalk:systalk --from=build /app/node_modules /app/node_modules
COPY --chown=systalk:systalk --from=build /app/dist /app
# COPY --chown=systalk:systalk --from=build /app/secret /app/secret
# COPY --chown=systalk:systalk --from=build /app/dist/public /app/public
COPY --chown=systalk:systalk --from=build /app/package.json /app/package.json
COPY --chown=systalk:systalk --from=build /app/yarn.lock /app/yarn.lock
# COPY --chown=systalk:systalk --from=build /app/deployment/config.js.template /config.js.template
# COPY --chown=systalk:systalk --from=build /app/deployment/start.sh /scripts/

# 讓 3000 連接埠可以從 Docker 容器外部存取
EXPOSE 3000

# 切換使用者
USER systalk

CMD ["node", "server"]
# CMD ["sh", "/scripts/start.sh"]