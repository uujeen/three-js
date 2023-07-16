export class KeyController {
    constructor() {
        // 생성자
        this.keys = [];

        window.addEventListener('keydown', (e) => {
            console.log(e.code + '누름');
            this.keys[e.code] = true; // ex) W를 누를 시 keyW 받아온다.
        });

        window.addEventListener('keyup', (e) => {
            console.log(e.code + '땜');
            delete this.keys[e.code];
        });
    }
}
