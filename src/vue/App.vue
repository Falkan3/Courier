<template>
    <div id="courierRoot" class="${rootClasses.join(' ')}">
        ${componentHtmlArr.join('')}
        <div id="courierWidget" class="${Courier.settings.classes.widget}">${Components.Widget.refs.widget.html()}</div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        props: {
            components
        },
        data() {
            return {
                objectOfAttrs: {
                    id: 'container',
                    class: 'wrapper'
                }
            }
        }
    }
</script>
