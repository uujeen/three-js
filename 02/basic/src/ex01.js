import * as THREE from 'three';

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
export default function examle() {
    const canvas = document.querySelector('#three-canvas');
    // const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // 속성과 값이 같기 때문에 아래와 같이 쓸 수 있다.
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    // Camera
    // Perspective Camera 원근 적용된 카메라
    // const camera = new THREE.PerspectiveCamera(
    //     75,
    //     window.innerWidth / window.innerHeight,
    //     0.1,
    //     1000
    // );
    // // Camera
    // camera.position.x = 1;
    // camera.position.y = 2;
    // camera.position.z = 5;

    // Orthographic Camera 원근 적용이 안된 카메라 ex) Diablo, LoL
    const camera = new THREE.OrthographicCamera(
        -(window.innerWidth / window.innerHeight),
        window.innerWidth / window.innerHeight,
        1,
        -1,
        0.1,
        1000
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(0, 0, 0);
    camera.zoom = 0.5;
    camera.updateProjectionMatrix();
    scene.add(camera);
    // Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        // color: 0xff0000,
        // color: '#ff0000'
        color: 'red',
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // rendering을 해주어야 보인다.
    renderer.render(scene, camera);
}
