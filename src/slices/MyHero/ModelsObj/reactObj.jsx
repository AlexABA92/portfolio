import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import { Camera } from 'three'
export default function ReactObj({
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
	const { nodes, materials } = useGLTF('/object3d/react.glb')
	return (
		<group
			{...props}
			ref={myGroup}
			dispose={null}
			onPointerOver={PinterOver}
			onPointerOut={PointerOut}
			onClick={handleClick}
		>
			<Float speed={5 * r} rotationIntensity={5 * r} floatIntensity={7 * r}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.LOGO.geometry}
						material={materials['logo.001']}
						position={[0, 0.12, 0]}
						rotation={[0, 0.063, 0]}
						scale={[0.07, 0.5, 0.07]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Sphere.geometry}
						material={materials['Material.001']}
						rotation={[-Math.PI, 0, 0]}
						scale={[0.5, 0.1, 0.5]}
					/>
				</group>
			</Float>
		</group>
	)
}

useGLTF.preload('/object3d/react.glb')
