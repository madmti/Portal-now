export function printProgress(current: number, total: number) {
    const progress = Math.floor((current / total) * 10);
    const bar = '█'.repeat(progress) + ' '.repeat(10 - progress);
    process.stdout.write(`\rProgreso: [${bar}] ${current}/${total}`);
}
