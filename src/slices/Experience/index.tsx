import Bounded from '@/app/components/Bounded'
import Heading from '@/app/components/Heading'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import clsx from 'clsx'

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Heading as='h1' size='xl' className='col-start-1 md:flex-row'>
				{slice.primary.heading}
			</Heading>
			<div className='w-[50%] md:w-[100%]'>
				{slice.primary.title.map(({ title, time_period }, index) => (
					<div
						key={index}
						className={clsx('flex', index % 2 !== 0 && 'flex-row-reverse')}
					>
						<div className=''>{title}</div>
						<div>11111111111</div>
						<div>2222222222</div>
					</div>
				))}
			</div>
			<div className='md:w-[100%] w-[50%]'>Picc</div>
		</Bounded>
	)
}

export default Experience
