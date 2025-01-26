import React from 'react'
import clsx from 'clsx'

type BoundedProps = {
	as?: React.ElementType
	className?: string
	children?: React.ReactNode
}
const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
	({ as: Comp = 'section', className, children, ...restProps }, ref) => {
		return (
			<Comp
				ref={ref}
				className={clsx(
					'px-6 py-10 md:px-5 md:py-10 lg:py-16 lg:px-14 xl:px-24 xl:py-16',
					className
				)}
				{...restProps}
			>
				<div className='max-w-[100%]'>{children} </div>
			</Comp>
		)
	}
)
Bounded.displayName = 'Bounded'
export default Bounded
