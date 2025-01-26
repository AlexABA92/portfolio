'use client'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Angular from './ModelsObj/angular'
import CSharp from './ModelsObj/cSharp'
import World from './ModelsObj/world'
import ReactObj from './ModelsObj/reactObj'
import Js from './ModelsObj/js'
import { gsap } from 'gsap'

export default function Shapes() {
	const [myGroup, setMyGroup] = useState(null)
	const [soundsEffect, setSoundsEffect] = useState([])
	const handlePointerOver = () => {
		document.body.style.cursor = 'pointer'
	}
	const handlePointerOut = () => {
		document.body.style.cursor = 'default'
	}
	useEffect(() => {
		handleClick()
	}, [myGroup])
	useEffect(() => {
		if (typeof window !== undefined) {
			const soundsEffect = [
				new Audio('/sounds/knock1.ogg'),
				new Audio('/sounds/knock2.ogg'),
				new Audio('/sounds/knock3.ogg'),
			]
			setSoundsEffect(soundsEffect)
		}
	}, [])
	function handleClick() {
		if (myGroup) {
			gsap.utils.random(soundsEffect).play()

			gsap.to(myGroup.current.rotation, {
				x: `+=${gsap.utils.random(0, 1)}`,
				y: `+=${gsap.utils.random(0, 1)}`,
				z: `+=${gsap.utils.random(0, 1)}`,
				duration: 1.3,
				ease: 'elastic.out(1,0.3)',
				yoyo: true,
			})
		}
		setMyGroup(null)
	}

	return (
		<div className='row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0'>
			<Canvas
				className='z-0'
				shadows
				gl={{ antialias: true }}
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
			>
				<Suspense fallback={null}>
					<group>
						<Angular
							position={[-3, -2, 9]}
							setMyGroup={setMyGroup}
							PinterOver={handlePointerOver}
							PointerOut={handlePointerOut}
						/>
						<CSharp
							position={[3, 2, 7]}
							setMyGroup={setMyGroup}
							PinterOver={handlePointerOver}
							PointerOut={handlePointerOut}
						/>
						<World
							position={[0, 0, 8]}
							setMyGroup={setMyGroup}
							PinterOver={handlePointerOver}
							PointerOut={handlePointerOut}
						/>
						<ReactObj
							position={[-3, 2, 8]}
							setMyGroup={setMyGroup}
							PinterOver={handlePointerOver}
							PointerOut={handlePointerOut}
						/>
						<Js
							position={[3, -2, 9]}
							setMyGroup={setMyGroup}
							PinterOver={handlePointerOver}
							PointerOut={handlePointerOut}
						/>
					</group>
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

// function TehLogos() {
// 	const soundsEffect = [
// 		new Audio('/sounds/knock1.ogg'),
// 		new Audio('/sounds/knock2.ogg'),
// 		new Audio('/sounds/knock3.ogg'),
// 	]
// 	return techLogos.map(({ position, r, obj }) => {
// 		;<ObjectLogo key={position} r={r} obj={obj} soundsEffect={soundsEffect} />
// 	})
// }
// function ObjectLogo({ position, r, obj, soundsEffect }) {
// 	const mesRef = useRef()
// 	return (
// 		<group position={position} ref={mesRef}>
// 			<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
// 				<mesh
// 					geometry={obj}
// 					// onClick={handleClick}
// 					// onPointerOver={handlePointerOver}
// 					// onPointerOut={handlePointerOut}
// 					visible={visible}
// 					material={THREE.MeshBasicMaterial}
// 				/>
// 			</Float>
// 		</group>
// 	)
// }
// function Geometries() {
//

// 	return geometries.map(({ position, r, geometry }) => (
// 		<Geometry
// 			key={JSON.stringify(position)}
// 			position={position.map(p => p * 2)}
// 			soundsEffect={soundsEffect}
// 			geometry={geometry}
// 			material={materials}
// 			r={r}
// 		/>
// 	))
// }
// function Geometry({ r, position, geometry, material, soundsEffect }) {
// 	const mesRef = useRef()
// 	const [visible, setVisible] = useState(true)

// 	//const startingMaterial = getRandomMaterial()

// 	// function getRandomMaterial() {
// 	// 	return gsap.utils.random(material)
// 	// }
// 	function handleClick(e) {
// 		const mesh = e.object

// 		gsap.utils.random(soundsEffect).play()

// 		gsap.to(mesh.rotation, {
// 			x: `+=${gsap.utils.random(0, 2)}`,
// 			y: `+=${gsap.utils.random(0, 2)}`,
// 			z: `+=${gsap.utils.random(0, 2)}`,
// 			duration: 1.3,
// 			ease: 'elastic.out(1,0.3)',
// 			yoyo: true,
// 		})
// 		mesh.material = getRandomMaterial()
// 	}
//
//

// 	return (
// // 		<group position={position} ref={mesRef}>
// 		<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
// // 				<mesh
// // 					geometry={geometry}
// // 					onClick={handleClick}
// // 					onPointerOver={handlePointerOver}
// // 					onPointerOut={handlePointerOut}
// // 					visible={visible}
// // 					material={startingMaterial}
// // 				/>
// // 			</Float>
// // 		</group>
// // 	)
// // }
