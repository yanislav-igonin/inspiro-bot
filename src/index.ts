import Telegraf, { Markup, ContextMessageUpdate } from 'telegraf';
import axios from 'axios';
import ngrok from 'ngrok';

import { app } from './config';
import { logger } from './modules';

const bot = new Telegraf(app.botToken);

bot.catch(
  (err: Error): void => {
    logger.error(`ERROR: ${err}\n`);
  },
);

bot.start(
  (ctx: ContextMessageUpdate): void => {
    ctx.reply('Welcome! Get inspired in just a second!', {
      reply_markup: Markup.keyboard(['Inspire me']),
    });
  },
);

bot.hears('Inspire me',
  async (ctx: ContextMessageUpdate): Promise<void> => {
    try {
      const response = await axios('https://inspirobot.me/api?generate=true');

      await ctx.replyWithPhoto({ url: response.data, filename: 'Inspiration' }, {
        reply_markup: Markup.keyboard(['Inspire me']),
      });
    } catch (err) {
      logger.error(`ERROR: ${err}\n`);
      ctx.reply('Something went wrong, please try again.');
    }
  });

const launch = async (): Promise<void> => {
  if (app.isWebhookDisabled) {
    await bot.telegram.deleteWebhook();
    bot.startPolling();
  } else {
    let host: string;
    if (app.env === 'development') {
      host = await ngrok.connect(app.webhookPort);
    } else {
      host = app.webhookHost;
    }

    // @ts-ignore
    bot.launch({
      webhook: {
        domain: host,
        hookPath: app.webhookPath,
        port: app.webhookPort,
      },
    });
  }

  logger.info('bot - online');
};

launch()
  .then((): void => logger.info('all systems nominal'))
  .catch((err: Error): void => {
    logger.error('bot - offline');
    logger.error(err);
  });
