'use client'

import { asLink, Content, isFilled, KeyTextField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { DiCodepen } from 'react-icons/di'
import { MdClose, MdMenu } from 'react-icons/md'
import Button from './Button'

import DialogButton from './DialogButton'
import { title } from 'process'
import { FaLinkedin, FaTelegram } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const NavBar = ({ setting }: { setting: Content.SetingsDocument }) => {
	const [open, setOpen] = useState(false)
	const pathName = usePathname()
	const NameLogo = ({ name }: { name: KeyTextField }) => {
		return (
			<Link
				href='/'
				aria-label='Home-Page'
				className='text-xl font-extrabold tracking-tighter text-slate-900'
			>
				{name}
			</Link>
		)
	}
	const DesktopMenu = ({
		setting,
		pathname,
	}: {
		setting: Content.SetingsDocument
		pathname: string
	}) => {
		return (
			<div className='relative z-50 hidden flex-row items-center ga-1 bg-transparent py-0 md:flex'>
				{setting.data.nav_item.map(({ linck, lable }, index) => (
					<React.Fragment key={index}>
						<li className='flex'>
							<PrismicNextLink
								className={clsx(
									'group  relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900'
								)}
								field={linck}
								aria-current={
									pathname.includes(asLink(linck) as string)
										? 'page'
										: undefined
								}
							>
								<span
									className={clsx(
										'absolute inset-0 z-0 h-full rounded bg-indigo-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0',
										pathname.includes(asLink(linck) as string)
											? 'translate-y-6'
											: 'translate-y-10'
									)}
								></span>
								<span className='relative'>{lable}</span>
							</PrismicNextLink>
							{index < setting.data.nav_item.length - 1 && (
								<span
									className='hidden text-4xl font-thin leading-[0] text-slate-400 md:inline'
									aria-hidden='true'
								>
									<DiCodepen />
								</span>
							)}
						</li>
					</React.Fragment>
				))}
				<li
					data-modal-target='myModal'
					data-modal-show='myModal'
					className='z-50'
				>
					<DialogButton
						linkField={setting.data.cti_linck}
						label={setting.data.cti_label}
						className='ml-3'
						tTitle={setting.data.telegramtitle}
						mail={setting.data.googletitle}
						linkedInT={setting.data.linkedintitle}
						linkedInl={setting.data.linkedin_link}
					/>
				</li>
			</div>
		)
	}
	return (
		<nav aria-label='Main navigation'>
			<ul className='flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl'>
				<div className='flex items-center justify-between'>
					<NameLogo name={setting.data.name} />
					<button
						aria-expanded={open}
						aria-label='Open Menu'
						className='block p-2 text-2xl text-slate-800 md:hidden'
						onClick={() => {
							setOpen(true)
						}}
					>
						<MdMenu />
					</button>
				</div>
				<div
					className={clsx(
						'fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50  pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden',
						open ? 'translate-x-0' : 'translate-x-[100%]'
					)}
				>
					<button
						aria-label='Close menu'
						aria-expanded={open}
						className='fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden'
						onClick={() => {
							setOpen(false)
						}}
					>
						<MdClose />
					</button>
					{setting.data.nav_item.map(({ linck, lable }, index) => (
						<React.Fragment key={index}>
							<li className='first:mt-8'>
								<PrismicNextLink
									className={clsx(
										'group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900'
									)}
									field={linck}
									onClick={() => {
										setOpen(false)
									}}
									aria-current={
										pathName.includes(asLink(linck) as string)
											? 'page'
											: undefined
									}
								>
									{' '}
									<span
										className={clsx(
											'absolute inset-0 z-0 h-full rounded bg-indigo-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0',
											pathName.includes(asLink(linck) as string)
												? 'translate-y-4'
												: 'translate-y-8'
										)}
									></span>
									<span className='relative'>{lable}</span>
								</PrismicNextLink>
							</li>
							{index > setting.data.nav_item.length - 1 && (
								<span
									className='hidden text-4xl font-thin leading-[0] text-slate-400 md:inline'
									aria-hidden='true'
								>
									<DiCodepen />
								</span>
							)}
						</React.Fragment>
					))}
					<li className='flex flex-col justify-start w-[100%] mt-20'>
						{isFilled.keyText(setting.data.telegramtitle) && (
							<div className='flex flex-row items-center ms-5'>
								<FaTelegram color='#187d97' className='me-5' size={32} />
								<Link
									href={'https:t.me/' + setting.data.telegramtitle}
									className='font-bold text-xl text-slate-700'
								>
									@{setting.data.telegramtitle}
								</Link>
							</div>
						)}
						{isFilled.keyText(setting.data.googletitle) && (
							<div className='flex flex-row items-center ms-5 mt-3'>
								<FcGoogle className='me-5' size={32} />
								<Link href={'mailto:' + setting.data.googletitle}>
									<span className='font-bold text-xl text-slate-700'>
										{setting.data.googletitle}
									</span>
								</Link>
							</div>
						)}
						{isFilled.link(setting.data.linkedin_link) && (
							<PrismicNextLink
								field={setting.data.linkedin_link}
								className='flex flex-row items-center ms-5 mt-3'
							>
								<FaLinkedin color='#144ec2' size={32} className='me-5' />
								<span className='font-bold text-xl text-slate-700'>
									{setting.data.linkedintitle}
								</span>
							</PrismicNextLink>
						)}
					</li>
				</div>
				<DesktopMenu setting={setting} pathname={pathName} />
			</ul>
		</nav>
	)
}

export default NavBar
