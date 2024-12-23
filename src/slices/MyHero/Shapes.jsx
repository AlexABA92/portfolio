'use client'

import * as TREEE from 'three'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, Environment } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Shapes() {
	return (
		<div className='row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0'>
			<Canvas
				className='z-0'
				shadows
				gl={{ antialias: false }}
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
			>
				<Suspense fallback={null}>
					<Geometries />
					<ContactShadows
						position={[0, -3.5, 0]}
						opacity={0.65}
						scale={40}
						blur={1}
						far={9}
					/>
					<Environment preset='studio' />
				</Suspense>
			</Canvas>
		</div>
	)
}
function Geometries() {
	const geometries = [
		{
			position: [0, 0, 0],
			r: 0.3,
			geometry: new TREEE.IcosahedronGeometry(2),
		},
		{
			position: [1, -0.75, 4],
			r: 0.4,
			geometry: new TREEE.CapsuleGeometry(0.5, 1.6, 2, 16),
		},
		{
			position: [-1.2, 2, -4],
			r: 0.2,
			geometry: new TREEE.DodecahedronGeometry(1.7, 1),
		},
		{
			position: [-0.6, -1, 5],
			r: 0.5,
			geometry: new TREEE.TorusGeometry(0.5, 0.2, 15, 30),
		},
		{
			position: [1.2, 2, -4],
			r: 0.7,
			geometry: new TREEE.OctahedronGeometry(1.5),
		},
	]
	const materials = [
		new TREEE.MeshStandardMaterial({
			color: 0xe27500,
			roughness: 2,
			metalness: 0.5,
		}),
		new TREEE.MeshStandardMaterial({
			color: 0x00e20b,
			roughness: 3,
			metalness: 0.3,
		}),
		new TREEE.MeshStandardMaterial({
			color: 0x1512b0,
			roughness: 2,
			metalness: 0.7,
		}),
		new TREEE.MeshStandardMaterial({
			color: 0xe200b1,
			metalness: 0.6,
			roughness: 3,
		}),
		new TREEE.MeshStandardMaterial({
			color: 0xba1616,
			metalness: 0.9,
			roughness: 3,
		}),
		new TREEE.MeshStandardMaterial({
			color: 0x5914c7,
			metalness: 0.7,
			roughness: 2,
		}),
	]
	const soundsEffect = [
		new Audio('/sounds/knock1.ogg'),
		new Audio('/sounds/knock2.ogg'),
		new Audio('/sounds/knock3.ogg'),
	]

	return geometries.map(({ position, r, geometry }) => (
		<Geometry
			key={JSON.stringify(position)}
			position={position.map(p => p * 2)}
			soundsEffect={soundsEffect}
			geometry={geometry}
			material={materials}
			r={r}
		/>
	))
}
function Geometry({ r, position, geometry, material, soundsEffect }) {
	const mesRef = useRef()
	const [visible, setVisible] = useState(true)

	const startingMaterial = getRandomMaterial()

	function getRandomMaterial() {
		return gsap.utils.random(material)
	}
	function handleClick(e) {
		const mesh = e.object

		gsap.utils.random(soundsEffect).play()

		gsap.to(mesh.rotation, {
			x: `+=${gsap.utils.random(0, 2)}`,
			y: `+=${gsap.utils.random(0, 2)}`,
			z: `+=${gsap.utils.random(0, 2)}`,
			duration: 1.3,
			ease: 'elastic.out(1,0.3)',
			yoyo: true,
		})
		mesh.material = getRandomMaterial()
	}
	const handlePointerOver = () => {
		document.body.style.cursor = 'pointer'
	}
	const handlePointerOut = () => {
		document.body.style.cursor = 'default'
	}
	useEffect(() => {
		let ctx = gsap.context(() => {
			setVisible(true)
			gsap.from(mesRef.current.scale, {
				x: 0,
				y: 0,
				z: 0,
				duration: gsap.utils.random(0.8, 1.2),
				ease: 'elastic.out(1,1.3)',
				delay: gsap.utils.random(0, 0.5),
			})
		})
		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<group position={position} ref={mesRef}>
			<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
				<mesh
					geometry={geometry}
					onClick={handleClick}
					onPointerOver={handlePointerOver}
					onPointerOut={handlePointerOut}
					visible={visible}
					material={startingMaterial}
				/>
			</Float>
		</group>
	)
}
