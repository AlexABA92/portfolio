'use client'
import { ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
const ImageClick = ({ image }: { image: ImageField }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const overlayRaf = useRef(null)
	const imageRef = useRef(null)
	useEffect(() => {
		if (isExpanded) {
			gsap.fromTo(
				overlayRaf.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.5, ease: 'power2.inOut' }
			)
			gsap.fromTo(
				imageRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.5, ease: 'elastic.out(1,0.75)' }
			)
		} else {
			gsap.to(overlayRaf.current, { opacity: 0, duration: 0.3 })
			gsap.to(imageRef.current, {
				opacity: 0,
				duration: 0.5,
				ease: 'elastic.out(1,0.75)',
			})
		}
	}, [isExpanded])
	return (
		<div className='me-2 relative'>
			<PrismicNextImage
				field={image}
				imgixParams={{ q: 100 }}
				alt=''
				onClick={() => {
					setIsExpanded(true)
				}}
				className='cursor-pointer w-full h-auto block  min-h-24 min-w-24'
			/>{' '}
			{isExpanded && (
				<div
					ref={overlayRaf}
					className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center z-50 items-center'
					onClick={() => {
						setIsExpanded(false)
					}}
				>
					<div
						ref={imageRef}
						className='max-w-[90%] max-h-[90%] cursor-pointer flex justify-center z-50 items-center'
					>
						<PrismicNextImage field={image} alt='' className='object-fill' />
					</div>
				</div>
			)}
		</div>
	)
}

export default ImageClick
