import { useState } from 'preact/hooks';

export default function DocBurgerBtn() {
	const [open, setOpen] = useState(false);

	return (
		<button
			onClick={() => setOpen(!open)}
			id={open ? 'aside-go-open' : 'aside-go-close'}
			type="button"
			class="btn btn-outline md:btn-disabled md:opacity-0"
		>
			{open && <span class="icon-[ix--cancel] text-xl" />}
			{!open && <span class="icon-[pajamas--hamburger] text-xl" />}
		</button>
	);
}
