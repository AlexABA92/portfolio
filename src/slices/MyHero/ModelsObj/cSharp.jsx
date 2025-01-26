import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Float, useFBX } from '@react-three/drei'

import { gsap } from 'gsap'
export default function CSharp({
	PinterOver,
	PointerOut,
	setMyGroup,
	...props
}) {
	const { nodes, materials } = useGLTF('/object3d/newCSharp.glb')
	const myGroup = useRef()
	const [visible, setVisible] = useState(true)
	const r = 0.8
	const handleClick = () => {
		setMyGroup(myGroup)
	}
	useEffect(() => {
		let ctx = gsap.context(() => {
			console.log('	', nodes)
			setVisible(true)
			gsap.from(myGroup.current.scale, {
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
		<group
			{...props}
			ref={myGroup}
			dispose={null}
			scale={0.02}
			onPointerOver={PinterOver}
			onPointerOut={PointerOut}
			onClick={handleClick}
		>
			<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={8 * r}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={4}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.back.geometry}
						material={materials.back}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.LOGO.geometry}
						material={materials.logo}
						position={[0.98, 1.026, 0.026]}
						scale={[1, 7.44, 1]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.LOGO_1.geometry}
						material={materials.logo_1}
						position={[-0.23, -2.057, 0.009]}
						scale={[1, 9.867, 1]}
					/>
				</group>
			</Float>
		</group>
	)
}
useGLTF.preload('/object3d/newCSharp.glb')
