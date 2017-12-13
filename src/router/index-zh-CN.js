import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

// development 环境: 不用懒加载，以免大页面下 webpack 热更新太慢
// production 环境: 用懒加载

Vue.use(Router);

//主界面
import Home from '@/views/Home.vue';
import Welcome from '@/views/Welcome.vue';

//主机监控
const MonitorTest = _import('zjjk/monitor/Test');
const MonitorEcharts = _import('zjjk/monitor/Echarts');
const MonitorOnlineUsers = _import('zjjk/monitor/OnlineUsers');

const PolicyQuickbind = _import('zjjk/policyMG/PolicyQuickbind');
const PolicyTemplate = _import('zjjk/policyMG/PolicyTemplate');

const PatchManager = _import('zjjk/updateMG/PatchManager');
const SoftManager = _import('zjjk/updateMG/SoftManager');
const UpdateManager = _import('zjjk/updateMG/PushUpdate');

const HostMg = _import('zjjk/assetMG/HostMg');
const HostGroupMg = _import('zjjk/assetMG/HostGroupMg');

const UserManager = _import('zjjk/orgMG/UserManager');
const OrgManager = _import('zjjk/orgMG/OrgManager');

//安全审计
const SecAuditDevice = _import('aqsj/SecAuditDevice');
const FilterExpressions = _import('aqsj/FilterExpressions');
const UserLog = _import('aqsj/UserLog');

//系统管理
const SystemResource = _import('sys/Resource');
const SystemUser = _import('sys/User');
const SystemRole = _import('sys/Role');
const SystemLog = _import('sys/Log');

//Base URL
let systemBase = '/sys';
let hmBase = '/zjjk';
let secAuditBase = '/aqsj';


export const staticRoutes = [
    {
        path: '/login',
        component: _import('auth/Login'),
        name: 'Login',
        hidden: true
    },
    {
        path: '/404',
        component: _import('404'),
        name: 'Page404',
        hidden: true
    },
    {
        path: '/joke',
        component: _import('Joke'),
        name: '',
        hidden: true
    },
    {
        path: '/',
        hidden: true,
        name:'',
        redirect: '/welcome',
        component: Home,
        children: [
            { path: '/welcome', component: Welcome }
        ]
    },
    //others
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },

    //主机监控
    {
        path: hmBase,
        iconCls: 'fa fa-fw fa-desktop',
        component: Home,
        name: '主机监控',
        children: [

            //监控中心
            {
                path: hmBase + '/monitor',
                iconCls: 'fa fa-fw fa-dashboard',
                component: _import('zjjk/monitor/index'),
                name: '监控中心',
                children: [
                    { path: hmBase + '/monitor/test', iconCls: 'fa fa-fw fa-superpowers', component: MonitorTest, name: '测试' },
                    { path: hmBase + '/monitor/charts', iconCls: 'fa fa-fw fa-pie-chart', component: MonitorEcharts, name: '主机概况' },
                    { path: hmBase + '/monitor/onlineusers', iconCls: 'fa fa-fw fa-street-view', component: MonitorOnlineUsers, name: '在线用户' }
                ]
            },
            //策略管理
            {
                path: hmBase + '/policyMG',
                iconCls: 'fa fa-fw fa-th-list',
                component: _import('zjjk/policyMG/index'),
                name: '策略管理',
                children: [
                    { path: hmBase + '/policyMG/quickbind', iconCls: 'fa fa-fw fa-send', component: PolicyQuickbind, name: '快速下发' },
                    { path: hmBase + '/policyMG/templates', iconCls: 'fa fa-fw fa-puzzle-piece', component: PolicyTemplate, name: '策略模板' }
                ]
            },
            //升级管理
            {
                path: hmBase + '/updateMG',
                iconCls: 'fa fa-fw fa-rocket',
                component: _import('zjjk/updateMG/index'),
                name: '升级管理',
                children: [
                    { path: hmBase + '/updateMG/patch', iconCls: 'fa fa-fw fa-life-ring', component: PatchManager, name: '补丁管理' },
                    { path: hmBase + '/updateMG/soft', iconCls: 'fa fa-fw fa-cube', component: SoftManager, name: '软件管理' },
                    { path: hmBase + '/updateMG/update', iconCls: 'fa fa-fw fa-arrow-circle-up', component: UpdateManager, name: '推送升级' }
                ]
            },
            //资产管理
            {
                path: hmBase + '/assetMG',
                iconCls: 'fa fa-fw fa-cube',
                component: _import('zjjk/assetMG/index'),
                name: '资产管理',
                children: [
                    { path: hmBase + '/assetMG/host', iconCls: 'fa fa-fw fa-desktop', component: HostMg, name: '主机管理' },
                    { path: hmBase + '/assetMG/hostgroup', iconCls: 'fa fa-fw fa-object-group', component: HostGroupMg, name: '主机组管理' }
                ]
            },
            //组织管理
            {
                path: hmBase + '/orgMG',
                iconCls: 'fa fa-fw fa-sitemap',
                component: _import('zjjk/orgMG/index'),
                name: '组织管理',
                children: [
                    { path: hmBase + '/orgMG/org', iconCls: 'fa fa-fw fa-building', component: OrgManager, name: '机构管理' },
                    { path: hmBase + '/orgMG/user', iconCls: 'fa fa-fw fa-group', component: UserManager, name: '用户管理' }
                ]
            }
        ]
    },
    //安全审计
    {
        path: secAuditBase,
        iconCls: 'fa fa-fw fa-desktop',
        component: Home,
        name: '安全审计',
        children: [
            //设备管理
            {
                path: secAuditBase + '/device',
                iconCls: 'fa fa-fw fa-microchip',
                component: SecAuditDevice,
                name: '设备管理',
            },
            //过滤
            {
                path: secAuditBase + '/filter_expressions',
                iconCls: 'fa fa-fw fa-filter',
                component: FilterExpressions,
                name: '过滤表达式',
            },
            //用户审计
            {
                path: secAuditBase + '/userlog',
                iconCls: 'fa fa-fw fa-table',
                component: UserLog,
                name: '用户日志',
            }
        ]
    },
    //系统管理
    {
        path: systemBase,
        iconCls: 'fa fa-fw fa-gears',
        component: Home,
        name: '系统管理',
        children: [
            { path: systemBase + '/resource', iconCls: 'fa fa-fw fa-briefcase', component: SystemResource, name: '系统资源' },
            { path: systemBase + '/user', iconCls: 'fa fa-fw fa-user-md', component: SystemUser, name: '系统用户' },
            { path: systemBase + '/log', iconCls: 'fa fa-fw fa-file-text', component: SystemLog, name: '系统日志' },
            { path: systemBase + '/role', iconCls: 'fa fa-fw fa-universal-access', component: SystemRole, name: '系统角色' }
        ]
    }
    
];

export default new Router({
    mode: 'history', //后端支持可开
    scrollBehavior: (to, from, savedPosition) => { //只在 HTML5 history 模式下可用
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: staticRoutes
});