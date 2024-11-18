function SpinningCube() {
  const cubeRef = useRef();

  const handlePointerDown = () => {
    cubeRef.current.material.color.set(Math.random() * 0xffffff);
  };

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={cubeRef}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown} // Interaction
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}
export default SpinningCube;
