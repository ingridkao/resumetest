<template>
    <div>
        <nav>
            <router-link to="/pagination/basic">基本</router-link> | 
            <router-link to="/pagination/around">顯示前後按鈕</router-link> | 
            <router-link to="/pagination/top">顯示首頁末頁</router-link> | 
        </nav>
        <router-view></router-view>
    </div>
</template>