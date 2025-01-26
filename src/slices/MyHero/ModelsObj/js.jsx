import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { gsap } from 'gsap'
export default function Js({ PinterOver, PointerOut, setMyGroup, ...props }) {
	const myGroup = useRef()
	const [visible, setVisible] = useState(true)
	const r = 1
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
	const { nodes, materials } = useGLTF('/object3d/js.glb')
	return (
		<group
			{...props}
			ref={myGroup}
			dispose={null}
			scale={0.07}
			onPointerOver={PinterOver}
			onPointerOut={PointerOut}
			onClick={handleClick}
		>
			<Float speed={10 * r} rotationIntensity={2 * r} floatIntensity={50 * r}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.back.geometry}
					material={materials['back.002']}
					rotation={[1.2, 0, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.LOGO.geometry}
					material={materials['logo.002']}
					rotation={[1.2, 0, 0]}
					scale={[1, 7, 1]}
				/>
			</Float>
		</group>
	)
}
