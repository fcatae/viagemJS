var Player = (function () {
    function Player(scene) {
        this.mesh = null;
        this.trail_position = null;
        var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
        var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
        sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
        sphere.material = sph_mat;
        this.mesh = sphere;
    }
    Player.prototype.update = function () {
        var target_position = this.trail_position;
        if (target_position) {
            var dx = target_position.x - this.mesh.position.x;
            var dz = target_position.z - this.mesh.position.z;
            var direction = new BABYLON.Vector3(dx, 0, dz);
            if (direction.lengthSquared() > 1) {
                direction = direction.normalize();
            }
            else {
            }
            var velocity = .1;
            this.mesh.translate(direction, velocity);
        }
    };
    return Player;
})();
