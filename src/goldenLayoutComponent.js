import React, { useState, useEffect, useRef } from "react";

import goldenLayout from "golden-layout";

import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
import "litegraph.js/css/litegraph.css";

import { LGraph, LGraphCanvas } from "litegraph.js";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

const GoldenLayout = () => {
  const config = {
    content: [
      {
        type: "row",
        content: [
          {
            type: "component",
            componentName: "liteItem",
            componentState: { label: "A" }
          },
          {
            type: "column",
            content: [
              {
                type: "component",
                componentName: "datguiItem",
                componentState: { label: "B" }
              },
              {
                type: "component",
                componentName: "threeItem",
                componentState: { label: "C" }
              }
            ]
          }
        ]
      }
    ]
  };

  const divRef = useRef(null);

  useEffect(() => {
    var litegraphCanvas;
    const gl = new goldenLayout(config, divRef.current);
    gl.registerComponent("liteItem", function(container, state) {
      container
        .getElement()
        .html(
          "<canvas id='mycanvas' width='1024' height='720' style='border: 1px solid'></canvas>"
        );

      const canvasRef = container.getElement().children()[0];
      const graphRef = new LGraph();
      const graphcanvas = new LGraphCanvas(canvasRef, graphRef);
      litegraphCanvas = graphcanvas;

      graphRef.onAfterExecute = function() {
        graphcanvas.draw(true);
      };

      gl.on("componentCreated", function(component) {
        component.container.on("resize", function() {
          //console.log("component.resize", component.componentName);
          litegraphCanvas.resize();
        });
      });
    });

    gl.registerComponent("datguiItem", function(container, state) {
      container.getElement().html("<div>dat.gui</div>");
    });

    var scene,renderer, camera;
//style='width:100% ; height:100%'
    gl.registerComponent("threeItem", function(container, state) {
      container.getElement().html("<div style='width:100% ; height:100%'></div>");

      const threeRef = container.getElement().children()[0];

      renderer = new THREE.WebGLRenderer();
      //renderer.setSize(container.width, container.height);
      threeRef.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      console.log( threeRef.clientWidth)
      camera.position.z = 0;
      // y z axis exchange
      camera.up = new THREE.Vector3(0, 0, 1);

     scene = new THREE.Scene();


      
renderer.setSize( window.innerWidth, window.innerHeight );

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

      var GridHelper = new THREE.GridHelper(1000, 100);
      //  y z axis exchange
      GridHelper.rotation.set(Math.PI / 2, 0, 0);
      scene.add(GridHelper);

      var AxesHelper = new THREE.AxesHelper(50);
      AxesHelper.position.set(0, 0, 0.1);
      scene.add(AxesHelper);
      var geometry = new THREE.BoxGeometry(200, 200, 200);
    var material = new THREE.MeshLambertMaterial({
      
      transparent: true,
      opacity: 0.5
    });

    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh)



      var light = new THREE.AmbientLight(0x000000);
    scene.add(light);

    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[3] = new THREE.PointLight(0xffffff, 1, 0);
    lights[4] = new THREE.PointLight(0xffffff, 1, 0);
    lights[5] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    lights[3].position.set(0, -200, 0);
    lights[4].position.set(0, 0, 200);
    lights[5].position.set(200, 0, 0);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    scene.add(lights[3]);
    scene.add(lights[4]);
    scene.add(lights[5]);

        console.log(renderer.domElement)

        gl.on("componentCreated", function(component) {
          component.container.on("resize", function() {
            //console.log("component.resize", component.componentName);
            //litegraphCanvas.resize();
            renderer.setSize(renderer.domElement.parentElement.offsetWidth, renderer.domElement.parentElement.offsetHeight);
            //renderer.setSize(renderer.domElement.parentElement.offsetWidth, renderer.domElement.parentElement.offsetHeight);
            console.log('hihihihi')
          });
        });
     
    });

    gl.init();

    // init 후에 resize 해야 컨테이너에 width height 값이 생김
    litegraphCanvas.resize();
    //renderer.setSize(100, 100);
    renderer.setSize(renderer.domElement.parentElement.offsetWidth, renderer.domElement.parentElement.offsetHeight);


    // gl.on("componentCreated", function(component) {
    //   component.container.on("resize", function() {
    //     //console.log("component.resize", component.componentName);
    //     litegraphCanvas.resize();
    //     renderer.setSize(renderer.domElement.parentElement.offsetWidth, renderer.domElement.parentElement.offsetHeight);
    //     //renderer.setSize(container.width, container.height);
    //   });
    
    // });
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        width: "100%",
        height: "100vh"
      }}
    ></div>
  );
};

export default GoldenLayout;
