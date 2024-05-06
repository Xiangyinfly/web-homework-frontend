export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'Login',
        meta: {
            title: 'Login',
            hidden: true,
            icon: 'Promotion'
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'Layout',
        redirect: '/home',
        meta: {
            title: 'Layout',
            hidden: true,
            icon: 'Tools',
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'Home',
                meta: {
                    title: 'Home',
                    icon: 'House'
                }
            }
        ]
    },
    {
        path: '/classinfo',
        component: () => import('@/layout/index.vue'),
        name: 'ClassInfo',
        redirect: '/classinfo/stu',
        meta: {
            title: '班级学生管理',
            hidden: false,
            icon: 'Goods',
        },
        children: [
            {
                path: '/classinfo/stu',
                component: () => import('@/views/classinfo/stu/index.vue'),
                name: 'Stu',
                meta: {
                    title: '学生管理',
                    hidden: false,
                    icon: 'Notebook'
                }
            }
        ]
    },
    {
        path: '/systeminfo',
        component: () => import('@/layout/index.vue'),
        name: 'SystemInfo',
        redirect: '/systeminfo/dept',
        meta: {
            title: '系统信息管理',
            hidden: false,
            icon: 'Goods',
        },
        children: [
            {
                path: '/systeminfo/dept',
                component: () => import('@/views/systeminfo/dept/index.vue'),
                name: 'Dept',
                meta: {
                    title: '部门管理',
                    hidden: false,
                    icon: 'Notebook'
                }
            },
            {
                path: '/systeminfo/emp',
                component: () => import('@/views/systeminfo/emp/index.vue'),
                name: 'Emp',
                meta: {
                    title: '员工管理',
                    hidden: false,
                    icon: 'Orange'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Default',
        meta: {
            title: 'Any Route',
            hidden: true
        }
    }
]