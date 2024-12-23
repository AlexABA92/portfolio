import Bounded from '@/app/components/Bounded'
import ContentList from '@/app/components/ContentList'
import Heading from '@/app/components/Heading'
import { createClient } from '@/prismicio'
import { Content, isFilled } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>

/**
 * Component for "Projects" Slices.
 */

const Projects = async ({ slice }: ProjectsProps): Promise<JSX.Element> => {
	const client = createClient()
	const projectPost = await client.getAllByType('project_post')

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<Heading size='xl' className='mb-8'>
				{slice.primary.heading}
			</Heading>
			{isFilled.richText(slice.primary.description) && (
				<div className='prose prose-x1 prose-invert mb-10'>
					<PrismicRichText field={slice.primary.description} />
				</div>
			)}
			<ContentList
				items={projectPost}
				viewMoreText={slice.primary.view_mode_text}
				fallbackItemImage={slice.primary.hover_image}
			/>
		</Bounded>
	)
}

export default Projects
