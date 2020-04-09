<template>
    <ul class="list-controls">
        <li>
            <control>
                <template #menu>
                    <control-menu>
                        <style-control-menu />
                    </control-menu>
                </template>

                <template #icon>
                    <beer-icon class="large-icon" />
                </template>
            </control>
        </li>

        <li>
            <control>
                <template #menu>

                </template>

                <template #icon>
                    <sort-icon class="large-icon" />
                </template>
            </control>
        </li>
    </ul>
</template>

<script src="./ListControls.ts"></script>
<style src="./ListControls.css" scoped></style>