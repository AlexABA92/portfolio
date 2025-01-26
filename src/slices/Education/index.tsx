import Bounded from '@/app/components/Bounded'
import Heading from '@/app/components/Heading'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import clsx from 'clsx'
import Image from 'next/image'
import ImageClick from './imageClick'

/**
 * Props for `Education`.
 */
export type EducationProps = SliceComponentProps<Content.EducationSlice>

/**
 * Component for "Education" Slices.
 */
const Education = ({ slice }: EducationProps): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Heading as='h1' size='xl'>
				{slice.primary.title}
			</Heading>
			<div className='mt-10'>
				{[...slice.primary.items].map(
					(
						{
							specialization,
							institytion,
							descripton,
							time_period,
							diplom,
							supplement,
						},
						index
					) => (
						<div
							key={index}
							className={clsx(
								'flex   flex-col lg:flex-row   w-[100%] pb-10 mt-5 border-b-2',
								index % 2 !== 0 && 'lg:flex-row-reverse'
							)}
						>
							<div className=' w-[100%] lg:w-1/2 prose prose-xl prose-slate prose-invert'>
								<Heading as='h2' size='md'>
									{institytion}
								</Heading>
								<Heading as='h3' size='xs' className='font-bold'>
									{specialization}
								</Heading>

								<div className='font-bold m-3'>{time_period}</div>
								<div>{descripton}</div>
							</div>
							{(isFilled.image(diplom) || isFilled.image(supplement)) && (
								<div className=' w-[100%] lg:w-1/2 flex pt-2 '>
									{isFilled.image(diplom) && <ImageClick image={diplom} />}
									{isFilled.image(supplement) && (
										<ImageClick image={supplement} />
									)}
								</div>
							)}
						</div>
					)
				)}
			</div>
		</Bounded>
	)
}

export default Education
