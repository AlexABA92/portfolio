import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'

export default function World({
	PinterOver,
	PointerOut,
	setMyGroup,
	...props
}) {
	const { nodes, materials } = useGLTF('/object3d/world.glb')
	const myGroup = useRef()
	const [visible, setVisible] = useState(true)
	const r = 0.5
	const handleClick = () => {
		setMyGroup(myGroup)
	}
	useEffect(() => {
		let ctx = gsap.context(() => {
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
			scale={2.5}
			dispose={null}
			onPointerOver={PinterOver}
			onPointerOut={PointerOut}
			onClick={handleClick}
		>
			<Float speed={8 * r} rotationIntensity={8 * r} floatIntensity={8 * r}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder019.geometry}
					material={materials.Blue}
					position={[0, 0, 0]}
					rotation={[0, 0, 0]}
					scale={0.3}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Curve005.geometry}
					material={materials.White}
					position={[0, 0, 0]}
					rotation={[0, 0, 0]}
					scale={[0.35, 0.35, 1.5]}
				/>
			</Float>
		</group>
	)
}

useGLTF.preload('/object3d/world.glb')
