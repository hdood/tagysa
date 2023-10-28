import { storeToRefs } from 'pinia';
import { useUserStore } from '~~/stores/user';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    console.log('verified is executing');
    try {
        await userStore.getUser();

        if (!user.value.verified) {
            if (to.name != 'index-verify' && to.name != 'index-verify-email') {
                return navigateTo('/verify');
            }

            return;
        }

        if (to.name == 'index-verify-email' || to.name == 'index-verify') {
            return navigateTo('/dashboard');
        }
    } catch (error) {}
});
