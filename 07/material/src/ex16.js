import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// ----- 주제: CanvasTexture

export default function example() {
    // Renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.y = 1.5;
    camera.position.z = 4;
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('white', 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 1);
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // CanvasTexture
    const texCanvas = document.createElement('canvas');
    const texContext = texCanvas.getContext('2d');
    texCanvas.width = 500;
    texCanvas.height = 500;
    const canvasTexture = new THREE.CanvasTexture(texCanvas);

    // Mesh MeshBasicMaterial를 사용할 때에는 light 불필요, material중에는 제일 성능이 좋다.
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        map: canvasTexture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
        const delta = clock.getElapsedTime();
        material.map.needsUpdate = true;
        texContext.fillStyle = 'green'; // 붓에 색을 입히는 단계
        texContext.fillRect(delta * 50, delta * 50, 500, 500);
        texContext.fillStyle = 'white'; // 붓에 색을 입히는 단계
        texContext.fillRect(delta * 50, delta * 50, 50, 50);
        texContext.font = 'bold 50px sans-serif';
        texContext.fillText('1분코딩', 200, 200);

        renderer.render(scene, camera);
        renderer.setAnimationLoop(draw);
    }

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener('resize', setSize);

    draw();
}
