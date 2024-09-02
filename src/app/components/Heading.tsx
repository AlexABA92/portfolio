import clsx from 'clsx'

type HeadingProps = {
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
	children: React.ReactNode
}

export default function Heading({
	as: Comp = 'h1',
	className,
	size,
	children,
}: HeadingProps) {
	return (
		<Comp
			className={clsx(
				'font-bold leading-tight tracking-tight text-slate-300',
				size === 'xl' && 'text-9xl md:text-9xl',
				size === 'lg' && 'text-6xl md:text-8xl',
				size === 'md' && 'text-5xl md:text-7xl',
				size === 'sm' && 'text-3xl md:text-6xl',
				size === 'xs' && 'text-2xl md:text-4xl',
				className
			)}
		>
			{children}
		</Comp>
	)
}
