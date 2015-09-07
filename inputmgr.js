/// <reference path="babylon.2.1.d.ts" />
var InputManager = (function () {
    function InputManager() {
    }
    InputManager.init = function (camera, scene) {
        // input manager
        window.addEventListener('keyup', function (evt) {
            switch (evt.keyCode) {
                case 67:
                    camera.attachControl(canvas);
                    break;
                case 86:
                    camera.detachControl(canvas);
                    break;
                default:
            }
        });
        window.addEventListener('click', function (evt) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult && pickResult.pickedMesh && pickResult.pickedMesh.onclick) {
                var point = pickResult.pickedPoint;
                pickResult.pickedMesh.onclick(point);
            }
        });
    };
    return InputManager;
})();
