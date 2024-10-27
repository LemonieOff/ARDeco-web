<template>
    <div class="text-center h-14 bg-[#333] fixed w-full z-[500] flex justify-between sm:justify-around items-center">
        <NavbarFunction ref="mobileNavbarOpener" :aria-label="content.toggleMobileNavbar"
                        :fun="() => {mobileNavbarOpen = !mobileNavbarOpen}"
                        class="flex content-center flex-wrap" mobile-only>
            <Icon :name="mobileNavbarOpen ? 'uil:multiply' : 'uil:bars'" size="24" />
        </NavbarFunction>

        <!-- Mobile navbar - BEGIN -->
        <!-- Width w-48 initially from direct testing with users, but set to w-40 while navbar doesn't have longer links -->
        <div v-show="mobileNavbarOpen" ref="mobileNavbar"
             class="fixed top-14 w-40 bg-[#333] sm:hidden flex flex-col rounded-br-2xl">
            <NavbarLink :page-lang=rawLangPrefix mobile-display page-name="lang-product">
                {{ content.product }}
            </NavbarLink>
            <NavbarLink :page-lang="rawLangPrefix" mobile-display page-name="lang-team">
                {{ content.team }}
            </NavbarLink>
            <NavbarFunction :fun="toggleDarkMode" mobile-display>
                <Icon :name="darkMode ? 'uil:sun' : 'uil:moon'" size="24"></Icon>
            </NavbarFunction>
            <NavbarFunction :fun="toggleLang" mobile-display>
                <Icon :name="nuxtApp.$lang === 'en' ? 'twemoji:flag-france' : 'twemoji:flag-united-states'"
                      size="24"></Icon>
            </NavbarFunction>
        </div>
        <!-- Mobile navbar - END -->

        <NavbarLink :page-lang="rawLangPrefix" class="sm:hover:bg-transparent flex flex-row items-center"
                    page-name="lang">
            <NuxtImg alt="Home" height="50" src="images/logo.webp" width="50" />
            <span class="inline sm:hidden pl-4">ARDeco</span>
        </NavbarLink>

        <!-- Disappear on mobile - BEGIN -->
        <NavbarLink :page-lang=rawLangPrefix mobile-hidden page-name="lang-product">
            {{ content.product }}
        </NavbarLink>
        <NavbarLink :page-lang="rawLangPrefix" mobile-hidden page-name="lang-team">
            {{ content.team }}
        </NavbarLink>
        <NavbarFunction :fun="toggleDarkMode" mobile-hidden>
            <Icon :name="darkMode ? 'uil:sun' : 'uil:moon'" size="24"></Icon>
        </NavbarFunction>
        <NavbarFunction :fun="toggleLang" mobile-hidden>
            <Icon :name="nuxtApp.$lang === 'en' ? 'twemoji:flag-france' : 'twemoji:flag-united-states'"
                  size="24"></Icon>
        </NavbarFunction>
        <!-- Disappear on mobile - END -->

        <NavbarMenu />
    </div>
    <!-- Add a block with the navbar height, so it doesn't overlap on other content -->
    <div id="navbar-size" class="h-14"></div>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();

const content = nuxtApp.$content.navBar;
const rawLangPrefix = nuxtApp.$rawLangPrefix;
const darkMode = nuxtApp.$darkMode;
const mobileNavbarOpen = ref(false);

const mobileNavbar = useTemplateRef("mobileNavbar");
const mobileNavbarOpener = useTemplateRef("mobileNavbarOpener");

const toggleDarkMode = () => {
    nuxtApp.$changeDarkMode("toggle");
    location.reload();
};

const toggleLang = () => {
    if (nuxtApp.$langPrefix !== "/") {
        if (nuxtApp.$lang === "fr") {
            location.href = location.href.replace(/\/fr\/?/, "/en/");
        } else if (nuxtApp.$lang === "en") {
            location.href = location.href.replace(/\/en\/?/, "/fr/");
        }
    } else {
        nuxtApp.$changeLang("toggle");
        location.reload();
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event: MouseEvent) => {
    let clickedOnMobileNavbar = 0;

    if (mobileNavbar.value && mobileNavbar.value.contains(event.target as Node)) clickedOnMobileNavbar++;
    if (mobileNavbarOpener.value && mobileNavbarOpener.value.$el.contains(event.target as Node)) clickedOnMobileNavbar++;

    if (clickedOnMobileNavbar === 0) toggleMobileNavbar(false);
};

const toggleMobileNavbar = (activate: boolean | null = null) => {
    if (activate !== null) mobileNavbarOpen.value = activate;
    else mobileNavbarOpen.value = !mobileNavbarOpen.value;
};

</script>
