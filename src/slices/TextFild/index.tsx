import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `TextFild`.
 */
export type TextFildProps = SliceComponentProps<Content.TextFildSlice>

/**
 * Component for "TextFild" Slices.
 */
const TextFild = ({ slice }: TextFildProps): JSX.Element => {
	return (
		<div className='max-w-prose'>
			<PrismicRichText field={slice.primary.text} />
		</div>
	)
}

export default TextFild
