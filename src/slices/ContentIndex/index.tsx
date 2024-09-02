import Bounded from '@/app/components/Bounded'
import ContentList from '@/app/components/ContentList'
import Heading from '@/app/components/Heading'
import { createClient } from '@/prismicio'
import { Content, isFilled } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { div } from 'three/webgpu'

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
	slice,
}: ContentIndexProps): Promise<JSX.Element> => {
	const client = createClient()
	const blogPosts = await client.getAllByType('blog_post')
	const projects = await client.getAllByType('project')

	const contentType = slice.primary.content_type || 'Blog'

	const items = contentType === 'Blog' ? blogPosts : projects
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
				items={items}
				contentType={contentType}
				viewMoreText={slice.primary.view_mode_text}
				follbackItemImage={slice.primary.follback_item_image}
			></ContentList>
		</Bounded>
	)
}

export default ContentIndex
