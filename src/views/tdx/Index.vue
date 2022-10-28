<template>
    <div>
        <h6>透過Tdx API取得資料</h6>
        <nav>
            <router-link to="/tdx/local">將資料放到local</router-link> | 
            <router-link to="/tdx/localMap">Local data + map</router-link> | 
            <router-link to="/tdx/token">需要token的api，需要換鑰匙不然會有api存取限制</router-link> | 
            <router-link to="/tdx/map">高雄市政府停車場API+Map</router-link> | 
        </nav>
        <router-view></router-view>
    </div>
</template>