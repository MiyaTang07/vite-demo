import { ref, onMounted, watch, toRefs} from 'vue'

export default (props) => {
    const nameList = ref([])
    const repoList = ['miya', 'jone', 'tom', 'mary', 'jolin', 'christ', 'mike', 'caroline', 'jenny', 'feifei']
    
    const getNameList = async () => {
        nameList.value = await Promise.resolve(repoList)
    }

    onMounted(getNameList) // onMounted时候调用getUserRepositories

    const { user } = toRefs(props)
    // 查询父级组件传递过来的user
    const getUserInformation = () => {
        // 更新 `props.user` 到 `user.value` 访问引用值
        nameList.value = repoList.filter(name => name.search(user.value) > -1)
    }

    // user变化时候执行getUserInformation方法
    watch(user, getUserInformation)

    const searchName = ref('')
    const getSearchedName = async () => {
        if(!searchName.value) {
           nameList.value = repoList
        }
        nameList.value = repoList.filter(name => name.search(searchName.value) > -1)
     }
    return {
        searchName,
        nameList,
        getNameList,
        getUserInformation,
        getSearchedName
    }
}