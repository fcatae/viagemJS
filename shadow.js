/// <reference path="babylon.2.1.d.ts" />
var Shadow = (function () {
    function Shadow(scene) {
        var shadow = BABYLON.Mesh.CreateSphere('sphere', 32, 1.5, scene);
        var shadow_mat = new BABYLON.StandardMaterial('sph-mat', scene);
        shadow_mat.diffuseColor = new BABYLON.Color3(.5, 1, .5);
        shadow_mat.alpha = .8;
        shadow.material = shadow_mat;
        this.mesh = shadow;
    }
    return Shadow;
})();
