# inspiro_official_bot

## Tryout
[Deployed Bot](https://t.me/inspiro_official_bot)

## Startup

In development you can use webhook or not to check how it works. On production it's preferable to use webhook in swarm mode, so `IS_WEBHOOK_DISABLED` variable default is `false`, but there also `docker-compose` version with polling where `IS_WEBHOOK_DISABLED` variable default is `true`.

### Development
`BOT_TOKEN=... IS_WEBHOOK_DISABLED=... docker-compose -f development.docker-compose.yml up --build`

### Production
#### Docker Compose
`BOT_TOKEN=... docker-compose -f production.docker-compose.yml up -d`

#### Docker Swarm
`BOT_TOKEN=... WEBHOOK_URL=... WEBHOOK_PORT=... docker stack deploy -c production.docker-swarm.yml inspiro_official_bot`

##### Webhook info
Telegram can't use subdomain like `example.example.com`, so you need to use something like `example.com/bots/...` for your webhook.

Also if you using https for this domain, you need to pass `443` port for `WEBHOOK_PORT` env variable, so telegram api and traefik work together.