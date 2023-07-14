import * as THREE from 'three';

// ex06와 차이점: 안개
export default function examle() {
    const canvas = document.querySelector('#three-canvas');
    // const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // 속성과 값이 같기 때문에 아래와 같이 쓸 수 있다.
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        // alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // renderer.setClearAlpha(0.2);
    // renderer.setClearColor(0x00ff00);
    // renderer.setClearColor('#00ff00');
    // renderer.setClearAlpha(0.2);

    // renderer.setPixelRatio(window.devicePixelRatio);
    // 화면의 픽셀을 보여주는 성능이 발전함에 따라,
    // 이렇게 하는게 성능 면에서 유리하다.

    //Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('black', 3, 7); // near, far 설정
    // scene.background = new THREE.Color('blue');
    // Camera
    // Perspective Camera 원근 적용된 카메라
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.y = 1;
    camera.position.z = 5;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);

    // Orthographic Camera 원근 적용이 안된 카메라 ex) Diablo, LoL
    // const camera = new THREE.OrthographicCamera(
    //     -(window.innerWidth / window.innerHeight),
    //     window.innerWidth / window.innerHeight,
    //     1,
    //     -1,
    //     0.1,
    //     1000
    // );
    // camera.position.x = 1;
    // camera.position.y = 2;
    // camera.position.z = 5;
    // camera.lookAt(0, 0, 0);
    // camera.zoom = 0.5;
    // camera.updateProjectionMatrix();
    // scene.add(camera);

    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 'red',
    });
    const meshes = [];
    let mesh;
    for (let i = 0; i < 10; i++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 5 - 2.5;
        mesh.position.z = Math.random() * 5 - 2.5;
        scene.add(mesh);
        meshes.push(mesh);
    }

    // 그리기
    let oldTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        meshes.forEach((item) => {
            item.rotation.y += deltaTime * 0.001;
            item.position.y += deltaTime * 0.001;
            if (item.position.y > 3) {
                item.position.y = 0;
            }
        });
        renderer.render(scene, camera);

        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }

    // 화면의 크기가 변할때마다 보이는 화면 자동 변환 렌더링 시키기
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
