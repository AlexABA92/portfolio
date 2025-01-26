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
			<div>
				<div className='my-3 '>
					<p className='prose prose-xl prose-slate prose-invert  mx-6'>
						For this moment I don`t have commercial experience. But you can look
						to my Pet-rejects.{' '}
					</p>
				</div>
				{slice.primary.title.map(({ title, time_period }, index) => (
					<div
						key={index}
						className={clsx('flex', index % 2 !== 0 && 'flex-row-reverse')}
					>
						<div>{title}</div>
					</div>
				))}
			</div>
		</Bounded>
	)
}

export default Experience
