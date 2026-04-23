const cron = require('node-cron');
const { spawn } = require('node:child_process');

const CRON_EXPR = '0 9 * * *';
const TIMEZONE = 'Asia/Shanghai';
const MIN_DELAY_MS = 60 * 1000;
const MAX_DELAY_MS = 5 * 60 * 1000;

const messages = [
  'good morning',
  'hello',
  'hi there',
  'morning sunshine',
  'rise and shine',
  'hope you have a great day',
  'wishing you a productive morning',
  'have a nice day',
  'let us do something awesome today',
  'new day, new progress',
  'happy coding',
  'small steps, big wins',
  'you got this',
  'time to build',
  'keep up the good work',
  'good vibes only',
  'ready for today',
  'lets make today count',
  'sending positive energy',
  'hope your morning is smooth'
];

function pickRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function pickRandomDelayMs() {
  return Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function runClaudePrompt(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', ['-p', prompt], {
      stdio: ['ignore', 'inherit', 'inherit']
    });

    const timer = setTimeout(() => {
      child.kill('SIGTERM');
    }, 120000);

    child.on('error', error => {
      clearTimeout(timer);
      reject(new Error(error.message));
    });

    child.on('close', code => {
      clearTimeout(timer);
      resolve(code ?? 0);
    });
  });
}

async function sendGreeting() {
  const message = pickRandomMessage();
  await runClaudePrompt(message);
}

function schedule() {
  console.log(`Scheduler started. cron=\"${CRON_EXPR}\" timezone=\"${TIMEZONE}\"`);
  cron.schedule(
    CRON_EXPR,
    async () => {
      console.log(`[RUN] ${new Date().toISOString()}`);
      try {
        const delayMs = pickRandomDelayMs();
        const delaySeconds = Math.round(delayMs / 1000);
        console.log(`[DELAY] Waiting ${delaySeconds}s before sending greeting`);
        await wait(delayMs);
        await sendGreeting();
      } catch (error) {
        console.error('Failed to send greeting:', error.message);
      }
    },
    { timezone: TIMEZONE }
  );
}

async function main() {
  schedule();
}

main();
