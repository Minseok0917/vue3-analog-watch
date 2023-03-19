<template>
  <div class="clock-container">
    <div
      class="clock"
      @mouseenter="handlers.mouseenter"
      @mousemove="handlers.mousemove"
      @mouseleave="handlers.mouseleave"
    >
      <div class="clock-center clock-hand">
        <div
          class="clock-hand-block clock-hand-hour"
          :style="clock.styledHour"
        ></div>
      </div>
      <div class="clock-center clock-hand">
        <div
          class="clock-hand-block clock-hand-minute"
          :style="clock.styledMinute"
        ></div>
      </div>
      <div class="clock-center clock-hand">
        <div
          class="clock-hand-block clock-hand-second"
          :style="clock.styledSecond"
        ></div>
      </div>
      <div class="clock-center clock-circle"></div>
      <Tooltip
        v-if="clockTooltip.isTooltip"
        :message="clockTooltip.tooltipMessage"
        :style="clockTooltip.styledPosition"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onUnmounted } from "vue";
import Tooltip from "./Tooltip.vue";

const clock = reactive({
  hour: -90,
  minute: -90,
  second: -90,
  styledHour: computed(() => ({
    transform: `rotateZ(${(clock.hour * 60 + clock.minute) * 0.5 - 90}deg)`,
  })),
  styledMinute: computed(() => ({
    transform: `rotateZ(${clock.minute * 6 - 90}deg)`,
  })),
  styledSecond: computed(() => ({
    transform: `rotateZ(${clock.second * 6 - 90}deg)`,
  })),
});
const clockTooltip = reactive({
  isTooltip: false,
  position: { x: null, y: null },
  tooltipMessage: computed(() => {
    const isAM = clock.hour < 12;
    const hour = clock.hour % 12;
    const minute = `0${clock.minute}`.substr(-2);
    const second = `0${clock.second}`.substr(-2);
    return `${isAM ? "오전" : "오후"} ${hour % 12}시 ${minute}분 ${second}초`;
  }),
  styledPosition: computed(() => ({
    left: `${clockTooltip.position.x}px`,
    top: `${clockTooltip.position.y}px`,
  })),
});
const services = {
  clockUpdate() {
    const currentDate = new Date();
    clock.hour = currentDate.getHours();
    clock.minute = currentDate.getMinutes();
    clock.second = currentDate.getSeconds();
  },
};
const handlers = {
  mouseenter() {
    clockTooltip.isTooltip = true;
  },
  mousemove(event) {
    if (!clockTooltip.isTooltip) return;
    clockTooltip.position.x = event.offsetX;
    clockTooltip.position.y = event.offsetY;
  },
  mouseleave() {
    clockTooltip.isTooltip = false;
  },
};

services.clockUpdate();
const clockInterval = setInterval(services.clockUpdate, 1000);
onUnmounted(() => clearInterval(clockInterval));
</script>
