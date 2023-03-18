import React, { useState } from "react";
import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture, Vector4 } from "@babylonjs/core";
import SceneComponent from "babylonjs-hook";

let box;

const onSceneReady = (scene, textureUrl) => {
    var camera = new ArcRotateCamera(
        "camera1", 0, 0, 0, new Vector3(0, 0, -10), scene
    );
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 1.5;

    let faceUV = new Array(6);
    faceUV.fill(new Vector4(0, 0, 1, 1));
    faceUV[0] = new Vector4(0, 0, -1, -1);

    box = MeshBuilder.CreateBox(
        "box",
        {
            width: 6, height: 3,
            faceUV: faceUV
        },
        scene
    );
    var mapMaterial = new StandardMaterial("mapMaterial", scene);
    mapMaterial.diffuseTexture = new Texture(`${textureUrl}`, scene);
    box.material = mapMaterial;
    box.position.y = 2;

    MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

const Cuboid = ({ textureUrl }) => {
    return (
        <>
            <SceneComponent
                antialias
                onSceneReady={(scene) => {
                    onSceneReady(scene, textureUrl);
                }}
                id="my-canvas"
                style={{ width: "100%", height: "100vh" }} />
        </>
    )
}

export default Cuboid