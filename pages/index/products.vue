<template>


    <Head>

        <title>
            Products
        </title>
    </Head>
    <div class="bg-gradient-to-r from-bg-blue-200 to-bg-blue-300 flex flex-col items-center">
		<div class="navbar z-50 bg-base-100 mx-auto rounded-lg fixed transition-all lg:px-20"
			:class="[threshold ? 'lg:w-11/12  shadow-lg    opacity-80 hover:opacity-100' : 'shadow']">
			<div class="navbar-start">
				<div class="dropdown">
					<label tabindex="0" class="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<div tabindex="0"
						class="menu menu-sm text-xl dropdown-content mt-3 z-[1] px-2 py-4 shadow bg-base-100 rounded-box w-80 text-center flex flex-col gap-3">
						<div><NuxtLink to="/">Home</NuxtLink></div>
						<div><a>About us</a></div>
						<div><a>Products</a></div>
					</div>
				</div>
				<a >
					<Logo />
				</a>
			</div>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<li><NuxtLink to="/">Home</NuxtLink></li>
					<li><a>About us</a></li>
					<li><a>Products</a></li>
				</ul>
			</div>
			<div class="navbar-end flex items-center gap-7" v-if="user.id">
				<RouterLink to="dashboard"><Button type="primary" class="btn-sm"> Dashboard </Button> </RouterLink>
				<div class="avatar">
					<div class="w-8 rounded-full">
						<img :src="user.image" alt="User Profile Image" />
					</div>
				</div>
			</div>
			<div class="navbar-end space-x-2" v-else>
				<NuxtLink to="/login"><Button type="primary" class="btn-sm">Login</Button></NuxtLink>
				<NuxtLink to="register"><Button type="primary" class="btn-sm">Register</Button></NuxtLink>
			</div>
		</div>
	</div>


    <div class="mt-32">
        <h1 class="text-center text-primary font-bold  text-4xl  ">Products</h1>


        <div class="max-w-7xl flex gap-4 flex-wrap mx-auto my-20">
            <div class="card w-96 bg-base-100 shadow-xl">
                <!-- <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
                <div class="card-body">
                  <h2 class="card-title">PVC Card</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div class="card w-96 bg-base-100 shadow-xl">
                <!-- <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
                <div class="card-body">
                  <h2 class="card-title">Metalic Card</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div class="card w-96 bg-base-100 shadow-xl">
                <!-- <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
                <div class="card-body">
                  <h2 class="card-title">Wooden Card</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
        </div>
    </div>

</template>

<script setup>
import { useUserStore } from '~~/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const threshold = ref(false);
const { user } = storeToRefs(userStore);

onMounted(async () => {
	try {
		await userStore.getUser();
	} catch (error) { }
	document.addEventListener('scroll', () => {
		const nav = document.getElementById('navigation-bar');
		const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		if (scrollTop > 200) {
			threshold.value = true;
			return;
		}
		threshold.value = false;
	});
});
</script>

<style >

</style>