(function() {
  'use strict';
  var website = openerp.website;
  website.openerp_website = {};
  website.snippet.animationRegistry.banner_webgl = website.snippet.Animation.extend({
    selector : ".particle_banner",
    start : function() {

      Detector.addGetWebGLMessage();
      this.MATERIAL_COUNT = 30;
      this.CUBE_SIZE = 300;
      this.CUBE_INCREMENT = 100;
      this.SPREAD = 1000;

      this.scene;
      this.renderer;
      this.camera;
      this.stats;
      this.cubes = [];
      this.materials = [];
      this.cubeHolder;
      this.rotSpeed;
      this.cubeCount = 0;
      this.geometry;
      this.windowHalfX;
      this.windowHalfY;
      this.mouseX = 0;
      this.mouseY = 0;
      this.initBanner();
    },

    initBanner : function() {
      var self = this;
      // stop the user getting a text cursor
      document.onselectstart = function() {
        return false;
      };
      // init 3D world
      this.container = document.createElement('div');
      this.$target.find(".particle_banner_container").empty();
      this.$target.find(".particle_banner_container").append(this.container)
      this.renderer = new THREE.WebGLRenderer({
        antialias : false,
        alpha : true,
      });
      this.container.appendChild(self.renderer.domElement);
      this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 20, 3000);
      this.camera.position.z = 1000;
      this.scene = new THREE.Scene();
      this.scene.add(self.camera);
      // init object to hold cubes and rotate
      this.cubeHolder = new THREE.Object3D();
      this.scene.add(self.cubeHolder);

      // add lights
      this.light = new THREE.PointLight(0xffeeaa, 1);
      this.light.position = new THREE.Vector3(-1000, 1000, -1000);
      this.scene.add(this.light);

      this.light2 = new THREE.PointLight(0xFFFFFF, 1);
      this.light2.position = new THREE.Vector3(1000, 1000, 1000);
      this.scene.add(this.light2);

      // init materials
      for (var i = 0; i < this.MATERIAL_COUNT; i++) {
        var material = new THREE.MeshLambertMaterial({
          opacity : 0.5,
          blending : THREE.AdditiveBlending,
          depthTest : false,
          transparent : true
        });
        material.color = new THREE.Color(0x555555);
        this.materials.push(material)
      }

      // init cubes
      this.geometry = new THREE.CubeGeometry(self.CUBE_SIZE, self.CUBE_SIZE, self.CUBE_SIZE);
      this.addCubes();

      // match speed with Stage3D version in degrees
      this.rotSpeed = .3 / 360 * Math.PI * 2;

      $(window).resize({
        'self' : self
      }, self.onWindowResize);

      $(window).on('mousemove', {
        'self' : self
      }, self.onMouseMove);

      $(window).trigger('resize');
      this.animate();
    },

    addCubes : function() {
      var self = this;
      this.cubeCount += this.CUBE_INCREMENT;

      // init cubes
      for (var j = 0; j < this.CUBE_INCREMENT; j++) {
        var cube = new THREE.Mesh(self.geometry, self.materials[j % self.MATERIAL_COUNT]);
        // randomize size
        cube.scale.x = cube.scale.y = cube.scale.z = Math.random() + .1;

        this.cubeHolder.add(cube);
        this.cubes.push(cube);

        cube.position.x = Math.random() * this.SPREAD - this.SPREAD / 2;
        cube.position.y = Math.random() * this.SPREAD - this.SPREAD / 2;
        cube.position.z = Math.random() * this.SPREAD - this.SPREAD / 2;

        cube.rotation.x = Math.random() * 2 * Math.PI - Math.PI;
        cube.rotation.y = Math.random() * 2 * Math.PI - Math.PI;
        cube.rotation.z = Math.random() * 2 * Math.PI - Math.PI;
      }

      // make more cubes less opaque
      for (var i = 0; i < this.MATERIAL_COUNT; i++) {
        this.materials[i].opacity = 50 / this.cubeCount;
      }
    },

    onMouseMove : function(event) {
      var self = event.data.self;
      self.mouseX = event.clientX - self.windowHalfX;
      self.mouseY = event.clientY - self.windowHalfY;
    },

    onWindowResize : function(event) {
      if (event) {
        var self = event.data.self;
        self.windowHalfX = window.innerWidth / 2;
        self.windowHalfY = window.innerHeight / 2;
        self.camera.aspect = window.innerWidth / window.innerHeight;
        self.camera.updateProjectionMatrix();
        self.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    },

    animate : function() {
      var self = this;
      setInterval(function() {
        self.render();
      }, 1000 / 60);
    },

    render : function() {
      var self = this;
      self.camera.position.x += (self.mouseX - self.camera.position.x) * 0.1;
      self.camera.position.y += (-self.mouseY - self.camera.position.y) * 0.1;
      // always look at center
      self.camera.lookAt(self.cubeHolder.position);

      self.cubeHolder.rotation.y -= this.rotSpeed;
      for (var i = 0; i < self.cubeCount; i++) {
        self.cubes[i].rotation.x += self.rotSpeed;
      }
      self.renderer.render(self.scene, self.camera);
    }

  });
})();
