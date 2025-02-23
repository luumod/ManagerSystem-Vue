<template>
  <div class="main-content">
    <div
      backgroundimage="images/viewport-bg.png"
      class="canvas-wrapper"
      style="background-image: url('/editor/assets/images/viewport-bg.png')"
    >
      <div
        backgroundimage="images/canvas-bg.png"
        class="canvas-mask-wrapper"
        style="
          touch-action: none;
          user-select: none;
          -webkit-user-drag: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          background-image: url('/editor/assets/images/canvas-bg.png');
        "
      >
        <div
          class="canvas-container"
          style="width: 671.687px; height: 334px; position: relative; user-select: none"
        >
          <canvas
            class="lower-canvas"
            width="671"
            height="334"
            style="
              position: absolute;
              width: 671.687px;
              height: 334px;
              left: 0px;
              top: 0px;
              touch-action: none;
              user-select: none;
            "
          ></canvas
          ><canvas
            class="upper-canvas"
            width="671"
            height="334"
            style="
              position: absolute;
              width: 671.687px;
              height: 334px;
              left: 0px;
              top: 0px;
              touch-action: none;
              user-select: none;
              cursor: default;
            "
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="main-content"></script>

<style scoped>
.main-content {
  background-color: red;
}
</style>
