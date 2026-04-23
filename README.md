# daily-pulse

A scheduled greeter that runs the local claude CLI and sends a random greeting every morning.

## Current behavior

- Cron triggers at 09:00 every day (Asia/Shanghai).
- After trigger, the app waits a random delay between 1 and 5 minutes.
- Then it sends one random greeting through the local claude CLI.

## Requirements

- Node.js 18+
- claude CLI installed and authenticated in your shell

## Install

```bash
npm install
```

## Run

### Option A: Run directly with Node

```bash
node index.js
```

### Option B: Run with PM2 (recommended)

```bash
npm run pm2
```

The current npm script list only includes:

- npm run pm2

## PM2 operations

View logs:

```bash
pm2 logs daily-pulse
```

Stop process:

```bash
pm2 stop daily-pulse
```

Remove process:

```bash
pm2 delete daily-pulse
```

## Notes

- This project is terminal-based automation (claude command), not browser automation.
- Keep your local environment compliant with platform rules and your own security policy.
