import Avatar from '@/app/components/Avatar'
import Bounded from '@/app/components/Bounded'
import Button from '@/app/components/Button'
import Heading from '@/app/components/Heading'
import { Content } from '@prismicio/client'

import {
	PrismicImage,
	PrismicRichText,
	SliceComponentProps,
} from '@prismicio/react'

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className='grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]'>
				<Heading as='h1' size='xl' className='col-start-1'>
					{slice.primary.heading}
				</Heading>
				<div className='prose prose-xl prose-slate prose-invert col-start-1'>
					<PrismicRichText field={slice.primary.descripton} />
					<div className='flex row m-1'>
						<Button
							linkField={slice.primary.button_link}
							label={slice.primary.button_text}
							className='mx-2'
						/>
						<Button
							linkField={slice.primary.button_link_docx}
							label={slice.primary.button_text_docx}
						/>
					</div>
				</div>

				<Avatar
					image={slice.primary.avatar}
					className='row-start-1 max-w-sm md:col-start-2 md-row-end-3'
				/>
			</div>
		</Bounded>
	)
}

export default Biography
