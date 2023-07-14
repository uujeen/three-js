# Three.js

## Section 01

> WebGL을 손쉽게 사용할 수 있게하는 자바스크립트 라이브러리

# JS의 module 사용

> 모듈을 사용해서 개발하길 지향한다

```html
<body>
    <!-- module 사용 o -->
    <script type="module" src="main.js"></script>

    <!-- module 사용 x -->
    <script src="hello.js"></script>
</body>
```

```JS
//hello.js
export function hello1() {
    console.log('Hello 1!');
}
export function hello2() {
    console.log('Hello 2!');
}
export default funtion hello3() {
    console.log('Hello 3!');
}
```

```JS
// main.js
// module 사용 o
// import { hello1 } from './hello.js' 기본적인 import 중괄호 사용해서 함수를 호출해야 한다.
// import hello3 from './hello.js'; // default를 붙였을 경우 중괄호 생략 가능
// import { hello1, hello2 } from './hello'; 여러 함수 불러오기
import * as hello from './hello.js'; // 모든 함수 불러오기

hello.hello1();
hello.hello2();

// default 붙였을 경우 사용 가능
// hello3();
```

# Webpack

> bundling

js, css를 하나의 모듈로 보고 배포하고 포장하는 작업 - bundling
유명한 도구 : Webpack

## Section02

> Scene

기본이 되는 무대, 장면
설정을 하지 않았을 경우 (0, 0, 0)으로 설정

> Mesh

Mesh = Geometry(모양) + Material(재질)

> Camera

Field of view(시야각), 어느 정도 시야로 보여줄 것인가. 어떤 각도로, 얼마나

#### Perspectiva Camera

```JS
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
const camera = new THREE.PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : Number);
```

fov : 시야 각도
aspect : 화면 종횡비 가로/세로 비율설정
near : 가까운 쪽 한계
far : 먼 쪽 한계

#### Orthographic Camera

```JS
OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
camera.zoom = 0.5; // zoom in, out을 할 때 사용
camera.updateProjectionMatrix(); // 카메라 기능을 수정했을 때 적용하기 위해 사용
```

left — 카메라 절두체 좌평면.
right — 카메라 절두체 우평면.
top — 카메라 절두체 상평면.
bottom — 카메라 절두체 하평면.
near — 카메라 절두체 근평면.
far — 카메라 절두체 원평면.

> Light

필수 요소는 아님 Material에 따라 사용 여부 결정.

> Renderer

카메라가 보여주는 장면

```JS
const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // 속성과 값이 같기 때문에 아래와 같이 쓸 수 있다.
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
```

antialias: 부드럽게 해주는 대신 성능저하의 가능성이 있다.

> 3D 위치

x축 : 좌우 이동, y축 : 위아래 이동, z축 : 앞뒤 이동
