<!-- eslint-disable @stylistic/space-before-blocks -->
<script lang="ts" setup>
import { sha256 } from '~/shared/crypto';

const props = defineProps({
    alt: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    hash: {
        type: String,
        default: '',
    },
    size: {
        type: Number,
        default: 320,
    },
    defaultImg: {
        type: String,
        default: 'robohash',
    },
    rating: {
        type: String,
        default: 'g',
    },
})

const url = computed(() => {
    const emailHash = props.hash || sha256(props.email.trim().toLowerCase()).toString()
    const params = new URLSearchParams({
        d: props.defaultImg,
        s: props.size.toString(),
    })

    if (props.rating) {
        params.append('r', props.rating)
    }

    return `https://gravatar.com/avatar/${emailHash}?${params.toString()}`
})
</script>

<template>
    <img :src="url" :alt="alt">
</template>