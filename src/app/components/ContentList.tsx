'use client'

import { asImageSrc, Content, isFilled } from '@prismicio/client'
import { gsap } from 'gsap'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
type ContentListProps = {
	items: Content.ProjectPostDocument[]

	fallbackItemImage: Content.ProjectsSlice['primary']['hover_image']
	viewMoreText: Content.ProjectsSlice['primary']['view_mode_text']
}

const ContentList = ({
	items,
	fallbackItemImage,
	viewMoreText = 'Read More',
}: ContentListProps) => {
	const [currentItem, setCurrentItem] = useState<null | number>(null)
	const component = useRef(null)
	const revelRef = useRef(null)
	const urlPrefix = '/projects'
	const itemsRef = useRef<Array<HTMLLIElement | null>>([])
	const lastMousePos = useRef({ x: 0, y: 0 })

	useEffect(() => {
		let ctx = gsap.context(() => {
			itemsRef.current.forEach(item => {
				gsap.fromTo(
					item,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 1.3,
						ease: 'elastic.out(1,0.3)',
						scrollTrigger: {
							trigger: item,
							start: 'top bottom-=100px',
							end: 'bottom center',
							toggleActions: 'play none none none',
						},
					}
				)
			})
			return () => ctx.revert()
		}, component)
	}, [])

	useEffect(() => {
		const handleMousePos = (e: MouseEvent) => {
			const mousePos = { x: e.clientX, y: e.clientY + window.scrollY }
			// calculate speed and direction
			const speed =
				//Since we squared, then square root extraction will simply return the absolute value of the x-coordinate difference. Thus, we get a positive value of the mouse offset along the x-axis.
				Math.sqrt(
					//Squaring is used to remove the possible negative value of the difference and to work with the absolute value of the offset.
					Math.pow(mousePos.x - lastMousePos.current.x, 2)
				)
			let ctx = gsap.context(() => {
				if (currentItem !== null) {
					const maxY = window.scrollY + window.innerHeight - 350
					const maxX = window.innerWidth - 250

					gsap.to(revelRef.current, {
						x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
						y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
						rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
						ease: 'back.out(2)',
						duration: 1.3,
						opacity: 1,
					})
				}
				lastMousePos.current = mousePos
				return () => ctx.revert()
			}, component)
		}
		window.addEventListener('mousemove', handleMousePos)
		return () => {
			window.removeEventListener('mousemove', handleMousePos)
		}
	}, [currentItem])

	const contentImages = items.map(item => {
		const image = isFilled.image(item.data.hover_image)
			? item.data.hover_image
			: fallbackItemImage
		return asImageSrc(image, {
			fit: 'crop',
			w: 220,
			h: 320,
			exp: -10,
		})
	})

	useEffect(() => {
		contentImages.forEach(url => {
			if (!url) return
			const img = new Image()
			img.src = url
		})
	}, [contentImages])
	const onMouseEnter = (index: number) => {
		setCurrentItem(index)
	}
	const onMouseLeave = () => {
		setCurrentItem(null)
	}

	return (
		<div ref={component}>
			<ul
				className='border-b border-b-slate-400'
				onMouseLeave={() => {
					onMouseLeave()
				}}
			>
				{items.map((item, index) => (
					<>
						{isFilled.keyText(item.data.title) && (
							<li
								key={index}
								className='list-item opacity-0f'
								onMouseEnter={() => onMouseEnter(index)}
								ref={el => {
									itemsRef.current[index] = el
								}}
							>
								<Link
									href={urlPrefix + '/' + item.uid}
									className='flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row'
									aria-label={item.data.title}
								>
									<div className='flex flex-col'>
										<span className='text-3xl font-bold'>
											{item.data.title}
										</span>
										<div className='flex gap-3 text-yellow-400 text-lg font-bold'>
											{item.tags.map((tag: any, index: any) => (
												<span key={index}>#{tag}</span>
											))}
										</div>
									</div>
									<span className='ml-auto flex items-center gap-2 text-xl font-medium md:ml-0'>
										{viewMoreText} <MdArrowOutward className='text-xl ' />
									</span>
								</Link>
							</li>
						)}
					</>
				))}
			</ul>
			{/* Hover Element */}
			<div
				className='hover-reveal pointer-events-none absolute lef-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0f transition-[background] duration-300'
				style={{
					background:
						currentItem !== null ? `url(${contentImages[currentItem]})` : '',
				}}
				ref={revelRef}
			>
				{}
			</div>
		</div>
	)
}

export default ContentList
