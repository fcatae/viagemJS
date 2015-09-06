function createPlayer() {
    // player
    var sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene);
    var sph_mat = new BABYLON.StandardMaterial('sph-mat', scene);
    sph_mat.diffuseColor = new BABYLON.Color3(1, .5, .5);
    sphere.material = sph_mat;
    var player = {
        mesh: sphere,
        update: player_update,
        trail_position: null
    };
    function player_update() {
        var target_position = player.trail_position;
        if (target_position) {
            var dx = target_position.x - player.mesh.position.x;
            var dz = target_position.z - player.mesh.position.z;
            var direction = new BABYLON.Vector3(dx, 0, dz);
            if (direction.lengthSquared() > 1) {
                direction = direction.normalize();
            }
            else {
            }
            var velocity = .1;
            player.mesh.translate(direction, velocity);
        }
    }
    return player;
}
