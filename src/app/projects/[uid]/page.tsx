import next, { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Bounded from '@/app/components/Bounded'
import Heading from '@/app/components/Heading'
import { DateField, isFilled } from '@prismicio/client'
import { IoLogoGithub } from 'react-icons/io'

import { FaInternetExplorer } from 'react-icons/fa'
import Link from 'next/link'
import { PrismicNextLink } from '@prismicio/next'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
	const client = createClient()
	const page = await client
		.getByUID('project_post', params.uid)
		.catch(() => notFound())

	function formatDate(date: DateField) {
		if (isFilled.date(date)) {
			const dataOptions: Intl.DateTimeFormatOptions = {
				// weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}
			return new Intl.DateTimeFormat('en-US', dataOptions).format(
				new Date(date)
			)
		}
	}
	return (
		<Bounded as='article' className='flex justify-center'>
			<div className='container rounded-2xl border-2  border-slate-800 bg-slate-900 px-8 md:px-8 md:py-20  xl:min-w-[1200px]'>
				<Heading as='h1' size='lg'>
					{page.data.title}
				</Heading>
				<div className='flex gap-4 text-yellow-400 text-xl font-bold'>
					{page.tags.map(tag => {
						return <span key={tag}>#{tag}</span>
					})}
				</div>
				<div>
					{isFilled.link(page.data.githubprojectlink) && (
						<div className='m-5 px-5 flex align-middle'>
							<PrismicNextLink
								field={page.data.githubprojectlink}
								className='md:text-xl font-bold gap-2 ms-5 p-3 rounded-xl flex items-center bg-violet-700 hover:bg-indigo-800'
								target='_blanck'
							>
								<IoLogoGithub
									color='rgb(0, 255, 255)'
									fontSize='2.25rem'
									className='me-5'
								/>
								GitHyb Project linck
							</PrismicNextLink>
						</div>
					)}
					{isFilled.link(page.data.deploy_project_linck) && (
						<div className='m-5 px-5 flex align-middle'>
							<PrismicNextLink
								field={page.data.deploy_project_linck}
								className='md:text-xl font-bold gap-2 ms-5 p-3 rounded-xl flex items-center bg-violet-700 hover:bg-indigo-800'
								target='_blanck'
							>
								<FaInternetExplorer
									color='rgb(0, 255, 255)'
									fontSize='2.25rem'
									className='me-5'
								/>
								Link to Deploy
							</PrismicNextLink>
						</div>
					)}
				</div>
				<p className='mt-8  border-b-2 border-slate-700 text-xl font-medium text-slate-300'>
					{formatDate(page.data.date)}
				</p>

				<div className='prose prose-invert prose-lg mt-12 w-full max-w-none md:mt-20'>
					<SliceZone slices={page.data.slices} components={components} />
				</div>
			</div>
		</Bounded>
	)
}

export async function generateMetadata({
	params,
}: {
	params: Params
}): Promise<Metadata> {
	const client = createClient()
	const page = await client
		.getByUID('project_post', params.uid)
		.catch(() => notFound())

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	}
}

export async function generateStaticParams() {
	const client = createClient()
	const pages = await client.getAllByType('project_post')

	return pages.map(page => {
		return { uid: page.uid }
	})
}
