import {defineStore} from "pinia";
import {ref} from "vue";

//layout组件相关配置仓库
export const useLayOutStore = defineStore("Layout",() => {
    let foldFlag = ref(false)
    let refreshFLag = ref(false)
    return {foldFlag,refreshFlag: refreshFLag}
})