<template>
  <div class="space-y-16 relative min-h-fit my-20" ref="wrapper">
    <!-- <canvas
			ref="_canvas"
			class="absolute"
		></canvas> -->
    <div class="hero w-10/12 mx-auto">
      <div
        class="hero-content flex-col lg:flex-row-reverse lg:space-x-24 lg:space-x-reverse"
      >
        <img
          src="~/assets/createCard.png"
          class="lg:max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <div class="badge badge-secondary mb-3">Step 1</div>
          <h1 class="text-3xl font-bold">Create Your Card</h1>
          <p class="py-6 lg:max-w-md">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <RouterLink to="login"
            ><Button type="primary">Create Card</Button></RouterLink
          >
        </div>
      </div>
    </div>
    <div class="hero w-10/12 mx-auto">
      <div class="hero-content flex-col lg:flex-row lg:space-x-24">
        <img
          src="~/assets/updateCard.png"
          class="lg:max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <div class="badge badge-secondary mb-3">Step 2</div>
          <h1 class="text-3xl font-bold">Update when required</h1>
          <div class="py-6 lg:max-w-md">
            <p>
              You can keep your card up-to-date at any time and make it even
              more informative by adding the following items:
            </p>
            <div class="mt-2 space-y-2">
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Call-to-action & WhatsApp Button
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Payment & Social Profile Links
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Photo, Banners, Portfolio, Videos, Podcast, etc
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  PDF Attachments & more...etc
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero w-10/12 mx-auto">
      <div
        class="hero-content flex-col lg:flex-row-reverse lg:space-x-24 lg:space-x-reverse"
      >
        <img
          src="~/assets/share.png"
          class="lg:max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <div class="badge badge-secondary mb-3">Step 3</div>
          <h1 class="text-3xl font-bold">Share Your Card</h1>
          <div class="py-6 lg:max-w-md">
            <p>
              Once you have completed creating your card, you can easily share
              it using any of these options:
            </p>
            <div class="mt-2 space-y-2">
              <div class="flex items-center gap-2">
                <div class="min-w-fit">
                  <icon class="text-success" name="gg:check-o" />
                </div>
                <div class="lg:text-sm text-xs">
                  Add your unique Tagy URL to all the platforms and places you
                  find your audience.
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Use your QR code to drive your offline traffic online
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="min-w-fit">
                  <icon class="text-success" name="gg:check-o" />
                </div>
                <div class="lg:text-sm text-xs">
                  Share your card effortlessly with just a tap on your phone
                  using the NFC card feature.
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Share on WhatsApp, Email, SMS, etc
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero w-10/12 mx-auto">
      <div class="hero-content flex-col lg:flex-row lg:space-x-24">
        <img
          src="~/assets/business.png"
          class="lg:max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <div class="badge badge-secondary mb-3">Step 4</div>
          <h1 class="text-3xl font-bold">Get Business Connects</h1>
          <div class="py-6 lg:max-w-md">
            <p>
              There are several ways in which your card viewers can connect with
              you:
            </p>
            <div class="mt-2 space-y-2">
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Downloading your contact information as a VCF file.
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  Exchanging contact information directly with you.
                </div>
              </div>
              <div class="flex items-center gap-2">
                <icon class="text-success" name="gg:check-o" />
                <div class="lg:text-sm text-xs">
                  You can find their contact details in your contact book.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const _canvas = ref(null);
const wrapper = ref(null);

let resizeEvent = undefined;

onUnmounted(() => {
  removeEventListener("resize", resizeEvent);
});

onMounted(() => {
  // const canvas = _canvas.value;
  // canvas.width = wrapper.value.offsetWidth;
  // canvas.height = wrapper.value.offsetHeight + 100;
  // const c = canvas.getContext("2d");
  // const mouse = { x: undefined, y: undefined };
  // const mouseRectWidth = 40;
  // const colors = ["#000000", "#4E4FEB", "#068FFF", "#EEEEEE"];
  // resizeEvent = addEventListener("resize", () => {
  // 	canvas.width = wrapper.value?.offsetWidth;
  // 	canvas.height = wrapper.value?.offsetHeight + 100;
  // });
  // class Rectangle {
  // 	constructor(x, y, w, dx, dy, color = "black") {
  // 		this.x = x;
  // 		this.y = y;
  // 		this.w = w;
  // 		this.initialWidth = w;
  // 		this.h = w;
  // 		this.dx = dx;
  // 		this.dy = dy;
  // 		this.color = color;
  // 	}
  // 	draw() {
  // 		c.fillStyle = this.color;
  // 		c.fillRect(this.x, this.y, this.w, this.w);
  // 	}
  // 	update() {
  // 		if (this.x > canvas.width + this.w || this.x < 0)
  // 			this.dx = -this.dx;
  // 		if (this.y > canvas.height + this.h || this.y < 0)
  // 			this.dy = -this.dy;
  // 		this.x += this.dx;
  // 		this.y += this.dy;
  // 		this.draw();
  // 	}
  // }
  // const rectangles = [];
  // for (let i = 0; i < 200; i++) {
  // 	const x = Math.random() * canvas.width;
  // 	const y = Math.random() * canvas.height;
  // 	const w = Math.random() * 10;
  // 	const color = colors[Math.floor(Math.random() * colors.length)];
  // 	const dx = Math.random() * 2 + 1 - 1.5;
  // 	const dy = Math.random() * 2 + 1 - 1.5;
  // 	rectangles.push(new Rectangle(x, y, w, dx, dy, color));
  // }
  // document.addEventListener("mousemove", (e) => {
  // 	mouse.x = e.x;
  // 	mouse.y = e.y;
  // });
  // function animate() {
  // 	c.clearRect(0, 0, canvas.width, canvas.height);
  // 	rectangles.forEach((rect) => rect.update());
  // 	requestAnimationFrame(animate);
  // }
  // requestAnimationFrame(animate);
});
</script>

<style scoped></style>
