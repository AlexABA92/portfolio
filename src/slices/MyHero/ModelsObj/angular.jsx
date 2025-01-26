import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Float } from '@react-three/drei'

import { gsap } from 'gsap'
export default function Angular({
	PinterOver,
	PointerOut,
	setMyGroup,
	...props
}) {
	const myGroup = useRef()
	const [visible, setVisible] = useState(true)
	const r = 0.8
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

	const { nodes, materials } = useGLTF('/object3d/angulare.glb')
	return (
		<group
			{...props}
			ref={myGroup}
			dispose={null}
			onPointerOver={PinterOver}
			onPointerOut={PointerOut}
			onClick={handleClick}
		>
			<Float speed={5 * r} rotationIntensity={3 * r} floatIntensity={8 * r}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Curve041.geometry}
					material={materials['SVGMat.072']}
					position={[0, 0, 0.5]}
					scale={1.884}
					rotation={[1.2, 0, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Curve042.geometry}
					material={materials['SVGMat.075']}
					position={[0, 0, 0.5]}
					rotation={[1.2, 0, 0]}
					scale={1.884}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Curve043.geometry}
					material={materials['SVGMat.074']}
					position={[0, 0, 0.5]}
					rotation={[1.2, 0, 0]}
					scale={1.9}
				/>
			</Float>
		</group>
	)
}

useGLTF.preload('/object3d/angulare.glb')
