import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 여러가지 텍스쳐가 적용된 큐브

export default function example() {
    // 텍스트 텍스쳐 로더
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
        console.log('로드 시작');
    };
    loadingManager.onProgress = (img) => {
        console.log(img + '로드');
    };
    loadingManager.onLoad = () => {
        console.log('로드 완료');
    };
    loadingManager.onError = () => {
        console.log('에러');
    };

    const textureLoader = new THREE.TextureLoader(loadingManager);
    const frontTex = textureLoader.load('/textures/mcstyle/front.png');
    const backTex = textureLoader.load('/textures/mcstyle/back.png');
    const leftTex = textureLoader.load('/textures/mcstyle/left.png');
    const rightTex = textureLoader.load('/textures/mcstyle/right.png');
    const topTex = textureLoader.load('/textures/mcstyle/top.png');
    const bottomTex = textureLoader.load('/textures/mcstyle/bottom.png');

    const materials = [
        new THREE.MeshBasicMaterial({ map: rightTex }),
        new THREE.MeshBasicMaterial({ map: leftTex }),
        new THREE.MeshBasicMaterial({ map: topTex }),
        new THREE.MeshBasicMaterial({ map: bottomTex }),
        new THREE.MeshBasicMaterial({ map: frontTex }),
        new THREE.MeshBasicMaterial({ map: backTex }),
    ];

    rightTex.magFilter = THREE.NearestFilter;
    leftTex.magFilter = THREE.NearestFilter;
    topTex.magFilter = THREE.NearestFilter;
    bottomTex.magFilter = THREE.NearestFilter;
    frontTex.magFilter = THREE.NearestFilter;
    backTex.magFilter = THREE.NearestFilter;
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
    scene.background = new THREE.Color('white');
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
    const directionalLight = new THREE.DirectionalLight('white', 1);
    directionalLight.position.set(1, 2, 2);
    scene.add(ambientLight, directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Mesh
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
        map: frontTex,
    });

    const mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
        const delta = clock.getDelta();

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
