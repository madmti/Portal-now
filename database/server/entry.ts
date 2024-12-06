
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error('Usage: bun seed <file>');
    process.exit(1);
}

const func = await import(`./${args[0]}/${args[1]}`);

func.default(args.slice(2));

export { };
