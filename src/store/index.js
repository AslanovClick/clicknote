import { createStore } from 'vuex';
import {API_URL} from '@/store/api_url';

export default createStore({
  state: {
    token: {
        type: String,
        default: ''
    },

    user: {},

    users: [],
    
    projects: [],

    archiveProjects: [],

    filtersData: [
        { title: "Направление", name: "direction" }, 
        { title: "Сфера", name: "scope" }, 
        { title: "Тип работы", name: "type" }, 
        { title: "Программа", name: "program" }, 
        { title: "Формат", name: "format" }, 
        { title: "Клиент", name: "client" }, 
        { title: "Теги", name: "tag" },
    ],

    filtersDataForGuest: [
        { title: "Сфера", name: "scope" }, 
        { title: "Программа", name: "program" }, 
        { title: "Тип работы", name: "type" }, 
    ],

    filters: {},

    // sidebarFilters: {},

    sidebarFilters: {
        direction: {
            title: "Направление",
            open: false,
            checked: false,
            type: 'checkbox',
            list: [],
        },
        scope: {
            title: "Сфера",
            open: false,
            checked: false,
            type: 'checkbox',
            list: [],
        },
        type: {
            title: "Тип работы",
            open: false,
            checked: false,
            type: 'checkbox',
            list: [],
        },
        program: {
            title: "Программа",
            open: false,
            checked: false,
            type: 'checkbox',
            list: [],
        },
        format: {
            title: "Формат",
            open: false,
            checked: false,
            type: 'checkbox',
            list: [],
        },
        client: {
            title: "Клиент",
            open: false,
            checked: false,
            type: 'option',
            list: [],
            placeholder: 'Поиск по клиенту'
        },
        tag: {
            title: "Теги",
            open: false,
            checked: false,
            type: 'option',
            list: [],
            placeholder: 'Поиск по тегу'
        },
        executor: {
            title: "Исполнитель",
            open: false,
            checked: false,
            type: 'option',
            list: [],
            placeholder: 'Поиск по имени'
        },
    },

    viewProject: {},

    modalEdit: {},

    createProjectLoading: 0
  },

  getters: {
    getProjectById: (state) => (productId) => {
      return state.projects.find(product => product.id === productId);
    },

    getProjects(state) {
        return state.projects
    },

    getUser(state) {
        return state.user
    },

    getUsers(state) {
        return state.users
    },

    getFilters(state) {
        return state.filters
    },

    getSidebarFilters(state) {
        return state.sidebarFilters
    },
  },

  mutations: {
    setToken(state, token) {
        state.token = token;
    },

    removeToken(state) {
        state.token = null;
    },

    setUser(state, user) {
        state.user = user
    },

    setFilter(state, { type, value }) {
        state.filters[type] = Object.values(value).flat()
    },

    setFilters(state, filters) {
        state.filters = filters;
    },

    setUsersList(state, usersList) {
        state.users = usersList;
    },

    setViewProject(state, viewProject) {
        state.viewProject = viewProject;
    },

    setProjects(state, projects) {
        state.projects = projects;
    },

    setArchive(state, projects) {
        state.archiveProjects = projects;
    },

    addModalEdit(state, modalEditValue) {
        state.modalEdit = modalEditValue
    },

    setSidebarFilters(state, filters) {
        const filtersResult = {};

        filters.forEach(({type, value}) => {
            if (type in state.sidebarFilters) {
                const objectList = [...Object.values(value).flat()];
                objectList.forEach(o => o.checked = false);

                filtersResult[type] = {...state.sidebarFilters[type]};
                filtersResult[type].list = objectList;
            }
        })

        state.sidebarFilters = filtersResult;

        // console.log(filtersResult);

        // filters.forEach(({type, value}) => {
        //     const objectList = [...Object.values(value).flat()];
        //     objectList.forEach(o => o.checked = false);

        //     state.sidebarFilters[type].list = objectList;
        // })
    },

    setFilterCheckedValue(state, {filterKey, filterList}) {
        state.sidebarFilters[filterKey].list.forEach(variation => {
            variation.checked = filterList.find(filterItem => Number(filterItem.id) === variation.id) !== undefined;
        })
    },

    updateFilterCheckboxValue(state, {filterKey, filterId, value}) {
        value = value ?? true;
         
        // console.log(filterKey, filterId, value);
        state.sidebarFilters[filterKey].list.forEach(variation => {
            if (variation.id === filterId) variation.checked = value;
        })
    },
    
    setSidebarFiltersForGuest(state, { type, value }) {
        const objectList = [...Object.values(value).flat()];
        
        objectList.forEach(o => o.checked = false);
        
        const obj = {
            title: state.filtersData.find(f => f.name === type).title,
            open: false,
            list: objectList,
            type: 'checkbox',
        }

        state.sidebarFilters[type] = obj;
    },

    createProjectLoading(state, val) {
        state.createProjectLoading = val;
    }
  },

  actions: {
    // createRequest({ commit }, { method, body, headers}) {
    //     return new Promise((resolve) => {
    //         fetch(`${API_URL}/login`, {
    //             method: 'POST',
    //             body: JSON.stringify({ token: googleAuthToken }),
    //             headers
    //         })
    //         .then((response) => response.json()).then((data) => {
    //             if (data.token !== 'undefined') {
    //                 commit('setToken', data.token);
    //                 localStorage.setItem('X-AUTH-TOKEN', data.token)
    //                 resolve()
    //             }
    //         })
    //     })
    // },

    login({ commit }, { googleAuthToken }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ token: googleAuthToken })
            })
            .then((response) => response.json()).then((data) => {
                if (data.token !== 'undefined') {
                    commit('setToken', data.token);
                    localStorage.setItem('X-AUTH-TOKEN', data.token)
                }
                resolve(data)
            })
        })
    },

    addUserRole({ state }, { roleName }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/user/add-role`, {
                method: 'POST', 
                body: JSON.stringify({ role: roleName }),
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then(() => {
                // console.log(data);
                resolve()
            })
        })
    },

    updateUserRole({ state, dispatch }, { id, role }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/user/${id}/set-role`, {
                method: 'POST', 
                body: JSON.stringify({ role }),
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then(data => {
                if (!data.errors) {
                    dispatch('getUsers');
                    resolve()
                } else {
                    console.log(data.errors);
                }
            })
        })
    },
    
    logout({ state, commit }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/logout`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {

                if (data.ok === true) {
                    commit('removeToken');
                    localStorage.removeItem('X-AUTH-TOKEN')
                    localStorage.removeItem('ROLE')
                    localStorage.removeItem('pagesList')
                    localStorage.removeItem('user')
                    
                    resolve()
                    
                    return
                }

                console.log('logout error');
                resolve()
            })
          })
    },

    createFilter({ state }, {filterType, filterName}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/filter/${filterType}/`, {
                method: 'POST', 
                headers: {
                    'X-AUTH-TOKEN': state.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name: filterName}),
            })
            .then((response) => response.json()).then((data) => {
                resolve(data)
            })
        })
    },

    getFilter({ state, commit }, {filterType}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/filter/${filterType}/`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token,
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setFilter', {type: filterType, value: data})
                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
            })
        })
    },

    getFilters({state, getters, dispatch}) {
        return new Promise((resolve) => {
            state.filtersData.forEach((f, index) => {
                dispatch('getFilter', {filterType: f.name})
                
                if (index === state.filtersData.length - 1) {
                    resolve(getters.getFilters)
                }
            })
        })
    },

    getSidebarFilters({state, commit}) {
        return new Promise((sidebarFiltersResolve) => {
            const promises = [...state.filtersData].map((f) => {
                return new Promise((resolve) => {
                    fetch(`${API_URL}/filter/${f.name}/`, {
                        method: 'GET', 
                        headers: {
                            'X-AUTH-TOKEN': state.token,
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => response.json()).then((data) => {
                        resolve({type: f.name, value: Object.values(data).flat()});
                    })
                })
            });
    
            promises.push(new Promise((resolve) => {
                fetch(`${API_URL}/user/list`, {
                    method: 'GET', 
                    headers: {
                        'X-AUTH-TOKEN': state.token
                    }
                })
                .then((response) => response.json()).then((data) => resolve({type: 'executor', value: Object.values(data).flat()}));
            }));
            
            Promise.all(promises).then(values => {
                commit('setSidebarFilters', values);
                sidebarFiltersResolve();
            });
        })
    },

    getSidebarFiltersForGuest({state, commit}) {
        return new Promise((sidebarFiltersResolve) => {
            const promises = [...state.filtersDataForGuest].map((f) => {
                return new Promise((resolve) => {
                    fetch(`${API_URL}/filter/${f.name}/`, {
                        method: 'GET', 
                        headers: {
                            'X-AUTH-TOKEN': state.token,
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => response.json()).then((data) => {
                        resolve({type: f.name, value: Object.values(data).flat()});
                    })
                })
            });

            
            Promise.all(promises).then(values => {
                commit('setSidebarFilters', values);
                sidebarFiltersResolve();
            });
        })
    },

    // getSidebarFiltersForGuest({state, getters, commit}) {
    //     return new Promise((resolve) => {
    //         state.filtersDataForGuest.forEach((f, index) => {
    //             fetch(`${API_URL}/filter/${f.name}/`, {
    //                 method: 'GET', 
    //                 headers: {
    //                     'X-AUTH-TOKEN': state.token,
    //                     'Content-type': 'application/json'
    //                 }
    //             })
    //             .then((response) => response.json()).then((data) => {
    //                 if (index === state.filtersData.length - 1) {
    //                     resolve(getters.getSidebarFilters)
    //                 } else {
    //                     commit('setSidebarFiltersForGuest', {type: f.name, value: data});
    //                 }
    //             })
    //         });
    //     })
    // },

    checkState({getters, commit, dispatch}, {name, dispatchName, commitName}) {
        if (!Object.keys(getters[name]).length) {
            dispatch(dispatchName).then((data) => {
                if (commitName) {
                    commit(commitName, data);
                }
            })
        }
    },

    checkLocaltorage({dispatch, commit}, {name, dispatchName, commitName}) {
        if (!localStorage.getItem(name)) {
            dispatch(dispatchName).then((data) => {
                localStorage.setItem(name, JSON.stringify(data));
                commit(commitName, JSON.parse(localStorage.getItem(name)));
            })
        } else {
            commit(commitName, JSON.parse(localStorage.getItem(name)));
        }
    },

    updateFilter({ state }, {filterType, id, name}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/filter/${filterType}/${id}`, {
                method: 'PUT', 
                headers: {
                    'X-AUTH-TOKEN': state.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name}),
            })
            .then((response) => response.json()).then((data) => {
                resolve(data)
            })
        })
    },

    removeFilter({ state }, {filterType, id}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/filter/${filterType}/${id}`, {
                method: 'DELETE', 
                headers: {
                    'X-AUTH-TOKEN': state.token,
                }
            })
            .then((response) => response.json()).then((data) => {
                resolve(data)
            })
        })
    },

    setToken({commit}, token) {
        return new Promise(resolve => {
            commit('setToken', token);
            resolve()
        })
    },
    
    getUser({ state, commit }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/user`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setUser', data.user);
                    localStorage.setItem('ROLE', data.user.role);

                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    commit('removeToken');
                    localStorage.removeItem('X-AUTH-TOKEN')
                    localStorage.removeItem('ROLE')
                }
            })
        })
    },

    removeUser({ state }, {id}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/user/${id}`, {
                method: 'DELETE', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                // console.log(data);
                if (data.ok) {
                    resolve(data)
                }
            })
        })
    },

    getUsersList({ state, commit }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/user/list`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setUsersList', data.users);
                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
            })
        })
    },

    getUsers({dispatch}) {
        dispatch('getUsersList');   
        // dispatch('checkLocaltorage', {   
        //     name: 'users', 
        //     dispatchName: 'getUsersList', 
        //     commitName: 'setUsersList'
        // })
    },

    createProject({ state, commit }, {formData}) {
        return new Promise((resolve) => {
            const req = new XMLHttpRequest();

            req.open('POST', `${API_URL}/project/`);
            req.setRequestHeader('X-AUTH-TOKEN', state.token)

            req.upload.addEventListener('progress', (e) => {
                // нужно отдельно вычислять превью и сам проект.

                const percentComplete = (e.loaded / e.total) * 100;


                commit('createProjectLoading', Math.round(percentComplete));
            })

            req.addEventListener('load', () => {

                resolve(req.response)

                commit('createProjectLoading', 0);
            })

            req.send(formData)
        })

        // return new Promise((resolve) => {
        //     fetch(`${API_URL}/project/`, {
        //         method: 'POST', 
        //         headers: {
        //             'X-AUTH-TOKEN': state.token
        //         },
        //         body: formData,
        //     })
        //     .then((response) => response.json()).then((data) => {
        //         resolve(data)
        //     })
        // })
    },

    getProjectsByFilters({ state, commit }, {query}) {
    // getProjectsByFilters({ commit }) {
        commit('setProjects', {})

        return new Promise((resolve) => {
            fetch(`${API_URL}/project/${query}`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setProjects', data.projects)
                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
            })
        })
    },

    getProjects({ state, commit }) {
        commit('setProjects', {})
        return new Promise((resolve) => {
            fetch(`${API_URL}/project/`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setProjects', data.projects)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
                resolve(data)
            })
        })
    },

    getProjectsByCategoryID({ state, commit }, {categoryID}) {
        commit('setProjects', {})
        return new Promise((resolve) => {
            fetch(`${API_URL}/project/?direction[0]=${categoryID}`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setProjects', data.projects)
                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
            })
        })
    },

    getProjectById({ state, commit }, {id}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/project/${id}`, {
                method: 'GET', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setViewProject', data.project)
                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
            })
        })
    },

    removeProject({ state }, {id}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/project/${id}`, {
                method: 'DELETE', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                // console.log(data);
                resolve(data)
            })
        })
    },

    restoreProject({ state }, {id}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/archive/project/${id}/restore`, {
                method: 'POST', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                // console.log(data);
                resolve(data)
            })
        })
    },

    deleteProject({ state }, {id}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/archive/project/${id}/`, {
                method: 'DELETE', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                // console.log(data);
                resolve(data)
            })
        })
    },

    editProject({ state }, {formData, projectId}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/project/${projectId}`, {
                method: 'POST', 
                headers: {
                    'X-AUTH-TOKEN': state.token
                },
                body: formData,
            })
            .then((response) => response.json()).then((data) => {
                // console.log(data);
                resolve(data)
            })
        })
    },

    getArchive({state, commit}) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/archive/`, {
                method: 'GET',
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                if (!data.errors) {
                    commit('setArchive', data.projects)
                    resolve(data)
                } else if (data.errors.find(error => error.code == 400)) {
                    // commit('removeToken');
                    // localStorage.removeItem('X-AUTH-TOKEN')
                    // localStorage.removeItem('ROLE')
                }
            })
        })
    },

    setPublic({ state }, { id, publicValue }) {
        return new Promise((resolve) => {
            fetch(`${API_URL}/project/${id}/set-public`, {
                method: 'PUT', 
                body: JSON.stringify({ "public": publicValue }),
                headers: {
                    'X-AUTH-TOKEN': state.token
                }
            })
            .then((response) => response.json()).then((data) => {
                // console.log(data);
                resolve(data)
            })
        })
    },

    addModalEdit({ commit }, { project }) {
        commit('addModalEdit', project)
    },
  },

  modules: {
    // tokenModule
  }
})
