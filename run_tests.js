const { execSync } = require('child_process');
try {
  const out = execSync('npx vitest run 2>&1', { encoding: 'utf8', cwd: '/home/cecepazhar/Product/caui', timeout: 120000 });
  console.log(out.slice(-5000));
} catch (e) {
  console.log(e.stdout ? e.stdout.slice(-5000) : e.message);
}