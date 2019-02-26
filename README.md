
# vue-pagination

> Supports Vue 2.x later

## Introduction

You can create a bulletin board with just array data.<br>
Use it comfortably !<br>

I want git star...

## installation

``` bash
npm install --save @dinnerkang/vue-pagination
```
## Usage

``` bash
<template>
    <div>
        <Pagination :data="array"></Pagination>
    </div>
</template>

<script>
import Pagination from '@dinnerkang/vue-pagination'
export default{
    data(){
        return{
            array : [{
                "test Data" : "hi",
                "test_2 Data" : 2
            },{
                "test Data" : "hi2",
                "test_2 Data" : 3
            }]
        }
    }
}
</script>
```

<img src="./assets/board.png">

You must have a **':data'** 

## Questions or Issue

Please send mail to jenhyuk0318@gmail.com
or
Leave the issue to Git

