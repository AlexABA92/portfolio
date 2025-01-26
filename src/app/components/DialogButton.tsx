'use client'
import {
	Content,
	isFilled,
	KeyTextField,
	LinkField,
	SliceZone,
} from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx'
import { useState } from 'react'
import { MdArrowOutward } from 'react-icons/md'
import { CustomFlowbiteTheme, Modal, theme } from 'flowbite-react'
import Heading from './Heading'

import { FaLinkedin, FaTelegram } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

type buttonProps = {
	linkField: LinkField
	label: KeyTextField
	showIcon?: boolean
	className?: string
	tTitle: KeyTextField
	mail: KeyTextField
	linkedInT: KeyTextField
	linkedInl: LinkField
}
export default function DialogButton({
	linkField,
	label,
	showIcon = true,
	className,
	tTitle,
	mail,
	linkedInT,
	linkedInl,
}: buttonProps) {
	const [openModal, setOpenModal] = useState(false)
	const customTheme: CustomFlowbiteTheme['modal'] = {
		content: {
			base: 'relative h-full w-full p-4 md:h-auto',
			inner:
				'relative flex max-h-[90dvh] flex-col rounded-xl bg-indigo-950 shadow dark:bg-gray-700 border-4 border-indigo-500',
		},
	}
	return (
		<>
			<PrismicNextLink
				onClick={() => setOpenModal(true)}
				field={linkField}
				className={clsx(
					' group relative flex w-fit items-center text-slate-800 justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105',
					className
				)}
			>
				<span className='absolute inset-0 z-0  h-full translate-y-9 bg-indigo-400 transition-transform duration-300 ease-in-out group-hover:translate-y-0'></span>
				<span className='relative flex items-center justify-center gap-2'>
					{' '}
					{label}{' '}
					{showIcon && <MdArrowOutward className='inline-block size-6' />}
				</span>
			</PrismicNextLink>
			<Modal
				theme={customTheme}
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}
			>
				<Modal.Header>
					<Heading as='h2' size='md' className='text-slate-400'>
						My Contacts
					</Heading>
				</Modal.Header>
				<Modal.Body className='flex flex-col'>
					{isFilled.keyText(tTitle) && (
						<div className='flex flex-row items-center ms-5'>
							<FaTelegram color='#30b1d1' className='me-5' size={32} />
							<Link
								href={'https:t.me/' + tTitle}
								className='font-bold text-xl text-sky-300'
								target='_blanc'
							>
								@{tTitle}
							</Link>
						</div>
					)}
					{isFilled.keyText(mail) && (
						<div className='flex flex-row items-center ms-5 mt-3'>
							<FcGoogle className='me-5' size={32} />
							<Link href={'mailto:' + mail} target='_blanc'>
								<span className='font-bold text-xl text-sky-300'>{mail}</span>
							</Link>
						</div>
					)}
					{isFilled.link(linkedInl) && (
						<PrismicNextLink
							field={linkedInl}
							className='flex flex-row items-center ms-5 mt-3'
							target='_blanc'
						>
							<FaLinkedin size={32} className='me-5' />
							<span className='font-bold text-xl text-sky-300'>
								{linkedInT}
							</span>
						</PrismicNextLink>
					)}
				</Modal.Body>
			</Modal>
		</>
	)
}
