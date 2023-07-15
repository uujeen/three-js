import * as THREE from 'three';
import Stats from 'stats.js';
// ----- 주제: AxesHelper, GridHelper / 축 헬퍼, 그리드 헬퍼

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
    camera.position.y = 1;
    camera.position.z = 5;

    scene.add(camera);

    // Light
    const ambientlight = new THREE.AmbientLight('white', 0.5);
    scene.add(ambientlight);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.z = 2;
    scene.add(light);

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 'seagreen',
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Stats 초당 프레임 계산, 실제 성능을 테스트 할 수 있다. 프레임이 떨어진다면 성능이 저하된다는 뜻.
    const stats = new Stats();
    document.body.append(stats.domElement);

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
        const time = clock.getElapsedTime();

        stats.update();
        mesh.rotation.y = time;

        renderer.render(scene, camera);
        renderer.setAnimationLoop(draw);
    }

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // 이벤트, 화면의 동적인 크기의 변화에 따라 자동으로 맞춰서 화면을 보여주게 한다.
    window.addEventListener('resize', setSize);

    draw();
}
