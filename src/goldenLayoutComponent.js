import React, { useState, useEffect, useRef } from "react";

import goldenLayout from "golden-layout";

import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";
import "litegraph.js/css/litegraph.css";

import { LGraph, LGraphCanvas } from "litegraph.js";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

import Stats from "stats.js";

import dat from "dat.gui";

var stats = new Stats();
stats.showPanel(0); // 0:fps, 1:ms, 2: mb, 3+: custom

var AdboObject = function() {
  this.ramenWidth = 43;
  this.ramenColumnXY= 5;
  this.ramenBeamZ= 4;
  this.height= 27;
  this.spanLength=0 ;
  this.pivotMode= 0;
  this.floor= 1;
  this.floorHeight= 30;
};

var GoldenLayout = () => {
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

  var renderer, scene, camera;
  var mesh;

  function animate() {
    stats.begin();
    stats.end();
    //console.log('animateddd')
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //console
  }

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
      container.getElement().html("<div></div>");

      var datRef = container.getElement().children()[0];

      var Adbo = new AdboObject();
      var gui = new dat.GUI({autoPlace:false});
      gui.add(Adbo , 'ramenWidth')
      gui.width = 765
      datRef.appendChild(gui.domElement)


      gl.on("componentCreated", function(component) {
        component.container.on("resize", function() {
          //console.log("component.resize", component.componentName);
          gui.width = datRef.clientWidth
        });
      });
    });

    //style='width:100% ; height:100%'
    gl.registerComponent("threeItem", function(container, state) {
      container
        .getElement()
        .html("<div id='three' style='width:100% ; height:100%'></div>");

      var threeRef = container.getElement().children()[0];
      //console.log(container.getElement())

      renderer = new THREE.WebGLRenderer({ antialias: true });
      threeRef.appendChild(renderer.domElement);
      threeRef.appendChild(stats.dom);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, 765 / 352);
      camera.up = new THREE.Vector3(0, 0, 1);

      renderer.setSize(765, 352);

      var geometry = new THREE.BoxGeometry(2, 2, 2);
      var material = new THREE.MeshNormalMaterial();

      mesh = new THREE.Mesh(geometry, material);
      //mesh.position.set(10, 0, 0)
      scene.add(mesh);

      camera.position.z = 5;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;
      // threeRef.current.appendChild(renderer.domElement);
      // threeRef.current.appendChild(stats.dom)

      var GridHelper = new THREE.GridHelper(1000, 100);
      //  y z axis exchange
      GridHelper.rotation.set(Math.PI / 2, 0, 0);
      scene.add(GridHelper);

      var AxesHelper = new THREE.AxesHelper(50);
      AxesHelper.position.set(0, 0, 0.1);
      scene.add(AxesHelper);

      // animate();

      gl.on("componentCreated", function(component) {
        component.container.on("resize", function() {
          renderer.setSize(
            renderer.domElement.parentElement.offsetWidth,
            renderer.domElement.parentElement.offsetHeight
          );
          camera.aspect =
            renderer.domElement.parentElement.offsetWidth /
            renderer.domElement.parentElement.offsetHeight;
          camera.updateProjectionMatrix();
          //renderer.setSize(container.width, container.height);
          threeRef.appendChild(stats.dom);
        });
      });
    });

    gl.init();
    animate();

    // init 후에 resize 해야 컨테이너에 width height 값이 생김
    litegraphCanvas.resize();
    //renderer.setSize(100, 100);

    console.log(scene);

 
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
